import { initFirebase, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, collection, addDoc, query, onSnapshot, orderBy, deleteDoc, doc, serverTimestamp } from './firebase.js';

let currentUser = null;
let db = null;
let auth = null;

// Initialize Firebase automatically
initFirebase().then((firebaseData) => {
  db = firebaseData.db;
  auth = firebaseData.auth;

  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    // Dispatch a custom event to update all mounted comment sections
    window.dispatchEvent(new CustomEvent('authStateChanged'));
  });
});

export async function loginWithGoogle() {
  if (!auth) return;
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Login failed", error);
    alert("Login failed: " + error.message);
  }
}

export async function logout() {
  if (!auth) return;
  await signOut(auth);
}

export function renderCommentSection(containerId, slug) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const renderUI = () => {
    let authHtml = '';
    if (currentUser) {
      authHtml = `
        <div class="flex items-center justify-between mb-4 bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-200 dark:border-gray-800">
          <div class="flex items-center gap-2">
            <img src="${currentUser.photoURL}" class="w-6 h-6 rounded-full" alt="Profile" referrerpolicy="no-referrer" />
            <span class="font-bold text-xs text-gray-900 dark:text-gray-100">${currentUser.displayName}</span>
          </div>
          <button onclick="logoutFromComments()" class="text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-widest transition-colors">Sign Out</button>
        </div>
        <div class="mb-4">
          <textarea id="comment-input-${slug}" placeholder="Share your thoughts..." class="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 p-3 text-sm rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none transition-all mb-2" rows="2"></textarea>
          <button onclick="submitComment('${slug}')" class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">Post Comment</button>
        </div>
      `;
    } else {
      authHtml = `
        <div class="mb-6 bg-gray-50 dark:bg-[#1a1a1a] p-5 rounded-xl border border-gray-200 dark:border-gray-800 text-center">
          <p class="text-gray-600 dark:text-gray-400 mb-3 text-sm font-bold">Join the conversation</p>
          <button onclick="loginFromComments()" class="bg-blue-600 text-white relative px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow">
            Sign in with Google
          </button>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="mt-16 pt-8 border-t-2 border-gray-900 dark:border-gray-100">
        <button onclick="toggleComments('${slug}')" class="flex items-center justify-between w-full text-left focus:outline-none group">
          <h3 class="text-xl font-bold flex items-center text-gray-900 dark:text-gray-100">
            Comments <span id="comment-count-${slug}" class="text-xs font-normal text-gray-500 ml-3 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">...</span>
          </h3>
          <svg id="comment-icon-${slug}" class="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-100 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        
        <div id="comments-wrapper-${slug}" class="hidden mt-6 transition-all">
          ${authHtml}
          <div id="comments-list-${slug}" class="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <!-- Comments will load here -->
            <div class="text-gray-500 font-bold text-xs animate-pulse">Loading comments...</div>
          </div>
        </div>
      </div>
    `;
  };

  renderUI();

  // Listen for auth changes to re-render the input area
  const authListener = () => renderUI();
  window.addEventListener('authStateChanged', authListener);

  // Load comments from DB
  if (db) {
    listenToComments(slug, `comments-list-${slug}`);
  } else {
    // If db is not yet initialized, wait for it
    initFirebase().then(() => listenToComments(slug, `comments-list-${slug}`));
  }
}

window.toggleComments = function(slug) {
  const wrapper = document.getElementById(`comments-wrapper-${slug}`);
  const icon = document.getElementById(`comment-icon-${slug}`);
  if (!wrapper || !icon) return;
  
  if (wrapper.classList.contains('hidden')) {
    wrapper.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
  } else {
    wrapper.classList.add('hidden');
    icon.style.transform = 'rotate(0deg)';
  }
};

const ADMIN_EMAILS = ["shalukagimhan13@gmail.com", "sh4lu.z@gmail.com"];

function listenToComments(slug, listId) {
  const listContainer = document.getElementById(listId);
  if (!listContainer) return;

  const commentsRef = collection(db, 'postComments', slug, 'comments');
  const q = query(commentsRef, orderBy('createdAt', 'desc'));

  onSnapshot(q, (snapshot) => {
    const listContainerNow = document.getElementById(listId);
    const countBadge = document.getElementById(`comment-count-${slug}`);
    
    if (countBadge) {
      countBadge.innerText = snapshot.size || '0';
    }

    if (!listContainerNow) return;

    if (snapshot.empty) {
      listContainerNow.innerHTML = `<div class="text-gray-500 italic text-sm">No comments yet. Be the first to share your thoughts!</div>`;
      return;
    }

    let html = '';
    snapshot.forEach((docSnap) => {
      const c = docSnap.data();
      let date = 'Just now';
      
      if (c.createdAt) {
        let jsDate;
        if (typeof c.createdAt.toDate === 'function') {
          jsDate = c.createdAt.toDate();
        } else if (c.createdAt.seconds) {
          jsDate = new Date(c.createdAt.seconds * 1000);
        } else {
          jsDate = new Date(c.createdAt);
        }

        if (jsDate && !isNaN(jsDate.getTime())) {
          date = jsDate.toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        }
      }
      const isOwner = currentUser && currentUser.uid === c.userId;
      const isAdmin = currentUser && currentUser.email && ADMIN_EMAILS.includes(currentUser.email);
      const canDelete = isOwner || isAdmin;

      html += `
        <div class="bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-200 dark:border-gray-800">
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-2">
              <img src="${c.userPhoto}" alt="${c.userName}" class="w-6 h-6 rounded-full" referrerpolicy="no-referrer" />
              <div>
                <div class="font-bold text-xs text-gray-900 dark:text-gray-100">${c.userName}</div>
                <div class="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">${date} ${isAdmin && !isOwner ? '<span class="text-red-500 normal-case tracking-normal ml-1">(Admin Mode)</span>' : ''}</div>
              </div>
            </div>
            ${canDelete ? `<button onclick="deleteComment('${slug}', '${docSnap.id}')" class="text-gray-400 hover:text-red-600 transition-colors" title="Delete comment">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>` : ''}
          </div>
          <p class="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">${c.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        </div>
      `;
    });
    listContainerNow.innerHTML = html;
  }, (err) => {
    console.error("Comments error", err);
  });
}

window.loginFromComments = loginWithGoogle;
window.logoutFromComments = logout;

window.submitComment = async function(slug) {
  const input = document.getElementById(`comment-input-${slug}`);
  if (!input || !input.value.trim() || !currentUser || !db) return;

  const text = input.value.trim();
  if (text.length > 2000) {
    alert("Comment is too long!");
    return;
  }

  input.value = ''; // clear immediately
  
  try {
    const commentsRef = collection(db, 'postComments', slug, 'comments');
    await addDoc(commentsRef, {
      text: text,
      userId: currentUser.uid,
      userName: currentUser.displayName || "Anonymous",
      userPhoto: currentUser.photoURL || "",
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.error("Error adding comment", err);
    alert("Error: " + err.message);
  }
};

window.deleteComment = async function(slug, commentId) {
  try {
    await deleteDoc(doc(db, 'postComments', slug, 'comments', commentId));
  } catch(e) {
    console.error("Error deleting comment:", e);
    // If it's a permission error, handle it properly
    if (e.message && e.message.includes('permission')) {
      const errorInfo = {
        error: e.message,
        operationType: 'delete',
        path: `postComments/${slug}/comments/${commentId}`,
        authInfo: currentUser ? { userId: currentUser.uid } : null
      };
      console.error(JSON.stringify(errorInfo));
    }
  }
};
