const GH_TOKEN = localStorage.getItem("gh_token") || "";
const GH_OWNER = "sh4lu-z"; // Hardcoded
const GH_REPO = "sh4lu-z.github.io"; // Hardcoded

const tokenInput = document.getElementById("gh-token");
const saveBtn = document.getElementById("save-settings");
const adminBlogList = document.getElementById("admin-blog-list");
const publishBtn = document.getElementById("publish-btn");
const refreshBtn = document.getElementById("refresh-btn");
const settingsPanel = document.getElementById("settings-panel");

let editor; // For EasyMDE

function initializeEditor() {
  editor = new EasyMDE({ 
    element: document.getElementById('blog-content'),
    spellChecker: false,
    placeholder: "Start your mind-blowing article here...",
    status: ["lines", "words", "preview"],
    minHeight: "500px",
    autosave: {
      enabled: true,
      uniqueId: "shaluka-blog-editor",
      delay: 1000,
    },
    toolbar: [
      "bold", "italic", "strikethrough", "heading", "|", 
      "quote", "unordered-list", "ordered-list", "|", 
      "link", "image", "table", "horizontal-rule", "|", 
      "preview", "side-by-side", "fullscreen", "|", 
      "guide"
    ],
  });
}

function loadSettings() {
  // If token is found, hide settings!
  if (GH_TOKEN) {
    settingsPanel.classList.add("!hidden");
  } else {
    settingsPanel.classList.remove("!hidden");
    tokenInput.value = localStorage.getItem("gh_token") || "";
  }
}

saveBtn.addEventListener("click", () => {
  localStorage.setItem("gh_token", tokenInput.value.trim());
  window.showToast("Settings safely saved to your browser!", 'success');
  fetchAdminBlogs();
});

refreshBtn.addEventListener("click", () => {
  fetchAdminBlogs();
});

