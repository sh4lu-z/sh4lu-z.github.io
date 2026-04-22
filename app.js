import { renderCommentSection } from './comments.js';

window.allBlogs = []; // Store blogs for search filtering
window.currentPostIndex = -1;
window.loadingNextPost = false;
window.postObserver = null;
window.lastScrollPosition = 0;

async function loadBlogs(restoreScroll = false) {
  const container = document.getElementById("app-content");

  try {
    let localBlogs = [];
    const cacheBuster = "?t=" + new Date().getTime();
    const localRes = await fetch('/blogs/index.json' + cacheBuster);
    if (localRes.ok) {
      const localData = await localRes.json();
      localBlogs = localData.map(b => b);
    }

    let finalBlogs = Array.from(localBlogs);
    finalBlogs.sort((a, b) => {
      // Sort by date newest first
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

    window.allBlogs = finalBlogs;
    renderList(finalBlogs);

    if (restoreScroll && window.lastScrollPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo({ top: window.lastScrollPosition, behavior: 'instant' });
      }, 50);
    }
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
      <div class="border-l-4 border-gray-900 dark:border-gray-100 pl-6 py-2 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] cursor-pointer transition-colors flex flex-col group" onclick="viewPost('${slug}')">
        ${imgHtml}
        <h3 class="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100 group-hover:underline underline-offset-4">${title}</h3>
        <div class="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          ${dateStr}
        </div>
        ${desc}
      </div>
    `;
  });
  html += `</div>`;

  container.innerHTML = html;
}

function updateMetaTags(blog) {
  const url = window.location.origin + window.location.pathname + "#" + blog.name.replace('.md', '');
  document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
  document.querySelector('meta[property="twitter:url"]')?.setAttribute("content", url);

  if (blog.title) {
    document.querySelector('meta[name="title"]')?.setAttribute("content", blog.title);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", blog.title);
    document.querySelector('meta[property="twitter:title"]')?.setAttribute("content", blog.title);
  }
  if (blog.description) {
    document.querySelector('meta[name="description"]')?.setAttribute("content", blog.description);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", blog.description);
    document.querySelector('meta[property="twitter:description"]')?.setAttribute("content", blog.description);
  }
  if (blog.coverImage) {
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", blog.coverImage);
    document.querySelector('meta[property="twitter:image"]')?.setAttribute("content", blog.coverImage);
  }
}

window.viewPost = async function (slug, append = false) {
  if (!append) {
    window.history.pushState(null, '', `#${slug}`);
    window.currentPostIndex = window.allBlogs.findIndex(b => b.name.replace(".md", "") === slug);
    if (window.currentPostIndex !== -1) {
      const blogMeta = window.allBlogs[window.currentPostIndex];
      document.title = `${blogMeta.title || slug.replace(/-/g, " ")} - Shaluka's Blog`;
      updateMetaTags(blogMeta);
    }
  }

  const searchContainer = document.getElementById("search-container");
  if (searchContainer) searchContainer.style.display = 'none';

  const container = document.getElementById("app-content");
  const mainNav = document.getElementById("main-nav");
  if (mainNav) mainNav.classList.add("hidden");

  if (!append) {
    window.lastScrollPosition = window.scrollY || document.documentElement.scrollTop;
    container.innerHTML = `<div class="flex flex-col items-center justify-center py-24"><div class="w-10 h-10 border-4 border-gray-100 dark:border-gray-800 border-t-gray-900 dark:border-t-gray-100 rounded-full animate-spin"></div></div>`;
    
    // Shrink header
        const headerTitle = document.getElementById('main-header');
        if (headerTitle) {
          headerTitle.classList.remove('py-12', 'sm:py-16', 'border-b-2', 'mb-10');
          headerTitle.classList.add('py-4', 'sm:py-6', 'mb-6');
        }
        const title = document.getElementById('site-title');
        if (title) {
          title.classList.remove('text-4xl', 'sm:text-5xl');
          title.classList.add('text-lg', 'sm:text-xl');
        }
        const desc = document.getElementById('site-desc');
        if (desc) desc.classList.add('hidden');

        // Hide About if visible
        const aboutContainer = document.getElementById('about-section');
        if (aboutContainer) aboutContainer.classList.add('hidden');
      }

  let content = "";
  try {
    const cacheBuster = "?t=" + new Date().getTime();
    const resp = await fetch(`/blogs/${slug}.md` + cacheBuster);
    if (resp.ok) {
      content = await resp.text();
    } else {
      content = "## Not Found.";
    }
  } catch (e) {
    content = "## Error loading.";
  }

  const shareUrl = window.location.origin + window.location.pathname + "#" + slug;

  let headerHtml = "";
  let dateStr = "Recently";
  if (window.currentPostIndex !== -1 && window.allBlogs[window.currentPostIndex].date) {
     dateStr = new Date(window.allBlogs[window.currentPostIndex].date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  if (!append) {
    headerHtml = `
      <div class="flex items-center justify-between mb-8">
        <button onclick="goHome()" class="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" title="Back to list">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <button onclick="navigator.clipboard.writeText('${shareUrl}'); window.showToast('Link copied to clipboard!', 'success');" class="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" title="Copy shareable link">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
        </button>
      </div>
      
      <div class="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 class="text-4xl sm:text-5xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-4 tracking-tight">
          ${window.currentPostIndex !== -1 ? (window.allBlogs[window.currentPostIndex].title || slug.replace(/-/g, " ")) : slug.replace(/-/g, " ")}
        </h1>
        <div class="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Published on ${dateStr}
        </div>
      </div>
    `;
  } else {
    // Divider for appended posts
    headerHtml = `
      <div class="my-24 border-b border-gray-200 dark:border-gray-800 text-center relative max-w-lg mx-auto">
        <span class="bg-[#fcfcfc] dark:bg-[#141414] px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-200 absolute -top-2 left-1/2 transform -translate-x-1/2">
          Next Blog
        </span>
      </div>
    `;
  }

  const articleHtml = `
    <div id="post-${slug}">
      ${headerHtml}
      <article class="py-8 markdown-body">
        ${marked.parse(content)}
      </article>
      <div id="comments-container-${slug}"></div>
    </div>
  `;

  if (!append) {
    container.innerHTML = articleHtml;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const loader = document.getElementById("next-post-loader");
    if (loader) loader.remove();
    container.insertAdjacentHTML('beforeend', articleHtml);
  }

  // Initialize the comments section
  renderCommentSection(`comments-container-${slug}`, slug);

  setupNextPostObserver();
};

function setupNextPostObserver() {
  if (window.currentPostIndex === -1 || window.currentPostIndex >= window.allBlogs.length - 1) return;

  const container = document.getElementById("app-content");

  let loader = document.getElementById("next-post-loader");
  if (!loader) {
    loader = document.createElement("div");
    loader.id = "next-post-loader";
    loader.className = "flex flex-col items-center justify-center py-20 opacity-0 transition-opacity";
    loader.innerHTML = `<div class="w-8 h-8 border-2 border-gray-200 dark:border-gray-800 border-t-gray-900 dark:border-t-gray-100 rounded-full animate-spin"></div>`;
    container.appendChild(loader);
  }

  if (window.postObserver) window.postObserver.disconnect();

  window.postObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !window.loadingNextPost) {
      window.loadingNextPost = true;
      loader.classList.remove("opacity-0");
      setTimeout(() => {
        window.currentPostIndex++;
        const nextSlug = window.allBlogs[window.currentPostIndex].name.replace(".md", "");
        viewPost(nextSlug, true).then(() => {
          window.loadingNextPost = false;
        });
      }, 300);
    }
  }, { rootMargin: "100px" });

  window.postObserver.observe(loader);
}

