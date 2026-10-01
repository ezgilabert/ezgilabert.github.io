/**
 * render-education.js
 * Build education cards from EDUCATION_DATA.
 */

const renderEducation = (() => {
    const { $ } = window.DOM;

    function buildSubtitle(edu) {
        if (!edu.subtitleLink) {
            return `<p class="edu-subtitle">${edu.subtitle}</p>`;
        }
        return `
            <p class="edu-subtitle">
                <a href="${edu.subtitleLink}" target="_blank" rel="noopener noreferrer"
                   class="edu-subtitle-link"
                   title="Open link">
                    <i class="ph-bold ${edu.subtitleIcon}"></i>
                    <span>${edu.subtitle}</span>
                </a>
            </p>
        `;
    }

    function buildCard(edu, index) {
        const card = document.createElement('article');
        card.className = 'profile-card';
        const detailsId = `education-details-${index}`;

        const isDegree = edu.descKey === 'degree_avg';
        const descClass = isDegree ? 'edu-desc edu-desc--highlight' : 'edu-desc';

        card.innerHTML = `
            <div class="profile-card-header" data-card-toggle role="button" tabindex="0" aria-expanded="false" aria-controls="${detailsId}">
                <div class="flex-1 min-w-0">
                    <div class="edu-header-row">
                        <div class="edu-title-block">
                            <h3 class="edu-title">
                                ${edu.titleIcon ? `<i class="ph-bold ${edu.titleIcon} edu-title-icon" aria-hidden="true"></i>` : ''}
                                <span data-i18n="${edu.titleKey}">${edu.titleFallback}</span>
                            </h3>
                        </div>
                        <span class="edu-badge" ${edu.badgeKey ? `data-i18n="${edu.badgeKey}"` : ''}>${edu.badge}</span>
                    </div>
                </div>
                <span class="profile-chevron" aria-hidden="true"><i class="ph-bold ph-caret-down text-xs"></i></span>
            </div>
            ${buildSubtitle(edu)}
            <div id="${detailsId}" class="profile-card-body" aria-hidden="true" inert>
                <p data-i18n="${edu.descKey}" class="${descClass}">${edu.descFallback}</p>
                ${edu.introKey ? `<p data-i18n="${edu.introKey}" class="edu-desc">${edu.introFallback}</p>` : ''}
                <ul data-i18n-list="${edu.bulletsKey}" class="edu-bullets"></ul>
            </div>
        `;
        return card;
    }

    function render() {
        const container = $('#education-container');
        if (!container) return;
        container.innerHTML = '';
        window.EDUCATION_DATA.forEach((edu, index) => container.appendChild(buildCard(edu, index)));
    }

    function init() { render(); }

    return { init, render };
})();

window.renderEducation = renderEducation;