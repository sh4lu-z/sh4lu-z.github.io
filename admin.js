const GH_TOKEN = localStorage.getItem("gh_token") || "";
const GH_OWNER = "sh4lu-z"; // Hardcoded
const GH_REPO = "sh4lu-z.github.io"; // Hardcoded

const tokenInput = document.getElementById("gh-token");
// Owner and Repo inputs are removed from logic since they are hardcoded
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
    toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "table", "|", "preview", "side-by-side", "fullscreen"],
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
  alert("Settings safely saved to your browser!");
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
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/blogs`, {
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });
    
    if (res.status === 404) {
      adminBlogList.innerHTML = `<div class="bg-blue-50 text-blue-800 p-6 rounded-xl text-center font-bold">The 'blogs' folder doesn't exist yet in your repo. It will be created automatically when you publish your first post!</div>`;
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
          <button onclick="deleteBlog('${blog.name}', '${blog.sha}')" class="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 font-bold shadow-sm transition">Delete</button>
        </div>
      `;
    });
    html += `</div>`;
    adminBlogList.innerHTML = html;

  } catch (err) {
    adminBlogList.innerHTML = `<div class="text-red-700 font-bold border border-red-200 p-4 bg-red-50 rounded-xl">Error: ${err.message}</div>`;
  }
}

// Helper to safely handle Base64 encoding with Unicode (emojis, etc)
function encodeBase64Unicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
      }));
}

publishBtn.addEventListener("click", async () => {
  const title = document.getElementById("blog-title").value.trim();
  const coverImage = document.getElementById("blog-cover").value.trim();
  const description = document.getElementById("blog-desc").value.trim();
  const content = editor.value(); // Get from EasyMDE Editor
  
  const owner = GH_OWNER;
  const repo = GH_REPO;
  const token = tokenInput.value.trim() || GH_TOKEN;

  if (!title || !content) {
    alert("Please provide both a Title and Content.");
    return;
  }

  if (!token) {
    alert("Please ensure your GitHub Token is saved below.");
    return;
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  publishBtn.innerText = "Publishing... Please wait";
  publishBtn.disabled = true;
  publishBtn.classList.add("opacity-70", "cursor-not-allowed");

  try {
    const filePath = `blogs/${slug}.md`;
    let existingSha = undefined;

    // 1. Check if file already exists so we can update it
    try {
      const checkRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (checkRes.ok) {
        const checkData = await checkRes.json();
        existingSha = checkData.sha;
      }
    } catch(e) {} // ignore if 404

    // 2. Publish (Create or Update)
    const bodyData = {
      message: existingSha ? `Updated blog: ${title}` : `Created blog: ${title}`,
      content: encodeBase64Unicode(content)
    };
    if (existingSha) {
      bodyData.sha = existingSha;
    }

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json"
      },
      body: JSON.stringify(bodyData)
    });

    if (!res.ok) {
       const errData = await res.json();
       throw new Error(errData.message || "Failed to publish");
    }

    // 3. Update blogs/index.json
    try {
      const indexObj = { 
        name: slug + ".md", 
        title: title,
        coverImage: coverImage,
        description: description,
        date: new Date().toISOString()
      };
      let existingIndexSha = null;
      let currentIndex = [];
      const getIndexRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/blogs/index.json`, {
         headers: { "Authorization": `Bearer ${token}` }
      });
      if (getIndexRes.ok) {
        const getIndexData = await getIndexRes.json();
        existingIndexSha = getIndexData.sha;
        currentIndex = JSON.parse(decodeURIComponent(escape(atob(getIndexData.content))));
      }

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
      if (existingIndexSha) indexBody.sha = existingIndexSha;

      await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/blogs/index.json`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(indexBody)
      });
    } catch(e) {
      console.warn("Could not update index.json", e);
    }
    
    alert("Successfully Published to GitHub! 🎉");
    document.getElementById("blog-title").value = "";
    document.getElementById("blog-cover").value = "";
    document.getElementById("blog-desc").value = "";
    editor.value(""); // Reset the MDE Editor content
    
    fetchAdminBlogs(); // Reload list
    
  } catch (err) {
    alert("Error publishing: " + err.message);
  } finally {
    publishBtn.innerText = "Publish to GitHub";
    publishBtn.disabled = false;
    publishBtn.classList.remove("opacity-70", "cursor-not-allowed");
  }
});

window.deleteBlog = async function(filename, sha) {
  if (!confirm(`Are you sure you want to permanently delete ${filename}?`)) return;
  
  const owner = GH_OWNER;
  const repo = GH_REPO;
  const token = tokenInput.value.trim() || GH_TOKEN;

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/blogs/${filename}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json"
      },
      body: JSON.stringify({
        message: `Deleted blog: ${filename}`,
        sha: sha
      })
    });

    if (!res.ok) {
       const err = await res.json();
       throw new Error(err.message || "Failed to delete");
    }

    // Attempt to update index.json securely
    try {
      let existingIndexSha = null;
      let currentIndex = [];
      const getIndexRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/blogs/index.json`, {
         headers: { "Authorization": `Bearer ${token}` }
      });
      if (getIndexRes.ok) {
        const getIndexData = await getIndexRes.json();
        existingIndexSha = getIndexData.sha;
        currentIndex = JSON.parse(decodeURIComponent(escape(atob(getIndexData.content))));
      }

      currentIndex = currentIndex.filter(item => item.name !== filename);

      if (existingIndexSha) {
        await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/blogs/index.json`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
             message: "Remove from index.json",
             content: encodeBase64Unicode(JSON.stringify(currentIndex, null, 2)),
             sha: existingIndexSha
          })
        });
      }
    } catch(e) {
       console.warn("Could not update index.json after delete", e);
    }
    
    fetchAdminBlogs(); // Reload
  } catch (err) {
    alert("Error deleting: " + err.message);
  }
};

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  initializeEditor();
  loadSettings();
  fetchAdminBlogs();
});
