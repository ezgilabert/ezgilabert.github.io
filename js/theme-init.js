/* Apply the saved or system theme before first paint. */
(function () {
    'use strict';

    var STORAGE_KEY = 'eg-theme';
    var saved = null;

    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* Storage may be unavailable. */ }

    var prefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    var theme = saved || (prefersDark ? 'dark' : 'light');

    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
})();