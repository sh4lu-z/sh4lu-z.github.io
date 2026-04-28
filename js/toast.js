window.showToast = function(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bgColor = type === 'error' ? 'bg-red-500' : (type === 'info' ? 'bg-blue-500' : 'bg-gray-900 dark:bg-gray-100');
  const textColor = type === 'error' || type === 'info' ? 'text-white' : 'text-white dark:text-gray-900';
  
  toast.className = `${bgColor} ${textColor} px-5 py-3.5 rounded-xl shadow-2xl text-xs font-bold tracking-widest uppercase transform transition-all duration-500 translate-y-12 opacity-0 flex items-center gap-3 pointer-events-auto max-w-sm w-full`;
  
  let icon = '';
  if (type === 'error') {
    icon = `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  } else if (type === 'info') {
    icon = `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  } else {
    icon = `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`;
  }

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-12', 'opacity-0');
    });
  });

  // Remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.add('translate-y-12', 'opacity-0');
    setTimeout(() => toast.remove(), 500);
  }, 3500);
};
