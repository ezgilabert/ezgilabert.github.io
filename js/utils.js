(function (App) {
    'use strict';

    /**
    * Runs a function after it has not been called for `wait` ms.
     * @param {Function} fn
     * @param {number} wait
     * @returns {Function}
     */
    function debounce(fn, wait) {
        var t;
        return function () {
            var args = arguments;
            var ctx = this;
            clearTimeout(t);
            t = setTimeout(function () {
                fn.apply(ctx, args);
            }, wait);
        };
    }

    /**
    * Reads a localStorage key without throwing when storage is unavailable.
     * @param {string} key
     * @returns {string|null}
     */
    function safeGetItem(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }

    /**
    * Writes to localStorage without throwing when storage is unavailable.
     * @param {string} key
     * @param {string} value
     */
    function safeSetItem(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
        }
    }

    /**
    * Checks whether the user prefers reduced motion.
     * @returns {boolean}
     */
    function prefersReducedMotion() {
        return window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    App.utils = {
        debounce: debounce,
        safeGetItem: safeGetItem,
        safeSetItem: safeSetItem,
        prefersReducedMotion: prefersReducedMotion
    };
})(window.App = window.App || {});