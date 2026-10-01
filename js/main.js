(function (App) {
    'use strict';

    function init() {
        if (App.Theme) App.Theme.init();
        if (App.Snow) App.Snow.init();

        var yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = String(new Date().getFullYear());
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window.App = window.App || {});