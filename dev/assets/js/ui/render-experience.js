/**
 * render-experience.js
 * Build experience cards from EXPERIENCE_DATA.
 */

const renderExperience = (() => {
    const { $ } = window.DOM;

    function buildCard(exp, index) {
        const card = document.createElement('article');
        card.className = 'profile-card' + (exp.expanded ? ' expanded' : '');
        const detailsId = `experience-details-${index}`;

        card.innerHTML = `
            <div class="experience-header">
                <div class="profile-card-header" data-card-toggle role="button" tabindex="0" aria-expanded="${Boolean(exp.expanded)}" aria-controls="${detailsId}">
                <div class="flex-1 min-w-0">
                    <div class="exp-header-row">
                        <div class="exp-title-block">
                            <h3 class="exp-role" data-i18n="${exp.roleKey}">${exp.role}</h3>
                        </div>
                        <span class="exp-dates">${exp.dates}</span>
                    </div>
                </div>
                <span class="profile-chevron" aria-hidden="true"><i class="ph-bold ph-caret-down text-xs"></i></span>
                </div>
            </div>
            <div id="${detailsId}" class="profile-card-body" aria-hidden="${!exp.expanded}" ${exp.expanded ? '' : 'inert'}>
                <p class="exp-tech">Tech: ${exp.tech}</p>
                <ul data-i18n-list="${exp.i18nKey}" class="exp-bullets"></ul>
            </div>
        `;

        const company = document.createElement('p');
        company.className = 'exp-company';
        (exp.companyParts || [{ text: exp.company }]).forEach(part => {
            if (!part.href) {
                company.appendChild(document.createTextNode(part.text));
                return;
            }

            const link = document.createElement('a');
            link.href = part.href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = part.text;
            company.appendChild(link);
        });

        if (exp.languageKey) {
            const languageTag = document.createElement('span');
            languageTag.className = 'exp-language';

            const icon = document.createElement('i');
            icon.className = 'ph-bold ph-globe';
            icon.setAttribute('aria-hidden', 'true');

            const label = document.createElement('span');
            label.dataset.i18n = exp.languageKey;
            label.textContent = window.TRANSLATIONS.es[exp.languageKey];

            languageTag.append(icon, label);
            company.appendChild(languageTag);
        }
        card.querySelector('.experience-header').appendChild(company);

        return card;
    }

    function render() {
        const container = $('#experience-container');
        if (!container) return;
        container.innerHTML = '';
        window.EXPERIENCE_DATA.forEach((exp, index) => container.appendChild(buildCard(exp, index)));
    }

    function init() { render(); }

    return { init, render };
})();

window.renderExperience = renderExperience;