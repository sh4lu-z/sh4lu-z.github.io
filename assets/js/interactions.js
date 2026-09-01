import { initFirebase, onAuthStateChanged, doc, setDoc, deleteDoc, onSnapshot, serverTimestamp, getDoc, collection } from './firebase.js';

let currentUser = null;
let db = null;
let auth = null;

// Initialize
initFirebase().then((firebaseData) => {
  db = firebaseData.db;
  auth = firebaseData.auth;

  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    // Re-check user states for current post if any
    const slugMeta = document.querySelector('meta[name="blog-slug"]');
    const slug = slugMeta ? slugMeta.content : window.location.pathname.split('/').pop();
    if (slug && slug !== "" && slug !== "/") {
        setupUserInteractions(slug);
    }
  });
});

export function setupInteractionsUI(slug) {
  // Listen for total likes count
  if (!db) {
    initFirebase().then(() => listenToLikesCount(slug));
  } else {
    listenToLikesCount(slug);
  }
  
  if (currentUser) {
    setupUserInteractions(slug);
  }
}

function listenToLikesCount(slug) {
  const likesRef = collection(db, 'postLikes', slug, 'likes');
  onSnapshot(likesRef, (snapshot) => {
    const count = snapshot.size;
    const countElem = document.getElementById('like-count');
    if (countElem) countElem.innerText = count;
  });
}

function setupUserInteractions(slug) {
  if (!currentUser || !db) return;

  // Check if user liked
  const likeDocRef = doc(db, 'postLikes', slug, 'likes', currentUser.uid);
  onSnapshot(likeDocRef, (docSnap) => {
    const btn = document.getElementById('btn-like-icon');
    if (!btn) return;
    if (docSnap.exists()) {
      btn.classList.add('text-red-500', 'fill-current');
      btn.classList.remove('text-gray-400');
    } else {
      btn.classList.remove('text-red-500', 'fill-current');
      btn.classList.add('text-gray-400');
    }
  });

  // Check if user bookmarked
  const bookmarkDocRef = doc(db, 'users', currentUser.uid, 'bookmarks', slug);
  onSnapshot(bookmarkDocRef, (docSnap) => {
    const btn = document.getElementById('btn-bookmark-icon');
    if (!btn) return;
    if (docSnap.exists()) {
      btn.classList.add('text-blue-500', 'fill-current');
      btn.classList.remove('text-gray-400');
    } else {
      btn.classList.remove('text-blue-500', 'fill-current');
      btn.classList.add('text-gray-400');
    }
  });
}

window.toggleLike = async function(slug) {
  if (!currentUser) {
    window.showToast("Please sign in to like this post", "error");
    if (window.loginFromComments) window.loginFromComments();
    return;
  }
  const likeDocRef = doc(db, 'postLikes', slug, 'likes', currentUser.uid);
  try {
    const docSnap = await getDoc(likeDocRef);
    if (docSnap.exists()) {
      await deleteDoc(likeDocRef);
    } else {
      await setDoc(likeDocRef, {
        userId: currentUser.uid,
        createdAt: serverTimestamp()
      });
    }
  } catch(e) {
    console.error("Error toggling like:", e);
  }
};

window.toggleBookmark = async function(slug) {
  if (!currentUser) {
    window.showToast("Please sign in to bookmark this post", "error");
    if (window.loginFromComments) window.loginFromComments();
    return;
  }
  const bookmarkDocRef = doc(db, 'users', currentUser.uid, 'bookmarks', slug);
  try {
    const docSnap = await getDoc(bookmarkDocRef);
    if (docSnap.exists()) {
      await deleteDoc(bookmarkDocRef);
      window.showToast("Bookmark removed");
    } else {
      await setDoc(bookmarkDocRef, {
        postSlug: slug,
        createdAt: serverTimestamp()
      });
      window.showToast("Post bookmarked!");
    }
  } catch(e) {
    console.error("Error toggling bookmark:", e);
  }
};