window.goHome = function (scrollToAbout = false) {
  document.title = "Shaluka's Blog - Thoughts & Code";
  window.history.pushState(null, '', window.location.pathname);
  if (window.postObserver) window.postObserver.disconnect();

  // Expand header
  const headerTitle = document.getElementById('main-header');
  if (headerTitle) {
    headerTitle.classList.add('py-12', 'sm:py-16', 'border-b-2', 'mb-10');
    headerTitle.classList.remove('py-4', 'sm:py-6', 'mb-6');
  }
  const title = document.getElementById('site-title');
  if (title) {
    title.classList.add('text-4xl', 'sm:text-5xl');
    title.classList.remove('text-lg', 'sm:text-xl');
  }
  const desc = document.getElementById('site-desc');
  if (desc) desc.classList.remove('hidden');

  const aboutContainer = document.getElementById('about-section');
  if (aboutContainer) aboutContainer.classList.remove('hidden');

  const searchContainer = document.getElementById("search-container");
  if (searchContainer) searchContainer.style.display = 'block';

  switchTab("internal", !scrollToAbout);

  if (scrollToAbout) {
    setTimeout(() => {
      document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
};

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

const EXTERNAL_ARTICLES = [
  { platform: "Medium", title: "Mastering the JavaScript Event Loop", url: "https://medium.com/@sh4lu_z/mastering-the-javascript-event-loop" },
  { platform: "DEV.to", title: "Top 10 VS Code Extensions I Use Daily", url: "https://dev.to/sh4lu_z/top-10-vs-code-extensions" },
  { platform: "Medium", title: "Building a Zero-Backend Blog", url: "https://medium.com/@sh4lu_z/building-a-zero-backend-blog" },
  { platform: "DEV.to", title: "Why I Treat GitHub as a Free Database", url: "https://dev.to/sh4lu_z/why-i-treat-github-as-a-free-database" },
  { platform: "Medium", title: "My Favorite Web APIs in 2026", url: "https://medium.com/@sh4lu_z/my-favorite-web-apis" }
];

window.switchTab = function (tabName, restoreScroll = false) {
  const btnInternal = document.getElementById("btn-tab-internal");
  const btnExternal = document.getElementById("btn-tab-external");
  const tabInternal = document.getElementById("tab-internal");
  const tabExternal = document.getElementById("tab-external");
  const mainNav = document.getElementById("main-nav");

  // Ensure About is visible when switching tabs
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

    // Refresh internal blogs so opening a post and switching tabs resets it
    loadBlogs(restoreScroll);
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

  // Fetch DEV.to articles
  try {
    const devRes = await fetch("https://dev.to/api/articles?username=sh4lu_z");
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

  // Fetch Medium articles
  try {
    const medRes = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sh4lu_z");
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

  // Sort by date (newest first)
  articles.sort((a, b) => b.date - a.date);

  if (articles.length === 0) {
    container.innerHTML = `<div class="text-center py-20"><h3 class="text-2xl font-bold mb-2 text-gray-900">No external papers.</h3><p class="text-gray-500 mb-8 text-lg italic">We couldn't fetch articles for @sh4lu_z right now.</p></div>`;
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

// Initial Call
document.addEventListener("DOMContentLoaded", () => {
  const initialHash = window.location.hash.substring(1);
  if (initialHash) {
    // Hide UI briefly while initializing
    const mainNav = document.getElementById("main-nav");
    if (mainNav) mainNav.classList.add("hidden");
    const searchContainer = document.getElementById("search-container");
    if (searchContainer) searchContainer.style.display = 'none';

    // Set UI directly to that post
    viewPost(initialHash);
  } else {
    loadBlogs();
  }
});
