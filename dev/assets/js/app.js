/**
 * app.js
 * Initialize application modules in dependency order.
 */

(function bootstrap() {
    'use strict';

    window.renderSkills.init();
    window.renderExperience.init();
    window.renderEducation.init();

    window.tabs.init();
    window.profileCards.init();
    window.contact.init();
    window.mobileSheet.init();

    window.i18n.init();
    window.i18n.apply('es');

    window.theme.init();
    window.cosmosView.init();

    window.cosmos.init();
})();