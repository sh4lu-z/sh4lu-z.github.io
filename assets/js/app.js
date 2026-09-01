import { renderCommentSection } from './comments.js';
import { initWidgets } from './widget-loader.js';
import { parseBlogMarkdown } from './markdown-utils.js';
import { renderBlogMath } from './math-render.js';
import { setupInteractionsUI } from './interactions.js';
import { initFirebase, setDoc, doc, serverTimestamp } from './firebase.js';

window.handleSubscribe = async function(event, form) {
  event.preventDefault();
  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput.value.trim().toLowerCase();
  if (!email) return;

  const btn = form.querySelector('button');
  const originalText = btn.innerText;
  btn.innerText = "Saving...";
  btn.disabled = true;

  try {
    const { db } = await initFirebase();
    await setDoc(doc(db, 'subscribers', email), {
      email: email,
      createdAt: serverTimestamp()
    });
    
    if (window.showToast) {
      window.showToast('Subscribed successfully!', 'success');
    } else {
      alert('Subscribed successfully!');
    }
    form.reset();
  } catch (error) {
    console.error("Subscription error", error);
    if (window.showToast) {
      window.showToast('Error subscribing. Try again.', 'error');
    } else {
      alert('Error subscribing.');
    }
  } finally {
    btn.innerText = originalText;
    btn.disabled = false;
  }
};

window.allBlogs = [];
window.allVectors = {}; 
window.currentPostIndex = -1;
window.lastScrollPosition = 0;

async function loadBlogs() {
  const container = document.getElementById("app-content");

  try {
    let localBlogs = [];
    const cacheBuster = "?t=" + new Date().getTime();
    const localRes = await fetch('/blogs/index.json' + cacheBuster);
    if (localRes.ok) {
      const localData = await localRes.json();
      localBlogs = localData.map(b => b);
    }

    try {
      const vecRes = await fetch('/blogs/vectors.json' + cacheBuster);
      if (vecRes.ok) window.allVectors = await vecRes.json();
    } catch(e) {}

    let finalBlogs = Array.from(localBlogs);
    finalBlogs.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

    window.allBlogs = finalBlogs;
    renderList(finalBlogs);

  } catch (err) {
    container.innerHTML = `<div class="text-center font-bold p-8 text-gray-500">No blogs found. Head to the Admin panel to start writing!</div>`;
  }
}

function renderList(blogs) {
  const container = document.getElementById("app-content");

  if (blogs.length === 0) {
    container.innerHTML = `
       <div class="text-center py-20">
           <h3 class="text-2xl font-bold mb-2 text-gray-900">No publications.</h3>
           <p class="text-gray-500 mb-8 text-lg italic">Head over to the Admin Panel to write your first entry.</p>
           <a href="/admin.html" class="inline-block text-sm font-bold text-gray-900 border-b border-gray-900 uppercase tracking-widest">Go to Admin</a>
       </div>
    `;
    return;
  }

  let html = `<div class="grid gap-10">`;
  blogs.forEach(blog => {
    const slug = blog.name.replace(".md", "");
    const title = blog.title || slug.replace(/-/g, " ");
    const desc = blog.description ? `<p class="text-gray-600 mb-4 leading-relaxed">${blog.description}</p>` : '';
    const imgHtml = blog.coverImage ? `<img src="${blog.coverImage}" class="w-full h-48 object-cover rounded-xl mb-4" />` : '';
    const dateStr = blog.date ? new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '';

    html += `
      <a href="/blogs/${slug}" class="border-l-4 border-gray-900 dark:border-gray-100 pl-6 py-2 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] block transition-colors group">
        ${imgHtml}
        <h3 class="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100 group-hover:underline underline-offset-4">${title}</h3>
        <div class="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          ${dateStr}
        </div>
        ${desc}
      </a>
    `;
  });
  html += `</div>`;

  container.innerHTML = html;
}

window.filterBlogs = function () {
  const query = document.getElementById("search-input").value.toLowerCase().trim();
  if (!query) {
    renderList(window.allBlogs);
    return;
  }

  const filtered = window.allBlogs.filter(blog => {
    const slug = blog.name.replace(".md", "");
    const title = (blog.title || slug.replace(/-/g, " ")).toLowerCase();
    const desc = (blog.description || "").toLowerCase();
    return title.includes(query) || desc.includes(query);
  });

  renderList(filtered);
};

