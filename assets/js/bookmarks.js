import { initFirebase } from './firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { collection, onSnapshot, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

let allBlogs = [];
let currentUser = null;
let firestoreDb = null;

window.removeBookmark = async (slug) => {
  if (!currentUser || !firestoreDb) return;
  try {
    const docRef = doc(firestoreDb, 'users', currentUser.uid, 'bookmarks', slug);
    await deleteDoc(docRef);
    if (window.showToast) {
      window.showToast('Bookmark removed!', 'success');
    }
  } catch(e) {
    console.error("Error removing bookmark: ", e);
  }
};

async function loadBookmarks(db, user) {
  const bookmarksRef = collection(db, 'users', user.uid, 'bookmarks');
  
  onSnapshot(bookmarksRef, (snap) => {
    const bookmarkedSlugs = snap.docs.map(doc => doc.id);
    const container = document.getElementById("app-content");
    
    if (bookmarkedSlugs.length === 0) {
      container.innerHTML = `
        <div class="text-center py-20">
            <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">No bookmarks yet.</h3>
            <p class="text-gray-500 mb-8 text-lg italic">Explore the blog and save some posts!</p>
            <a href="/" class="inline-block text-sm font-bold text-gray-900 border-b border-gray-900 dark:text-gray-100 dark:border-gray-100 uppercase tracking-widest">Go Home</a>
        </div>
      `;
      return;
    }

    const filtered = allBlogs.filter(b => bookmarkedSlugs.includes(b.name.replace('.md', '')));
    
    let html = '<div class="grid gap-10">';
    filtered.forEach(blog => {
      const slug = blog.name.replace(".md", "");
      const title = blog.title || slug.replace(/-/g, " ");
      const desc = blog.description ? `<p class="text-gray-600 mb-4 leading-relaxed">${blog.description}</p>` : '';
      const imgHtml = blog.coverImage ? `<img src="${blog.coverImage}" class="w-full h-48 object-cover rounded-xl mb-4" />` : '';
      const dateStr = blog.date ? new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '';

      html += `
        <div class="relative border-l-4 border-gray-900 dark:border-gray-100 pl-6 py-2 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] block transition-colors group">
          <a href="/blogs/${slug}" class="block pr-12">
            ${imgHtml}
            <h3 class="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100 group-hover:underline underline-offset-4">${title}</h3>
            <div class="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              ${dateStr}
            </div>
            ${desc}
          </a>
          <button onclick="removeBookmark('${slug}')" class="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors z-10" title="Remove Bookmark">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
          </button>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  });
}

async function init() {
  const { auth, db } = await initFirebase();
  
  try {
    const res = await fetch('/blogs/index.json');
    if (res.ok) {
      allBlogs = await res.json();
    }
  } catch(e){}

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
      firestoreDb = db;
      loadBookmarks(db, user);
    } else {
      document.getElementById("app-content").innerHTML = `
        <div class="text-center py-20">
            <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Please sign in</h3>
            <p class="text-gray-500 mb-8 text-lg italic">You need to sign in to view your bookmarks.</p>
        </div>
      `;
    }
  });
}

init();
