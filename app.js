window.allBlogs = []; // Store blogs for search filtering

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

    let finalBlogs = Array.from(localBlogs);
    finalBlogs.sort((a, b) => b.name.localeCompare(a.name)); // quick reverse sort by filename

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
      <div class="border-l-4 border-gray-900 pl-6 py-2 hover:bg-gray-50 cursor-pointer transition-colors flex flex-col" onclick="viewPost('${slug}')">
        ${imgHtml}
        <h3 class="text-2xl font-bold mb-1 text-gray-900">${title}</h3>
        <div class="text-xs text-gray-500 font-bold tracking-widest uppercase mb-3">${dateStr}</div>
        ${desc}
        <div class="mt-auto inline-flex items-center text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-900 w-max group">
          Read Post <span class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </div>
      </div>
    `;
  });
  html += `</div>`;

  container.innerHTML = html;
}

window.viewPost = async function (slug) {
  // Update URL hash for sharing
  window.history.pushState(null, '', `#${slug}`);

  // Hide Search
  const searchContainer = document.getElementById("search-container");
  if(searchContainer) searchContainer.style.display = 'none';

  const container = document.getElementById("app-content");
  const mainNav = document.getElementById("main-nav");
  if (mainNav) mainNav.classList.add("hidden");

  container.innerHTML = `<div class="flex flex-col items-center justify-center py-24"><div class="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div></div>`;

  let content = "";

  try {
    const cacheBuster = "?t=" + new Date().getTime();
    const resp = await fetch(`/blogs/${slug}.md` + cacheBuster);
    if (resp.ok) {
      content = await resp.text();
    } else {
      content = "# 404 Not Found\nCould not load file.";
    }
  } catch (e) {
    content = "# Error loading file";
  }

  const shareUrl = window.location.href;

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-gray-200 pb-4">
      <button onclick="goHome()" class="text-gray-900 font-bold uppercase tracking-widest text-sm hover:underline flex items-center gap-2 shrink-0 w-max">&larr; Back</button>
      <div class="flex items-center gap-4 text-sm">
        <span class="text-gray-500 truncate min-w-0 italic">${shareUrl}</span>
        <button onclick="navigator.clipboard.writeText('${shareUrl}'); alert('Link copied to clipboard!');" class="text-gray-900 font-bold uppercase tracking-widest hover:underline shrink-0 cursor-pointer">Copy Link</button>
      </div>
    </div>
    <article class="py-8 markdown-body">
      ${marked.parse(content)}
    </article>
  `;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.goHome = function () {
  window.history.pushState(null, '', window.location.pathname);
  
  const searchContainer = document.getElementById("search-container");
  if(searchContainer) searchContainer.style.display = 'block';

  switchTab("internal");
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

window.switchTab = function (tabName) {
  const btnInternal = document.getElementById("btn-tab-internal");
  const btnExternal = document.getElementById("btn-tab-external");
  const tabInternal = document.getElementById("tab-internal");
  const tabExternal = document.getElementById("tab-external");
  const mainNav = document.getElementById("main-nav");

  if (mainNav) mainNav.classList.remove("hidden");

  if (tabName === "internal") {
    btnInternal.classList.add("border-gray-900", "text-gray-900");
    btnInternal.classList.remove("border-transparent", "text-gray-400");

    btnExternal.classList.add("border-transparent", "text-gray-400");
    btnExternal.classList.remove("border-gray-900", "text-gray-900");

    tabInternal.classList.remove("hidden");
    tabExternal.classList.add("hidden");

    // Refresh internal blogs so opening a post and switching tabs resets it
    loadBlogs();
  } else {
    btnExternal.classList.add("border-gray-900", "text-gray-900");
    btnExternal.classList.remove("border-transparent", "text-gray-400");

    btnInternal.classList.add("border-transparent", "text-gray-400");
    btnInternal.classList.remove("border-gray-900", "text-gray-900");

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
  container.innerHTML = `<div class="flex flex-col items-center justify-center py-24"><div class="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div></div>`;

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
      <a href="${art.url}" target="_blank" class="border-l-4 border-gray-300 hover:border-gray-900 pl-6 py-2 block group transition-colors">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">${art.platform} &mdash; ${dateStr}</span>
        </div>
        <h3 class="text-2xl font-bold mb-3 text-gray-900 line-clamp-2 leading-tight">${art.title}</h3>
        <div class="inline-flex items-center text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-900 w-max">
          View Publication
        </div>
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
    if(searchContainer) searchContainer.style.display = 'none';

    // Set UI directly to that post
    viewPost(initialHash);
  } else {
    loadBlogs();
  }
});