async function fetchAdminBlogs() {
  const owner = GH_OWNER;
  const repo = GH_REPO;
  const token = tokenInput.value.trim() || GH_TOKEN;

  if (!owner || !repo || !token) {
    adminBlogList.innerHTML = `<div class="text-amber-600 bg-amber-50 p-4 rounded-xl text-center font-bold">Waiting for GitHub Token...</div>`;
    return;
  }
  
  adminBlogList.innerHTML = `<div class="text-gray-500 text-center font-bold">Connecting to GitHub API...</div>`;

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/blogs/md`, {
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });
    
    if (res.status === 404) {
      adminBlogList.innerHTML = `<div class="bg-blue-50 text-blue-800 p-6 rounded-xl text-center font-bold">The 'blogs/md' folder doesn't exist yet in your repo. It will be created automatically when you publish your first post!</div>`;
      return;
    }

    if (!res.ok) {
       const err = await res.json();
       throw new Error(err.message || "Failed to fetch blogs (Check your Token)");
    }
    
    const data = await res.json();
    const blogs = data.filter(f => f.name.endsWith(".md"));

    if (blogs.length === 0) {
      adminBlogList.innerHTML = `<div class="text-center p-6 text-gray-500 font-bold border-2 border-dashed border-gray-200 rounded-xl">No markdown files found. Start writing!</div>`;
      return;
    }

    let html = `<div class="flex flex-col gap-3">`;
    blogs.forEach(blog => {
      html += `
        <div class="flex justify-between items-center bg-gray-50 hover:bg-gray-100 border border-gray-200 p-4 rounded-xl transition-colors">
          <div>
            <span class="font-bold text-gray-900 block line-clamp-1">${blog.name}</span>
            <span class="text-xs text-green-600 font-bold uppercase tracking-wider">Published</span>
          </div>
          <div class="flex gap-2">
            <button onclick="editBlog('${blog.name}')" class="text-gray-900 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 font-bold shadow-sm transition">Edit</button>
            <button onclick="deleteBlog('${blog.name}', '${blog.sha}')" class="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 font-bold shadow-sm transition">Delete</button>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    adminBlogList.innerHTML = html;

  } catch (err) {
    adminBlogList.innerHTML = `<div class="text-red-700 font-bold border border-red-200 p-4 bg-red-50 rounded-xl">Error: ${err.message}</div>`;
  }
}

// Helper to safely handle Base64 encoding with Unicode
function encodeBase64Unicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
      }));
}

// Helper: Get file SHA
async function getFileSha(path, owner, repo, token) {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      return { sha: data.sha, content: data.content };
    }
  } catch (e) {}
  return { sha: null, content: null };
}

// Helper: Generate static HTML string
function generateHtmlForBlog(slug, title, dateStr, coverImage, description, htmlContent) {
  const shareUrl = "https://sh4lu-z.github.io/blogs/" + slug;
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>${title} - Shaluka Gimhan's Blog</title>
  <meta name="title" content="${title}">
  <meta name="description" content="${description}">
  <meta name="blog-slug" content="${slug}">
  <link rel="canonical" href="${shareUrl}">
  
  <meta property="og:type" content="article">
  <meta property="og:url" content="${shareUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${coverImage || 'https://github.com/sh4lu-z.png'}">
  <meta name="twitter:card" content="summary_large_image">
  
  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
  <style type="text/tailwindcss">
    @custom-variant dark (&:where(.dark, .dark *));
  </style>
  <link rel="stylesheet" href="/css/style.css?v=2">
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>
<script>
  if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
</script>
<body class="bg-[#fcfcfc] text-gray-900 font-sans p-4 sm:p-12 transition-colors duration-300 dark:bg-[#141414] dark:text-gray-100">
  <div class="max-w-4xl mx-auto flex flex-col min-h-screen">
    
    <header class="py-4 sm:py-6 mb-6 relative transition-all duration-300">
      <div class="absolute top-0 right-0 sm:top-4 flex items-center gap-2">
        <a href="/" class="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" title="Home">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </a>
        <button onclick="document.documentElement.classList.toggle('dark'); localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');" class="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <svg class="w-6 h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg class="w-6 h-6 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
      </div>
      <h1 class="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 cursor-pointer transition-all duration-300" onclick="window.location.href='/'">Shaluka Gimhan's Blog</h1>
    </header>

    <main id="app-content" class="flex-grow">
      <div id="post-${slug}">
        <div class="flex items-center justify-between mb-8">
          <a href="/" class="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors block" title="Back to list">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </a>
          <button onclick="navigator.clipboard.writeText('${shareUrl}'); window.showToast('Link copied to clipboard!', 'success');" class="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" title="Copy shareable link">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
          </button>
        </div>
        
        <div class="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
          <h1 class="text-4xl sm:text-5xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-4 tracking-tight">${title}</h1>
          <div class="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Published on ${dateStr}
          </div>
        </div>

        <article class="py-8 markdown-body">
          ${htmlContent}
        </article>
        <div id="comments-container-${slug}"></div>
      </div>
    </main>

    <footer class="mt-8 pt-8 pb-8 text-gray-500 dark:text-gray-400 flex flex-col items-center gap-3" style="text-align: center;">
      <p>&copy; 2026 <a href="https://sh4lu-z.vercel.app/" class="hover:text-gray-900 dark:hover:text-gray-100 font-bold transition-colors">Shaluka Gimhan</a>'s Blog.</p>
    </footer>
  </div>
  <script src="/js/toast.js"></script>
  <script type="module" src="/js/app.js"></script>
</body>
</html>`;
}

// Helper: Generate Sitemap XML
function generateSitemap(currentIndex) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sh4lu-z.github.io/</loc>
    <priority>1.0</priority>
  </url>
`;
  currentIndex.forEach(blog => {
    const slug = blog.name.replace(".md", "");
    const lastmod = blog.date ? new Date(blog.date).toISOString() : new Date().toISOString();
    xml += `  <url>
    <loc>https://sh4lu-z.github.io/blogs/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });
  xml += `</urlset>`;
  return xml;
}

