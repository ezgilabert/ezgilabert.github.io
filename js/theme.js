(function (App) {
    'use strict';

    var STORAGE_KEY = 'eg-theme';
    var utils = App.utils;

    var Theme = {
        /** @returns {boolean} */
        isDark: function () {
            return document.documentElement.classList.contains('dark');
        },

        /** @param {'dark'|'light'} mode */
        set: function (mode) {
            var isDark = mode === 'dark';

            document.documentElement.classList.toggle('dark', isDark);
            document.documentElement.dataset.theme = mode;

            utils.safeSetItem(STORAGE_KEY, mode);

            this._syncUI();

            // Notify the snow module so it can update theme-specific behavior.
            if (App.Snow && typeof App.Snow.onThemeChange === 'function') {
                App.Snow.onThemeChange();
            }
        },

        toggle: function () {
            this.set(this.isDark() ? 'light' : 'dark');
        },

        /**
         * Syncs the toggle icon and ARIA attributes.
         * @private
         */
        _syncUI: function () {
            var icon = document.getElementById('theme-icon');
            var btn = document.getElementById('theme-toggle');
            var isDark = this.isDark();

            if (icon) {
                icon.className = isDark ? 'ph-bold ph-moon' : 'ph-bold ph-sun';
            }

            if (btn) {
                btn.setAttribute('aria-pressed', String(isDark));
                btn.setAttribute(
                    'aria-label',
                    isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
                );
            }
        },

        init: function () {
            this._syncUI();

            var self = this;
            var btn = document.getElementById('theme-toggle');

            if (btn) {
                btn.addEventListener('click', function () {
                    self.toggle();
                });
            }
        }
    };

    App.Theme = Theme;
})(window.App = window.App || {});