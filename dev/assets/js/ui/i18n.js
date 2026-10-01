/**
 * i18n.js
 * Apply translations to the DOM and handle language switching.
 */

const i18n = (() => {
    const { $, $$ } = window.DOM;
    const storage = window.Storage;
    let currentLang = 'es';

    function getValueAtPath(source, path) {
        return path.split('.').reduce((value, key) => value?.[key], source);
    }

    function fillLists(translations) {
        $$('[data-i18n-list]').forEach(el => {
            const items = getValueAtPath(translations, el.dataset.i18nList);
            if (!Array.isArray(items)) return;

            const listItems = items.map(text => {
                const item = document.createElement('li');
                item.textContent = text;
                return item;
            });
            el.replaceChildren(...listItems);
        });
    }

    function apply(lang) {
        currentLang = lang;
        storage.set('lang', lang);
        const t = window.TRANSLATIONS[lang];
        if (!t) return;
        document.documentElement.lang = lang;

        $$('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.textContent = t[key];
        });

        $$('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) el.placeholder = t[key];
        });

        $$('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (t[key]) el.title = t[key];
        });

        $$('[data-i18n-aria-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria-label');
            if (t[key]) el.setAttribute('aria-label', t[key]);
        });

        // The bio translations intentionally contain inline markup.
        const bioEl = $('#bio-text');
        if (bioEl) bioEl.innerHTML = t.bio;

        fillLists(t);

        const langLabel = $('#lang-label');
        if (langLabel) langLabel.textContent = lang === 'es' ? 'ES / EN' : 'EN / ES';

        const metaDescription = $('#meta-description');
        if (metaDescription) metaDescription.content = t.meta_description;

        const openGraphDescription = $('#og-description');
        if (openGraphDescription) openGraphDescription.content = t.meta_description;
    }

    function toggle() {
        apply(currentLang === 'es' ? 'en' : 'es');
    }

    function init() {
        const toggleButton = $('#lang-toggle-btn');
        if (toggleButton) window.DOM.on(toggleButton, 'click', toggle);
    }

    function getCurrent() { return currentLang; }

    return { init, apply, toggle, getCurrent };
})();

window.i18n = i18n;