window.viewPost = async function (slug, append = false) {
  if (!append) {
    window.location.href = `/blogs/${slug}`;
    return;
  }

  const container = document.getElementById("app-content");
  let content = "";
  try {
    const cacheBuster = "?t=" + new Date().getTime();
    const resp = await fetch(`/blogs/md/${slug}.md` + cacheBuster);
    if (resp.ok) {
      content = await resp.text();
    } else {
      content = "## Not Found.";
    }
  } catch (e) {
    content = "## Error loading.";
  }

  const shareUrl = window.location.origin + "/blogs/" + slug;

  let headerHtml = `
    <div class="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6 pt-16">
      <h1 class="text-4xl sm:text-5xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-4 tracking-tight">
        <a href="/blogs/${slug}" class="hover:underline">${window.currentPostIndex !== -1 ? (window.allBlogs[window.currentPostIndex].title || slug.replace(/-/g, " ")) : slug.replace(/-/g, " ")}</a>
      </h1>
    </div>
  `;

  const renderedContent = parseBlogMarkdown(content);

  const articleHtml = `
    <div id="post-${slug}">
      ${headerHtml}
      <article class="py-8 markdown-body">
        ${renderedContent}
      </article>
      <div id="comments-container-${slug}"></div>
    </div>
  `;

  const loader = document.getElementById("next-post-loader");
  if (loader) loader.remove();
  container.insertAdjacentHTML('beforeend', articleHtml);

  // Inject TOC and Interactions via DOM manipulation
  injectTOCAndInteractions(slug);

  // Initialize the comments section
  renderCommentSection(`comments-container-${slug}`, slug);
  const postRoot = document.getElementById(`post-${slug}`);
  if (postRoot) {
    initWidgets(postRoot);
    renderBlogMath(postRoot);
    executeDynamicScripts(postRoot);
  }
};