publishBtn.addEventListener("click", async () => {
  const title = document.getElementById("blog-title").value.trim();
  const coverImage = document.getElementById("blog-cover").value.trim();
  const description = document.getElementById("blog-desc").value.trim();
  const content = editor.value(); 
  
  const owner = GH_OWNER;
  const repo = GH_REPO;
  const token = tokenInput.value.trim() || GH_TOKEN;

  if (!title || !content) {
    window.showToast("Please provide both a Title and Content.", 'error');
    return;
  }

  if (!token) {
    window.showToast("Please ensure your GitHub Token is saved below.", 'error');
    return;
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  publishBtn.innerText = "Publishing... Please wait";
  publishBtn.disabled = true;
  publishBtn.classList.add("opacity-70", "cursor-not-allowed");

  try {
    const mdPath = `blogs/md/${slug}.md`;
    const htmlPath = `blogs/${slug}/index.html`;
    const dateIso = new Date().toISOString();
    const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    // 1. Get existing SHAs
    const existingMd = await getFileSha(mdPath, owner, repo, token);
    const existingHtml = await getFileSha(htmlPath, owner, repo, token);

    // 2. Publish Markdown
    const mdBody = {
      message: existingMd.sha ? `Updated blog MD: ${title}` : `Created blog MD: ${title}`,
      content: encodeBase64Unicode(content)
    };
    if (existingMd.sha) mdBody.sha = existingMd.sha;

    let res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${mdPath}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(mdBody)
    });
    if (!res.ok) throw new Error("Failed to publish Markdown");

    // 3. Publish HTML (SSG)
    const htmlContent = generateHtmlForBlog(slug, title, dateStr, coverImage, description, marked.parse(content));
    const htmlBody = {
      message: existingHtml.sha ? `Updated blog HTML: ${title}` : `Created blog HTML: ${title}`,
      content: encodeBase64Unicode(htmlContent)
    };
    if (existingHtml.sha) htmlBody.sha = existingHtml.sha;

    res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${htmlPath}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(htmlBody)
    });
    if (!res.ok) throw new Error("Failed to publish HTML");

    // 4. Update index.json
    let currentIndex = [];
    const existingIndex = await getFileSha("blogs/index.json", owner, repo, token);
    if (existingIndex.content) {
      currentIndex = JSON.parse(decodeURIComponent(escape(atob(existingIndex.content.replace(/\s/g, '')))));
    }

    const indexObj = { 
      name: slug + ".md", 
      title: title,
      coverImage: coverImage,
      description: description,
      date: dateIso
    };

    const existingPostIdx = currentIndex.findIndex(i => i.name === indexObj.name);
    if (existingPostIdx >= 0) {
      currentIndex[existingPostIdx] = indexObj;
    } else {
      currentIndex.push(indexObj);
    }

    const indexBody = {
      message: "Update index.json",
      content: encodeBase64Unicode(JSON.stringify(currentIndex, null, 2))
    };
    if (existingIndex.sha) indexBody.sha = existingIndex.sha;

    await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/blogs/index.json`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(indexBody)
    });

    // 5. Update sitemap.xml
    const sitemapContent = generateSitemap(currentIndex);
    const existingSitemap = await getFileSha("sitemap.xml", owner, repo, token);
    const sitemapBody = {
      message: "Update sitemap.xml",
      content: encodeBase64Unicode(sitemapContent)
    };
    if (existingSitemap.sha) sitemapBody.sha = existingSitemap.sha;

    await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/sitemap.xml`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(sitemapBody)
    });
    
    // Handle renaming if title changed
    if (window.editingOriginalFilename && window.editingOriginalFilename !== (slug + ".md")) {
       await window.deleteBlog(window.editingOriginalFilename, null, true);
    }
    window.editingOriginalFilename = null;

    window.showToast("Successfully Published to GitHub! 🎉", 'success');
    document.getElementById("blog-title").value = "";
    document.getElementById("blog-cover").value = "";
    document.getElementById("blog-desc").value = "";
    editor.value(""); 
    
    fetchAdminBlogs(); 
    
  } catch (err) {
    window.showToast("Error publishing: " + err.message, 'error');
  } finally {
    publishBtn.innerText = "Publish to GitHub";
    publishBtn.disabled = false;
    publishBtn.classList.remove("opacity-70", "cursor-not-allowed");
  }
});

window.editingOriginalFilename = null;

window.editBlog = async function(filename) {
  const owner = GH_OWNER;
  const repo = GH_REPO;
  const token = tokenInput.value.trim() || GH_TOKEN;
  const slug = filename.replace(".md", "");

  window.showToast("Loading blog data...", "info");

  try {
    const existingIndex = await getFileSha("blogs/index.json", owner, repo, token);
    let metadata = {};
    if (existingIndex.content) {
      const currentIndex = JSON.parse(decodeURIComponent(escape(atob(existingIndex.content.replace(/\s/g, '')))));
      metadata = currentIndex.find(i => i.name === filename) || {};
    }

    const mdFile = await getFileSha(`blogs/md/${filename}`, owner, repo, token);
    let mdContent = "";
    if (mdFile.content) {
      mdContent = decodeURIComponent(escape(atob(mdFile.content.replace(/\s/g, ''))));
    }

    document.getElementById("blog-title").value = metadata.title || slug.replace(/-/g, " ");
    document.getElementById("blog-cover").value = metadata.coverImage || "";
    document.getElementById("blog-desc").value = metadata.description || "";
    editor.value(mdContent);

    window.editingOriginalFilename = filename;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById("publish-btn").innerText = "Update Blog";
    window.showToast("Ready to edit!", "success");

  } catch (err) {
     window.showToast("Error loading blog: " + err.message, "error");
  }
};

