// We can tap into the Vite env variables securely
const GH_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || localStorage.getItem("gh_token") || "";
const GH_OWNER = import.meta.env.VITE_GITHUB_OWNER || localStorage.getItem("gh_owner") || "sh4lu-z";
const GH_REPO = import.meta.env.VITE_GITHUB_REPO || localStorage.getItem("gh_repo") || "sh4lu-z.github.io";

async function loadBlogs() {
  const container = document.getElementById("app-content");
  
  try {
    let localBlogs = [];
    const localRes = await fetch('/blogs/index.json');
    if(localRes.ok) {
      const localData = await localRes.json();
      localBlogs = localData.map(b => ({ name: b.name }));
    }

    let finalBlogs = Array.from(localBlogs);
    finalBlogs.sort((a,b) => b.name.localeCompare(a.name)); // quick reverse sort by filename

    renderList(finalBlogs);
  } catch (err) {
    container.innerHTML = `<div class="text-center font-bold p-8 text-gray-500">No blogs found. Head to the Admin panel to start writing!</div>`;
  }
}

function renderList(blogs) {
  const container = document.getElementById("app-content");
  
  if (blogs.length === 0) {
    container.innerHTML = `
       <div class="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 text-center max-w-2xl mx-auto">
           <div class="text-4xl mb-4">📄</div>
           <h3 class="text-2xl font-bold mb-2 text-gray-900">No posts found!</h3>
           <p class="text-gray-500 mb-8 text-lg">Head over to the Admin Panel to write your first markdown post.</p>
           <a href="/admin.html" class="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow hover:bg-blue-700 transition">Go to Admin</a>
       </div>
    `;
    return;
  }

  let html = `<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">`;
  blogs.forEach(blog => {
    const slug = blog.name.replace(".md", "");
    const title = slug.replace(/-/g, " ");
    html += `
      <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 hover:border-gray-900 hover:shadow-xl cursor-pointer transition-all transform hover:-translate-y-1" onclick="viewPost('${slug}')">
        <div class="text-xs font-bold font-mono text-gray-400 mb-4 tracking-widest uppercase">📄 Article</div>
        <h3 class="text-2xl font-bold capitalize mb-8 text-gray-900 line-clamp-3 leading-tight">${title}</h3>
        <div class="flex items-center text-blue-600 font-bold group">
          Read Post <span class="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  
  container.innerHTML = html;
}

window.viewPost = async function(slug) {
  const container = document.getElementById("app-content");
  const mainNav = document.getElementById("main-nav");
  if(mainNav) mainNav.classList.add("hidden");

  container.innerHTML = `<div class="text-gray-500 font-bold text-center py-20 text-xl">Fetching post data...</div>`;

  let content = "";
  
  try {
    const resp = await fetch(`/blogs/${slug}.md`);
    if(resp.ok) {
      content = await resp.text();
    } else {
      content = "# 404 Not Found\nCould not load file.";
    }
  } catch(e) {
    content = "# Error loading file";
  }

  container.innerHTML = `
    <button onclick="goHome()" class="bg-gray-200 text-gray-800 px-6 py-2.5 rounded-full font-bold hover:bg-gray-300 transition-colors mb-8 flex items-center gap-2 shadow-sm">← Back to Posts</button>
    <article class="bg-white p-8 sm:p-12 lg:p-16 rounded-3xl shadow-md border border-gray-100 markdown-body">
      ${marked.parse(content)}
    </article>
  `;
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.goHome = function() {
  switchTab("internal");
};

const EXTERNAL_ARTICLES = [
  { platform: "Medium", title: "Mastering the JavaScript Event Loop", url: "https://medium.com/@sh4lu_z/mastering-the-javascript-event-loop" },
  { platform: "DEV.to", title: "Top 10 VS Code Extensions I Use Daily", url: "https://dev.to/sh4lu_z/top-10-vs-code-extensions" },
  { platform: "Medium", title: "Building a Zero-Backend Blog", url: "https://medium.com/@sh4lu_z/building-a-zero-backend-blog" },
  { platform: "DEV.to", title: "Why I Treat GitHub as a Free Database", url: "https://dev.to/sh4lu_z/why-i-treat-github-as-a-free-database" },
  { platform: "Medium", title: "My Favorite Web APIs in 2026", url: "https://medium.com/@sh4lu_z/my-favorite-web-apis" }
];

window.switchTab = function(tabName) {
  const btnInternal = document.getElementById("btn-tab-internal");
  const btnExternal = document.getElementById("btn-tab-external");
  const tabInternal = document.getElementById("tab-internal");
  const tabExternal = document.getElementById("tab-external");
  const mainNav = document.getElementById("main-nav");

  if(mainNav) mainNav.classList.remove("hidden");

  if (tabName === "internal") {
    btnInternal.classList.replace("border-transparent", "border-blue-600");
    btnInternal.classList.replace("text-gray-500", "text-blue-600");
    
    btnExternal.classList.replace("border-blue-600", "border-transparent");
    btnExternal.classList.replace("text-blue-600", "text-gray-500");

    tabInternal.classList.remove("hidden");
    tabExternal.classList.add("hidden");
    
    // Refresh internal blogs so opening a post and switching tabs resets it
    loadBlogs();
  } else {
    btnExternal.classList.replace("border-transparent", "border-blue-600");
    btnExternal.classList.replace("text-gray-500", "text-blue-600");
    
    btnInternal.classList.replace("border-blue-600", "border-transparent");
    btnInternal.classList.replace("text-blue-600", "text-gray-500");

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
  container.innerHTML = `<div class="text-gray-500 font-bold text-center py-20 text-xl">Fetching articles directly from DEV.to and Medium...</div>`;
  
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
  } catch(e) { console.warn("Failed Dev.to fetch", e); }

  // Fetch Medium articles
  try {
    const medRes = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sh4lu_z");
    if (medRes.ok) {
      const medData = await medRes.json();
      if(medData.items) {
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
  } catch(e) { console.warn("Failed Medium fetch", e); }

  // Sort by date (newest first)
  articles.sort((a,b) => b.date - a.date);

  if (articles.length === 0) {
    container.innerHTML = `<div class="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 text-center max-w-2xl mx-auto"><h3 class="text-2xl font-bold mb-2">No Articles Found</h3><p class="text-gray-500 mb-8 text-lg">We couldn't fetch articles for @sh4lu_z across Medium and DEV.to right now.</p></div>`;
    return;
  }

  let html = `<div class="grid gap-6 sm:grid-cols-2">`;
  articles.forEach(art => {
    const defaultData = ICONS[art.platform] || ICONS["Medium"];
    
    html += `
      <a href="${art.url}" target="_blank" class="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 hover:border-gray-900 hover:shadow-xl transition-all transform hover:-translate-y-1 block group">
        <div class="flex items-center gap-3 mb-6">
          <span class="inline-flex items-center justify-center p-2 rounded-xl ${defaultData.color}">
            <svg class="w-6 h-6" viewBox="${defaultData.viewBox}" fill="currentColor"><path d="${defaultData.icon}"></path></svg>
          </span>
          <span class="text-sm font-bold text-gray-500 uppercase tracking-wider">${art.platform}</span>
        </div>
        <h3 class="text-2xl font-bold mb-4 text-gray-900 line-clamp-3 leading-tight group-hover:text-blue-600 transition-colors">${art.title}</h3>
        <div class="inline-flex items-center text-sm font-bold text-gray-500 group-hover:text-blue-600 transition-colors">
          Read on ${art.platform} <span class="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </a>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

// Initial Call
document.addEventListener("DOMContentLoaded", () => {
  loadBlogs();
});
