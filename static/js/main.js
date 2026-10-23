/* Indicate the current navigation target. */
const links = document.querySelectorAll('.nav a[href^="#"]');
function syncNavigation() {
  const current = window.location.hash || '#concept';
  links.forEach(link => {
    if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('hashchange', syncNavigation);
syncNavigation();

/* Toggle the homepage theme and remember the visitor's choice. */
const themeToggle = document.getElementById('theme-toggle');

function syncThemeButton() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  themeToggle.setAttribute('aria-label', label);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.title = label;
}

themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  syncThemeButton();

  try {
    localStorage.setItem('agent-trust-safety-theme', theme);
  } catch {
    /* Keep the selected theme for this page when storage is unavailable. */
  }
});

window.addEventListener('storage', event => {
  if (event.key === 'agent-trust-safety-theme' || event.key === null) {
    document.documentElement.dataset.theme = event.newValue === 'dark' ? 'dark' : 'light';
    syncThemeButton();
  }
});

syncThemeButton();
