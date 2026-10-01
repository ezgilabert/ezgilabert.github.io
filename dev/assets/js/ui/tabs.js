/**
 * tabs.js
 * Manage the right-panel tabs and persist the active tab.
 */

const tabs = (() => {
    const { $$, on } = window.DOM;
    const storage = window.Storage;

    const STORAGE_KEY = 'activeTab';
    const DEFAULT_TAB = 'experience';
    const VALID_TABS = ['experience', 'skills', 'education', 'contact'];

    function switchTo(tabId, moveFocus = false, scrollOnMobile = true) {
        if (!VALID_TABS.includes(tabId)) {
            console.warn(`[tabs] tab inválido: "${tabId}"`);
            tabId = DEFAULT_TAB;
        }

        $$('.tab-panel').forEach(panel => {
            const isActive = panel.id === `tab-${tabId}`;
            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
            panel.setAttribute('aria-hidden', String(!isActive));
        });

        const buttons = $$('.app-nav-tab');
        buttons.forEach(button => {
            const isActive = button.dataset.tab === tabId;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', String(isActive));
            button.tabIndex = isActive ? 0 : -1;
            if (isActive && moveFocus) button.focus();
        });

        const activePanel = document.getElementById(`tab-${tabId}`);
        if (scrollOnMobile && activePanel && window.matchMedia('(max-width: 767px)').matches) {
            requestAnimationFrame(() => {
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                activePanel.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
            });
        }

        storage.set(STORAGE_KEY, tabId);
    }

    function init() {
        const saved = storage.get(STORAGE_KEY, DEFAULT_TAB);
        switchTo(saved, false, false);

        const buttons = $$('.app-nav-tab');
        buttons.forEach((button, index) => {
            on(button, 'click', () => switchTo(button.dataset.tab));
            on(button, 'keydown', event => {
                let nextIndex;
                if (event.key === 'ArrowRight') nextIndex = (index + 1) % buttons.length;
                else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + buttons.length) % buttons.length;
                else if (event.key === 'Home') nextIndex = 0;
                else if (event.key === 'End') nextIndex = buttons.length - 1;
                else return;

                event.preventDefault();
                switchTo(buttons[nextIndex].dataset.tab, true);
            });
        });
    }

    return { init, switchTo };
})();

window.tabs = tabs;