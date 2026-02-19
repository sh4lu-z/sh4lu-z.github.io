import { socialLinks, techStack, projects } from './data.js';

// Social Links Render
const socialGrid = document.getElementById('social-grid');
if (socialGrid) {
    socialLinks.forEach(link => {
        const isWide = link.size === 'wide';
        const classes = isWide 
            ? "card md:col-span-2 rounded-2xl p-5 flex items-center justify-between group"
            : "card rounded-2xl p-5 flex flex-col justify-between h-32 md:h-auto group";

        const content = isWide 
            ? `
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${link.color}">
                        <i class="${link.icon} text-lg"></i>
                    </div>
                    <div><h3 class="font-bold text-white">${link.name}</h3><p class="text-xs text-slate-500">${link.desc}</p></div>
                </div>
                <i class="fas fa-chevron-right text-slate-600 group-hover:translate-x-1 transition-transform"></i>
            `
            : `
                <div class="flex justify-between items-start">
                    <i class="${link.icon} text-2xl ${link.color}"></i>
                    <i class="fas fa-arrow-up-right text-xs text-slate-600 group-hover:text-white transition-colors"></i>
                </div>
                <div><h3 class="font-bold text-white">${link.name}</h3><p class="text-xs text-slate-500">${link.desc}</p></div>
            `;

        const a = document.createElement('a');
        a.href = link.url;
        a.target = "_blank";
        a.className = classes;
        a.innerHTML = content;
        socialGrid.appendChild(a);
    });
}

// Tech Stack Render
const techContainer = document.getElementById('tech-stack');
if (techContainer) {
    techStack.forEach(tech => {
        const span = document.createElement('span');
        span.className = `tech-badge ${tech.color}`;
        span.innerHTML = `<i class="${tech.icon}"></i> ${tech.name}`;
        techContainer.appendChild(span);
    });
}

// Projects Render
const projectGrid = document.getElementById('project-grid');
if (projectGrid) {
    projects.forEach(proj => {
        const colorClass = proj.color === 'orange' ? 'text-orange-400' : 'text-blue-400';
        const bgClass = proj.color === 'orange' ? 'bg-orange-500/10' : 'bg-blue-500/10';
        const borderClass = proj.color === 'orange' ? 'border-orange-500/20' : 'border-blue-500/20';

        const a = document.createElement('a');
        a.href = proj.url;
        a.target = "_blank";
        a.className = "card p-6 rounded-2xl group block";
        a.innerHTML = `
            <div class="flex items-center gap-2 mb-4">
                <span class="text-[10px] font-bold px-2 py-1 rounded ${bgClass} ${colorClass} border ${borderClass} uppercase">${proj.category}</span>
                <span class="text-[10px] text-slate-500">${proj.date}</span>
            </div>
            <h3 class="text-xl font-bold text-white group-hover:${colorClass} transition-colors">${proj.title}</h3>
            <p class="text-slate-400 text-sm mt-2">${proj.desc}</p>
        `;
        projectGrid.appendChild(a);
    });
}
