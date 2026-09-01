import { initFirebase, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, collection, addDoc, query, onSnapshot, orderBy, deleteDoc, updateDoc, doc, serverTimestamp, arrayUnion, arrayRemove, getDoc } from './firebase.js';

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
        <div class="flex gap-4 mb-8">
          <img src="${currentUser.photoURL}" class="w-10 h-10 rounded-full flex-shrink-0" alt="Profile" referrerpolicy="no-referrer" />
          <div class="flex-grow">
            <textarea id="comment-input-${slug}" placeholder="Add a comment..." class="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 py-1 text-sm focus:border-gray-900 dark:focus:border-gray-100 outline-none transition-all resize-none" rows="1" onfocus="document.getElementById('comment-actions-${slug}').style.display = 'flex';" oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'"></textarea>
            <div class="flex justify-between items-center mt-2">
              <button onclick="logoutFromComments()" class="text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Sign out</button>
              <div id="comment-actions-${slug}" class="gap-2" style="display: none;">
                <button onclick="document.getElementById('comment-input-${slug}').value = ''; document.getElementById('comment-input-${slug}').style.height = ''; document.getElementById('comment-actions-${slug}').style.display = 'none';" class="text-gray-900 dark:text-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#272727] text-sm font-bold transition">Cancel</button>
                <button onclick="submitComment('${slug}')" class="bg-[#0f0f0f] dark:bg-[#3ea6ff] text-white dark:text-[#0f0f0f] px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 dark:hover:bg-[#65b8ff] transition">Comment</button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      authHtml = `
        <div class="flex gap-4 mb-8">
          <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#272727] flex items-center justify-center text-gray-500 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <div class="flex-grow">
            <textarea readonly placeholder="Add a comment..." onclick="loginFromComments()" class="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 py-1 text-sm focus:border-gray-900 dark:focus:border-gray-100 outline-none cursor-text resize-none" rows="1"></textarea>
            <div class="flex justify-end mt-2">
              <button onclick="loginFromComments()" class="bg-[#0f0f0f] dark:bg-[#3ea6ff] text-white dark:text-[#0f0f0f] px-4 py-2 rounded-full text-sm font-bold transition hover:bg-gray-800 dark:hover:bg-[#65b8ff]">Sign in to comment</button>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div class="flex items-center gap-6 mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
            <span id="comment-count-${slug}">0</span> Comments
          </h3>
          <button class="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#272727] px-3 py-1.5 rounded-full transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
            Sort by
          </button>
        </div>
        
        <div id="comments-wrapper-${slug}" class="transition-all">
          ${authHtml}
          <div id="comments-list-${slug}" class="space-y-6 pb-12">
            <!-- Comments will load here -->
            <div class="text-gray-500 font-bold text-sm animate-pulse">Loading comments...</div>
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
      const isAuthor = c.email && ADMIN_EMAILS.includes(c.email); // Note: we don't save email yet, but kept for future
      const canDelete = isOwner || isAdmin;
      
      const isHearted = c.adminHearted === true;
      const heartBtnClass = isHearted ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500';
      const heartIconClass = isHearted ? 'fill-current' : 'fill-none';

      const heartBtn = isAdmin ? 
        `<button onclick="toggleAdminHeart('${slug}', '${c.id}', ${isHearted})" class="text-[10px] font-bold uppercase flex items-center gap-1 ${heartBtnClass} transition-colors" title="${isHearted ? 'Remove Heart' : 'Give Heart'}"><svg class="w-4 h-4 ${heartIconClass}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> Love</button>` : '';

      const heartedBadge = isHearted && !isAdmin ? 
        `<span class="text-[10px] font-bold uppercase flex items-center gap-1 text-red-500" title="Admin Loved this"><svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>` : '';

      // Likes/Dislikes handling
      const likedBy = c.likedBy || [];
      const dislikedBy = c.dislikedBy || [];
      const likesCount = likedBy.length;
      const isLiked = currentUser && likedBy.includes(currentUser.uid);
      const isDisliked = currentUser && dislikedBy.includes(currentUser.uid);

      let replyInputHtml = '';
      if (!isReply) {
        replyInputHtml = `
        <div id="reply-box-${c.id}" class="hidden mt-4">
          <div class="flex gap-4">
            <img src="${currentUser ? currentUser.photoURL : ''}" class="w-6 h-6 sm:w-8 sm:h-8 rounded-full shrink-0" />
            <div class="flex-grow">
              <textarea id="reply-input-${c.id}" placeholder="Add a reply..." class="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 py-1 text-sm focus:border-gray-900 dark:focus:border-gray-100 outline-none transition-all resize-none" rows="1" oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'"></textarea>
              <div class="flex gap-2 mt-2 justify-end">
                <button onclick="toggleReplyBox('${c.id}')" class="text-gray-900 dark:text-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#272727] text-sm font-bold transition">Cancel</button>
                <button onclick="submitReply('${slug}', '${c.id}')" class="bg-[#0f0f0f] dark:bg-[#3ea6ff] text-white dark:text-[#0f0f0f] px-4 py-2 rounded-full text-sm font-bold transition hover:bg-gray-800 dark:hover:bg-[#65b8ff]">Reply</button>
              </div>
            </div>
          </div>
        </div>
        `;
      }

      return `
        <div class="flex gap-4 group ${isReply ? 'mt-4' : ''}">
          <img src="${c.userPhoto}" alt="${c.userName}" class="${isReply ? 'w-6 h-6 sm:w-8 sm:h-8' : 'w-10 h-10'} rounded-full shrink-0" referrerpolicy="no-referrer" />
          <div class="flex-grow min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-bold text-[13px] text-gray-900 dark:text-gray-100 truncate ${isAdmin || (c.email && ADMIN_EMAILS.includes(c.email)) ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-0.5 rounded-full' : ''}">@${c.userName.replace(/\s+/g, '')}</span>
              <span class="text-[12px] text-gray-500 dark:text-[#aaaaaa] shrink-0">${date}</span>
            </div>
            
            <p class="text-gray-900 dark:text-[#f1f1f1] text-[14px] whitespace-pre-wrap leading-relaxed mb-2">${c.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
            
            <div class="flex items-center gap-1 sm:gap-4 text-gray-600 dark:text-[#aaaaaa]">
              <div class="flex items-center gap-1">
                <button onclick="toggleCommentLike('${slug}', '${c.id}')" class="hover:bg-gray-100 dark:hover:bg-[#272727] p-2 rounded-full transition ${isLiked ? 'text-gray-900 dark:text-white' : ''}">
                  <svg class="w-4 h-4 ${isLiked ? 'fill-current' : 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514"></path></svg>
                </button>
                <span class="text-[12px] min-w-[12px]">${likesCount > 0 ? likesCount : ''}</span>
              </div>
              
              <button onclick="toggleCommentDislike('${slug}', '${c.id}')" class="hover:bg-gray-100 dark:hover:bg-[#272727] p-2 rounded-full transition ${isDisliked ? 'text-gray-900 dark:text-white' : ''}">
                <svg class="w-4 h-4 ${isDisliked ? 'fill-current' : 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.514"></path></svg>
              </button>
              
              ${!isReply ? `<button onclick="toggleReplyBox('${c.id}')" class="text-[12px] font-bold hover:bg-gray-100 dark:hover:bg-[#272727] px-3 py-1.5 rounded-full transition ml-2">Reply</button>` : ''}
              
              ${heartBtn}
              ${heartedBadge}
            </div>
            
            ${replyInputHtml}
          </div>
          
          ${canDelete ? `
          <div class="opacity-0 group-hover:opacity-100 transition-opacity">
            <button onclick="deleteComment('${slug}', '${c.id}')" class="p-2 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full text-gray-500 hover:text-red-500 transition" title="Delete">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
            </button>
          </div>
          ` : ''}
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
        adminHearted: false,
        likedBy: [],
        dislikedBy: []
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
        adminHearted: false,
        likedBy: [],
        dislikedBy: []
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

window.toggleCommentLike = async function(slug, commentId) {
  if (!currentUser || !db) {
    window.showToast("Please sign in to like comments", "error");
    return;
  }
  const commentRef = doc(db, 'postComments', slug, 'comments', commentId);
  try {
    const snap = await getDoc(commentRef);
    if (!snap.exists()) return;
    const data = snap.data();
    const likedBy = data.likedBy || [];
    
    if (likedBy.includes(currentUser.uid)) {
      await updateDoc(commentRef, { likedBy: arrayRemove(currentUser.uid) });
    } else {
      await updateDoc(commentRef, { 
        likedBy: arrayUnion(currentUser.uid),
        dislikedBy: arrayRemove(currentUser.uid)
      });
    }
  } catch (err) {
    console.error("Error toggling like", err);
  }
};

window.toggleCommentDislike = async function(slug, commentId) {
  if (!currentUser || !db) {
    window.showToast("Please sign in to dislike comments", "error");
    return;
  }
  const commentRef = doc(db, 'postComments', slug, 'comments', commentId);
  try {
    const snap = await getDoc(commentRef);
    if (!snap.exists()) return;
    const data = snap.data();
    const dislikedBy = data.dislikedBy || [];
    
    if (dislikedBy.includes(currentUser.uid)) {
      await updateDoc(commentRef, { dislikedBy: arrayRemove(currentUser.uid) });
    } else {
      await updateDoc(commentRef, { 
        dislikedBy: arrayUnion(currentUser.uid),
        likedBy: arrayRemove(currentUser.uid)
      });
    }
  } catch (err) {
    console.error("Error toggling dislike", err);
  }
};
