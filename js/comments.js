import { initFirebase, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, collection, addDoc, query, onSnapshot, orderBy, deleteDoc, updateDoc, doc, serverTimestamp } from './firebase.js';

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
    window.showToast("Login failed: " + error.message, 'error');
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
    const allComments = [];
    snapshot.forEach(docSnap => allComments.push({ id: docSnap.id, ...docSnap.data() }));

    const parents = allComments.filter(c => !c.parentId);
    const replies = allComments.filter(c => c.parentId);

    const drawComment = (c, isReply) => {
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
          date = jsDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
      }

      const isOwner = currentUser && currentUser.uid === c.userId;
      const isAdmin = currentUser && currentUser.email && ADMIN_EMAILS.includes(currentUser.email);
      const isAuthor = c.email && ADMIN_EMAILS.includes(c.email); // Can't easily check comment author email without storing it, but we can check if it's admin replying
      const canDelete = isOwner || isAdmin;
      
      const isHearted = c.adminHearted === true;
      const heartBtnClass = isHearted ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500';
      const heartIconClass = isHearted ? 'fill-current' : 'fill-none';

      const heartBtn = isAdmin ? 
        `<button onclick="toggleAdminHeart('${slug}', '${c.id}', ${isHearted})" class="text-[10px] font-bold uppercase flex items-center gap-1 ${heartBtnClass} transition-colors" title="${isHearted ? 'Remove Heart' : 'Give Heart'}"><svg class="w-4 h-4 ${heartIconClass}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> Love</button>` : '';

      const heartedBadge = isHearted && !isAdmin ? 
        `<span class="text-[10px] font-bold uppercase flex items-center gap-1 text-red-500" title="Admin Loved this"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> Loved by Admin</span>` : '';

      let replyInputHtml = '';
      if (!isReply) {
        replyInputHtml = `
        <div id="reply-box-${c.id}" class="hidden mt-4 pl-4 border-l-2 border-transparent">
          <div class="flex gap-3">
            <img src="${currentUser ? currentUser.photoURL : ''}" class="w-6 h-6 rounded-full shrink-0" />
            <div class="flex-grow">
              <textarea id="reply-input-${c.id}" placeholder="Write a reply..." class="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 py-1 text-sm focus:border-gray-900 dark:focus:border-gray-100 outline-none transition-all resize-none" rows="1" oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'"></textarea>
              <div class="flex gap-2 mt-2 justify-end">
                <button onclick="toggleReplyBox('${c.id}')" class="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-1.5 text-xs font-bold transition">Cancel</button>
                <button onclick="submitReply('${slug}', '${c.id}')" class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold transition shadow-sm uppercase tracking-widest">Reply</button>
              </div>
            </div>
          </div>
        </div>
        `;
      }

      return `
        <div class="${isReply ? 'mt-3 pl-4 sm:pl-10 relative' : 'bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-xl border border-gray-200 dark:border-gray-800 relative'}">
          ${isReply ? '<div class="absolute left-4 sm:left-10 top-0 bottom-0 w-[2px] -ml-[22px] sm:-ml-[26px] bg-gray-200 dark:bg-gray-800 rounded-full"></div>' : ''}
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-2">
              <img src="${c.userPhoto}" alt="${c.userName}" class="w-6 h-6 rounded-full" referrerpolicy="no-referrer" />
              <div>
                <div class="font-bold text-xs text-gray-900 dark:text-gray-100">${c.userName}</div>
                <div class="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">${date}</div>
              </div>
            </div>
            ${canDelete ? `<button onclick="deleteComment('${slug}', '${c.id}')" class="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>` : ''}
          </div>
          <p class="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">${c.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          
          <div class="flex items-center gap-4 mt-3">
            ${!isReply && currentUser ? `<button onclick="toggleReplyBox('${c.id}')" class="text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Reply</button>` : ''}
            ${heartBtn}
            ${heartedBadge}
          </div>
          ${replyInputHtml}
        </div>
      `;
    };

    parents.forEach((p) => {
      html += drawComment(p, false);
      
      const myReplies = replies.filter(r => r.parentId === p.id);
      myReplies.sort((a,b) => {
        let tA = a.createdAt?.seconds || 0;
        let tB = b.createdAt?.seconds || 0;
        return tA - tB; // oldest replies first
      });

      if (myReplies.length > 0) {
        html += `<div class="mt-2 space-y-2">`;
        myReplies.forEach(r => {
           html += drawComment(r, true);
        });
        html += `</div>`;
      }
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
    window.showToast("Comment is too long!", 'error');
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
      createdAt: serverTimestamp(),
      parentId: null,
      adminHearted: false
    });
  } catch (err) {
    console.error("Error adding comment", err);
    window.showToast("Error: " + err.message, 'error');
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

window.toggleReplyBox = function(commentId) {
  const box = document.getElementById(`reply-box-${commentId}`);
  if (box) {
    box.classList.toggle('hidden');
    box.classList.toggle('block');
    if (!box.classList.contains('hidden')) {
      const input = document.getElementById(`reply-input-${commentId}`);
      if (input) input.focus();
    }
  }
};

window.submitReply = async function(slug, parentId) {
  const input = document.getElementById(`reply-input-${parentId}`);
  if (!input || !input.value.trim() || !currentUser || !db) return;

  const text = input.value.trim();
  if (text.length > 2000) {
    window.showToast("Reply is too long!", 'error');
    return;
  }

  input.value = ''; // clear immediately
  toggleReplyBox(parentId); // hide box
  
  try {
    const commentsRef = collection(db, 'postComments', slug, 'comments');
    await addDoc(commentsRef, {
      text: text,
      userId: currentUser.uid,
      userName: currentUser.displayName || "Anonymous",
      userPhoto: currentUser.photoURL || "",
      createdAt: serverTimestamp(),
      parentId: parentId,
      adminHearted: false
    });
  } catch (err) {
    console.error("Error adding reply", err);
    window.showToast("Error: " + err.message, 'error');
  }
};

window.toggleAdminHeart = async function(slug, commentId, currentValue) {
  if (!currentUser || !db) return;
  try {
    await updateDoc(doc(db, 'postComments', slug, 'comments', commentId), {
      adminHearted: !currentValue
    });
  } catch (err) {
    console.error("Error toggling heart:", err);
    window.showToast("Error: " + err.message, 'error');
  }
};
