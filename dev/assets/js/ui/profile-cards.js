/**
 * profile-cards.js
 * Manage expandable experience and education cards.
 */

const profileCards = (() => {
    const isTouch = () => window.matchMedia('(hover: none)').matches;

    function setExpanded(card, expanded) {
        card.classList.toggle('expanded', expanded);
        const trigger = card.querySelector('[data-card-toggle]');
        const panel = document.getElementById(trigger.getAttribute('aria-controls'));
        trigger.setAttribute('aria-expanded', String(expanded));
        panel.setAttribute('aria-hidden', String(!expanded));
        panel.inert = !expanded;
    }

    function toggle(card) {
        if (!card) return;
        const expanded = card.classList.contains('expanded');
        if (isTouch() && !expanded) {
            document.querySelectorAll('.profile-card.expanded').forEach(openCard => {
                if (openCard !== card) setExpanded(openCard, false);
            });
        }
        setExpanded(card, !expanded);
    }

    function init() {
        document.addEventListener('click', event => {
            const trigger = event.target.closest('[data-card-toggle]');
            if (trigger) toggle(trigger.closest('.profile-card'));
        });
        document.addEventListener('keydown', event => {
            const trigger = event.target.closest('[data-card-toggle]');
            if (!trigger || (event.key !== 'Enter' && event.key !== ' ')) return;
            event.preventDefault();
            toggle(trigger.closest('.profile-card'));
        });
    }

    return { init, toggle };
})();

window.profileCards = profileCards;