function executeDynamicScripts(element) {
  const scripts = element.querySelectorAll('script');
  scripts.forEach(oldScript => {
    const newScript = document.createElement('script');
    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}



window.switchTab = function (tabName) {
  const btnInternal = document.getElementById("btn-tab-internal");
  const btnExternal = document.getElementById("btn-tab-external");
  const tabInternal = document.getElementById("tab-internal");
  const tabExternal = document.getElementById("tab-external");
  const mainNav = document.getElementById("main-nav");

  const aboutContainer = document.getElementById("about-section");
  if (aboutContainer) aboutContainer.classList.remove("hidden");
  if (mainNav) mainNav.classList.remove("hidden");

  if (tabName === "internal") {
    btnInternal.classList.add("border-gray-900", "text-gray-900", "dark:border-gray-100", "dark:text-gray-100");
    btnInternal.classList.remove("border-transparent", "text-gray-400", "dark:text-gray-600");

    btnExternal.classList.add("border-transparent", "text-gray-400", "dark:text-gray-600");
    btnExternal.classList.remove("border-gray-900", "text-gray-900", "dark:border-gray-100", "dark:text-gray-100");

    tabInternal.classList.remove("hidden");
    tabExternal.classList.add("hidden");

    loadBlogs();
  } else {
    btnExternal.classList.add("border-gray-900", "text-gray-900", "dark:border-gray-100", "dark:text-gray-100");
    btnExternal.classList.remove("border-transparent", "text-gray-400", "dark:text-gray-600");

    btnInternal.classList.add("border-transparent", "text-gray-400", "dark:text-gray-600");
    btnInternal.classList.remove("border-gray-900", "text-gray-900", "dark:border-gray-100", "dark:text-gray-100");

    tabExternal.classList.remove("hidden");
    tabInternal.classList.add("hidden");
    renderExternalLinks();
  }
};

const ICONS = {
  "Medium": { icon: "M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94", color: "bg-black text-white", viewBox: "0 0 1043.63 592.71" },
  "DEV.to": { icon: "M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.26v29.58H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z", color: "bg-gray-100 text-gray-900 border border-gray-300", viewBox: "0 0 448 512" }
};

async function renderExternalLinks() {
  const container = document.getElementById("external-articles-list");
  container.innerHTML = `<div class="flex flex-col items-center justify-center py-24"><div class="w-10 h-10 border-4 border-gray-100 dark:border-gray-800 border-t-gray-900 dark:border-t-gray-100 rounded-full animate-spin"></div></div>`;

  let articles = [];

  try {
    const devRes = await fetch("https://dev.to/api/articles?username=shaluka");
    if (devRes.ok) {
      const devData = await devRes.json();
      devData.forEach(item => {
        articles.push({
          platform: "DEV.to",
          title: item.title,
          url: item.url,
          date: new Date(item.published_at).getTime()
        });
      });
    }
  } catch (e) { console.warn("Failed Dev.to fetch", e); }

  try {
    const medRes = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@shalukagimhan");
    if (medRes.ok) {
      const medData = await medRes.json();
      if (medData.items) {
        medData.items.forEach(item => {
          articles.push({
            platform: "Medium",
            title: item.title,
            url: item.link,
            date: new Date(item.pubDate).getTime()
          });
        });
      }
    }
  } catch (e) { console.warn("Failed Medium fetch", e); }

  articles.sort((a, b) => b.date - a.date);

  // If no articles fetched from APIs, show a fallback message
  if (articles.length === 0) {
    container.innerHTML = `<div class="flex flex-col items-center justify-center py-24"><p class="text-gray-500 dark:text-gray-400">No external publications found yet.</p></div>`;
    return;
  }

  let html = `<div class="grid gap-10">`;
  articles.forEach(art => {
    const defaultData = ICONS[art.platform] || ICONS["Medium"];
    const dateStr = new Date(art.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    html += `
      <a href="${art.url}" target="_blank" class="border-l-4 border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-100 pl-6 py-2 block group transition-colors">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">${art.platform} &mdash; ${dateStr}</span>
        </div>
        <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight">${art.title}</h3>
      </a>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

window.goHome = function() {
  window.location.href = "/";
}

async function loadAllBlogsForStaticPage(currentSlug) {
  try {
    const cacheBuster = "?t=" + new Date().getTime();
    const localRes = await fetch('/blogs/index.json' + cacheBuster);
    if (localRes.ok) {
      const localData = await localRes.json();
      window.allBlogs = localData.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });
      window.currentPostIndex = window.allBlogs.findIndex(b => b.name.replace(".md", "") === currentSlug);
    }

    try {
      const vecRes = await fetch('/blogs/vectors.json' + cacheBuster);
      if (vecRes.ok) window.allVectors = await vecRes.json();
    } catch(e) {}
  } catch (err) {
    console.warn("Could not load index for infinite scroll", err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const slugMeta = document.querySelector('meta[name="blog-slug"]');
  if (slugMeta) {
    const slug = slugMeta.content;

    const mainNav = document.getElementById("main-nav");
    if (mainNav) mainNav.classList.add("hidden");
    const searchContainer = document.getElementById("search-container");
    if (searchContainer) searchContainer.style.display = 'none';

    await loadAllBlogsForStaticPage(slug);

    renderCommentSection(`comments-container-${slug}`, slug);
    injectTOCAndInteractions(slug);
    initWidgets(document);
    renderBlogMath(document);
  } else {
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
      window.location.href = `/blogs/${initialHash}`;
    } else {
      loadBlogs();
    }
  }
});

function injectTOCAndInteractions(slug) {
  const postRoot = document.getElementById(`post-${slug}`);
  if (!postRoot) return;
  if (document.getElementById(`btn-like-icon`)) return; // Already injected

  const markdownBody = postRoot.querySelector('.markdown-body');
  if (!markdownBody) return;

  const headings = markdownBody.querySelectorAll('h2, h3');
  
  let tocHtml = '';
  if (headings.length > 0) {
    tocHtml = `
      <aside class="toc-sidebar hidden lg:block w-64 flex-shrink-0 sticky top-10 h-fit">
        <div class="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1a]">
          <h3 class="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-4">Table of Contents</h3>
          <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
    `;
    headings.forEach((h, index) => {
      const text = h.textContent;
      let baseId = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (!baseId) baseId = 'section';
      
      let id = baseId;
      let counter = 1;
      // Check for duplicates in previously processed headings
      while (Array.from(headings).slice(0, index).some(prev => prev.id === id)) {
        id = baseId + '-' + counter;
        counter++;
      }
      
      h.id = id;
      h.classList.add('scroll-mt-24');
      const isH3 = h.tagName.toLowerCase() === 'h3';
      tocHtml += `<li class="${isH3 ? 'ml-4' : ''}"><a href="#${id}" class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">${text}</a></li>`;
    });
    tocHtml += `</ul></div></aside>`;
  }

  const interactionsHtml = `
    <div class="flex items-center gap-4 mt-8 mb-4 border-t border-b border-gray-200 dark:border-gray-800 py-3 w-full">
      <button onclick="toggleLike('${slug}')" class="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors group">
        <svg id="btn-like-icon" class="w-6 h-6 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        <span id="like-count" class="font-bold text-gray-900 dark:text-gray-100 text-sm">0</span>
      </button>
      <div class="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
      <button onclick="toggleBookmark('${slug}')" class="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors group" title="Bookmark Post">
        <svg id="btn-bookmark-icon" class="w-6 h-6 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
      </button>
    </div>
  `;

  const flexContainer = document.createElement('div');
  flexContainer.className = 'flex flex-col lg:flex-row gap-10';

  const contentCol = document.createElement('div');
  contentCol.className = 'flex-grow min-w-0';

  postRoot.insertBefore(flexContainer, markdownBody);
  contentCol.appendChild(markdownBody);
  contentCol.insertAdjacentHTML('beforeend', interactionsHtml);
  
  const commentsContainer = document.getElementById(`comments-container-${slug}`);
  if (commentsContainer) {
    contentCol.appendChild(commentsContainer);
  }

  renderRelatedPosts(slug, contentCol);

  flexContainer.appendChild(contentCol);

  if (tocHtml) {
    flexContainer.insertAdjacentHTML('beforeend', tocHtml);
  }

  setupInteractionsUI(slug);
}

function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function getRelatedBlogs(currentSlug, limit = 3) {
  const currentBlog = window.allBlogs.find(b => b.name.replace('.md', '') === currentSlug);
  if (!currentBlog) return [];

  const currentVec = window.allVectors ? window.allVectors[currentSlug] : null;
  const currentKeywords = (currentBlog.keywords || currentBlog.title || "").toLowerCase().split(/[\s,]+/).filter(k => k.length > 2);

  const scoredBlogs = window.allBlogs
    .filter(b => b.name.replace('.md', '') !== currentSlug)
    .map(blog => {
      let score = 0;
      const otherSlug = blog.name.replace('.md', '');
      
      // Use AI Semantic Vector if available
      if (currentVec && window.allVectors && window.allVectors[otherSlug]) {
        score = cosineSimilarity(currentVec, window.allVectors[otherSlug]) * 10;
      } else {
        // Fallback to keyword matching
        const blogKeywords = (blog.keywords || blog.title || "").toLowerCase().split(/[\s,]+/).filter(k => k.length > 2);
        currentKeywords.forEach(kw => {
          if (blogKeywords.includes(kw)) score += 2;
          else if (blogKeywords.some(bk => bk.includes(kw) || kw.includes(bk))) score += 1;
        });
      }

      return { blog, score };
    })
    .filter(item => item.score > 0.1) // Adjusted threshold for vectors
    .sort((a, b) => b.score - a.score || new Date(b.blog.date) - new Date(a.blog.date));

  let results = scoredBlogs.map(item => item.blog);

  if (results.length < limit) {
    const otherBlogs = window.allBlogs
      .filter(b => b.name.replace('.md', '') !== currentSlug && !results.includes(b));
    results = [...results, ...otherBlogs];
  }

  return results.slice(0, limit);
}

function renderRelatedPosts(slug, container) {
  const related = getRelatedBlogs(slug);
  if (related.length === 0) return;

  let html = `
    <div class="mt-16 mb-8 border-t-2 border-gray-900 dark:border-gray-100 pt-8">
      <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
        Read Next
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  `;

  related.forEach(blog => {
    const postSlug = blog.name.replace('.md', '');
    const title = blog.title || postSlug.replace(/-/g, ' ');
    const cover = blog.coverImage || '';
    const dateStr = blog.date ? new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
    
    html += `
      <a href="/blogs/${postSlug}" class="group block border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-900 dark:hover:border-gray-100 hover:shadow-lg transition-all bg-white dark:bg-[#1a1a1a]">
        ${cover ? `<img src="${cover}" class="w-full h-32 object-cover" alt="${title}" />` : `<div class="w-full h-32 bg-gray-100 dark:bg-[#222] flex items-center justify-center text-gray-400"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg></div>`}
        <div class="p-4">
          <h4 class="font-bold text-gray-900 dark:text-gray-100 text-sm line-clamp-2 leading-snug transition-colors">${title}</h4>
          <span class="text-[10px] uppercase tracking-widest font-bold text-gray-500 mt-2 block">${dateStr}</span>
        </div>
      </a>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', html);
}