window.deleteBlog = async function(filename, sha, silent = false) {
  const owner = GH_OWNER;
  const repo = GH_REPO;
  const token = tokenInput.value.trim() || GH_TOKEN;
  const slug = filename.replace(".md", "");

  try {
    if (!sha) {
       const oldFile = await getFileSha(`blogs/md/${filename}`, owner, repo, token);
       if (!oldFile.sha) return; // doesn't exist
       sha = oldFile.sha;
    }

    // 1. Delete MD
    await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/blogs/md/${filename}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ message: `Deleted blog MD: ${filename}`, sha: sha })
    });

    // 2. Delete HTML (New Structure)
    const existingHtmlNew = await getFileSha(`blogs/${slug}/index.html`, owner, repo, token);
    if (existingHtmlNew.sha) {
      await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/blogs/${slug}/index.html`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Deleted blog HTML: ${slug}/index.html`, sha: existingHtmlNew.sha })
      });
    }

    // Attempt to delete HTML (Old Structure)
    const existingHtmlOld = await getFileSha(`blogs/${slug}.html`, owner, repo, token);
    if (existingHtmlOld.sha) {
      await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/blogs/${slug}.html`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Deleted legacy blog HTML: ${slug}.html`, sha: existingHtmlOld.sha })
      });
    }

    // 3. Update index.json
    let currentIndex = [];
    const existingIndex = await getFileSha("blogs/index.json", owner, repo, token);
    if (existingIndex.content) {
      currentIndex = JSON.parse(decodeURIComponent(escape(atob(existingIndex.content.replace(/\s/g, '')))));
      currentIndex = currentIndex.filter(item => item.name !== filename);

      await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/blogs/index.json`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
           message: "Remove from index.json",
           content: encodeBase64Unicode(JSON.stringify(currentIndex, null, 2)),
           sha: existingIndex.sha
        })
      });

      // 4. Update sitemap.xml
      const sitemapContent = generateSitemap(currentIndex);
      const existingSitemap = await getFileSha("sitemap.xml", owner, repo, token);
      if (existingSitemap.sha) {
        await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/sitemap.xml`, {
          method: "PUT",
          headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Update sitemap.xml after delete", content: encodeBase64Unicode(sitemapContent), sha: existingSitemap.sha })
        });
      }
    }
    
    fetchAdminBlogs();
    if (!silent) window.showToast("Blog deleted completely.", 'info');
  } catch (err) {
    if (!silent) window.showToast("Error deleting: " + err.message, 'error');
  }
};

// Image Upload Logic
const imageInput = document.getElementById("image-upload-input");
const uploadBtn = document.getElementById("upload-image-btn");
const statusContainer = document.getElementById("upload-status");
const linkInput = document.getElementById("generated-link");

if (uploadBtn) {
  uploadBtn.addEventListener("click", async () => {
    const file = imageInput.files[0];
    const token = localStorage.getItem("gh_token") || "";

    if (!file) {
      window.showToast("Please select an image first.", 'error');
      return;
    }
    if (!token) {
      window.showToast("Token required to upload to GitHub.", 'error');
      return;
    }

    uploadBtn.innerText = "Uploading...";
    uploadBtn.disabled = true;

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        const filename = Date.now() + "-" + file.name.replace(/[^a-z0-9.]+/gi, '-').toLowerCase();
        const filePath = `assets/blog-images/${filename}`;

        const res = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${filePath}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: `Uploaded image: ${filename}`,
            content: base64
          })
        });

        if (res.ok) {
          const finalUrl = `https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/main/${filePath}`;
          linkInput.value = `![${file.name}](${finalUrl})`;
          statusContainer.classList.remove("hidden");
          window.showToast("Image uploaded successfully! Copy the link and paste it in your editor.", 'success');
        } else {
          const err = await res.json();
          throw new Error(err.message || "Failed to upload.");
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      window.showToast("Upload Error: " + err.message, 'error');
    } finally {
      uploadBtn.innerText = "Upload Image";
      uploadBtn.disabled = false;
    }
  });
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  initializeEditor();
  loadSettings();
  fetchAdminBlogs();
});
