/* Apply a saved theme before the stylesheet loads to avoid a color flash. */
(() => {
  let theme = 'light';

  try {
    if (localStorage.getItem('agent-trust-safety-theme') === 'dark') {
      theme = 'dark';
    }
  } catch {
    /* The theme button also works when browser storage is unavailable. */
  }

  document.documentElement.dataset.theme = theme;
})();
