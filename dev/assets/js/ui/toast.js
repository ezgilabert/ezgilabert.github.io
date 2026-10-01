/**
 * toast.js
 * Show temporary notifications using the .is-visible state class.
 */

const toast = (() => {
    const { $ } = window.DOM;
    let timeoutId = null;

    function show(msg) {
        const el = $('#toast');
        const text = $('#toast-text');
        if (!el || !text) return;

        text.textContent = msg;
        el.classList.add('is-visible');

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            el.classList.remove('is-visible');
        }, 3000);
    }

    return { show };
})();

window.toast = toast;