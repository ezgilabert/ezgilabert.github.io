/**
 * planets/destruction.js
 * Manage the supernova aftermath and rewind lifecycle for Earth and Mars.
 * Depends on: definitions.js, fragments.js, state.js, and transition.js.
 */

const planetDestruction = (() => {
    const D = window.planetDefs;
    const S = window.CosmosState;
    const FSM = window.transition;

    function witherEarth() {
        D.planet1.isWithered = true;
    }

    function destroyMars(impactX, impactY) {
        const mars = D.planet3;
        if (mars.isDestroyed) return;

        mars.isDestroyed = true;
        mars.fragments = window.fragments.createMarsFragments(impactX, impactY, mars.radius);
    }

    function resetPostSupernova() {
        D.planet1.isWithered = false;
        D.planet3.isDestroyed = false;
        D.planet3.fragments = [];
    }

    function drawMarsFragments(marsX, marsY) {
        if (FSM.is(FSM.STATES.REWIND)) {
            S.rewindFactor -= 0.022;
            if (S.rewindFactor <= 0) {
                S.rewindFactor = 0;
                S._rewindFinished = true;
                return;
            }
        }
        window.fragments.drawFragments(D.planet3.fragments, marsX, marsY, 0.12, 0.3);
    }

    function consumeRewindFinished() {
        if (S._rewindFinished) {
            S._rewindFinished = false;
            return true;
        }
        return false;
    }

    return { witherEarth, destroyMars, resetPostSupernova, drawMarsFragments, consumeRewindFinished };
})();

window.planetDestruction = planetDestruction;