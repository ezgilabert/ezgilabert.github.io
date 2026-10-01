/**
 * icon.js
 * Resolve a window.ICONS key to an image from the Simple Icons CDN.
 * Formato: 'slug/color' → https://cdn.simpleicons.org/{slug}/{color}
 */

const icon = (() => {
    const CDN = 'https://cdn.simpleicons.org';

    function render(name, opts = {}) {
        const def = window.ICONS[name];

        if (!def) {
            console.warn(`[Icon] no existe "${name}" en window.ICONS`);
            return fallback(opts);
        }

        if (def.startsWith('ph-')) {
            const iconEl = document.createElement('i');
            iconEl.className = `${def} tech-capsule__icon ${opts.className || ''}`.trim();
            iconEl.setAttribute('aria-hidden', 'true');
            return iconEl;
        }

        const img = document.createElement('img');
        img.src = `${CDN}/${def}`;
        img.alt = opts.alt || '';
        img.loading = 'lazy';
        img.className = [
            'shrink-0',
            opts.sizeClass || 'w-4 h-4',
            opts.className || ''
        ].filter(Boolean).join(' ');

        img.onerror = () => {
            console.warn(`[Icon] no se encontró ${img.src}`);
            img.replaceWith(fallback(opts));
        };

        return img;
    }

    function fallback(opts) {
        const i = document.createElement('i');
        i.className = `ph-fill ph-question ${opts.sizeClass || 'text-base'} shrink-0 opacity-40`;
        i.setAttribute('aria-hidden', 'true');
        return i;
    }

    return { render };
})();

window.Icon = icon;