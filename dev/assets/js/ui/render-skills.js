/**
 * render-skills.js
 * SRP: construir el DOM del tab de skills desde SKILLS_DATA + Icon.
 */

const renderSkills = (() => {
    const { $, on } = window.DOM;

    function buildCapsule(item) {
        const span = document.createElement('span');
        span.className = 'tech-capsule';

        const iconEl = window.Icon.render(item.icon, {
            sizeClass: 'w-4 h-4'  // ← tamaño para <img>
        });
        span.appendChild(iconEl);

        const label = document.createElement('span');
        label.textContent = item.name;
        span.appendChild(label);

        return span;
    }

    function buildCategory(category, expanded) {
        const section = document.createElement('div');
        section.className = 'skills-category';
        const headingId = `skills-heading-${category.id}`;
        const pillsId = `skills-pills-${category.id}`;

        const heading = document.createElement('h3');
        heading.className = 'skills-category-heading';

        const toggle = document.createElement('button');
        toggle.className = 'skills-category-toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-expanded', String(expanded));
        toggle.setAttribute('aria-controls', pillsId);

        const title = document.createElement('span');
        title.className = 'skills-category-title';
        title.id = headingId;
        title.setAttribute('data-i18n', category.labelKey);
        title.textContent = category.labelKey;
        toggle.appendChild(title);

        const chevron = document.createElement('i');
        chevron.className = 'ph-bold ph-caret-down skills-category-chevron';
        chevron.setAttribute('aria-hidden', 'true');
        toggle.appendChild(chevron);
        heading.appendChild(toggle);
        section.appendChild(heading);

        const pills = document.createElement('div');
        pills.className = 'skills-pills';
        pills.id = pillsId;
        pills.setAttribute('role', 'region');
        pills.setAttribute('aria-labelledby', headingId);
        pills.hidden = !expanded;
        section.classList.toggle('is-collapsed', !expanded);
        category.items.forEach(item => pills.appendChild(buildCapsule(item)));
        section.appendChild(pills);

        on(toggle, 'click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            pills.hidden = expanded;
            section.classList.toggle('is-collapsed', expanded);
        });

        return section;
    }

    function render() {
        const container = $('#skills-container');
        if (!container) return;
        container.className = 'skills-layout';
        container.replaceChildren();
        window.SKILLS_DATA.forEach(category => container.appendChild(buildCategory(category, true)));
    }

    function init() { render(); }

    return { init, render };
})();

window.renderSkills = renderSkills;