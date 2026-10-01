/**
 * planets/index.js
 * Coordinate back/front drawing layers and expose the public API.
 */

const planets = (() => {
    const D = window.planetDefs;
    const FSM = window.transition;
    const Physics = window.planetPhysics;
    const Destruction = window.planetDestruction;

    function drawMars(starX, starY, isDark, planetX, planetY) {
        if (D.planet3.isDestroyed) {
            Destruction.drawMarsFragments(planetX, planetY);
        } else {
            window.drawMars.draw(starX, starY, isDark, planetX, planetY);
        }
    }

    function drawBack(starX, starY, isDark) {
        const pos = Physics.computePositions(starX, starY);

        if (pos.isP2Behind) window.drawSaturn.draw(starX, starY, isDark, pos.p2X, pos.p2Y);
        if (pos.isP3Behind) drawMars(starX, starY, isDark, pos.p3X, pos.p3Y);

        if (pos.isP1Behind) {
            if (pos.isMoonBehind) {
                window.drawMoon.draw(pos.p1X, pos.p1Y, starX, isDark, pos.mX, pos.mY);
                window.drawEarth.draw(starX, starY, isDark, pos.p1X, pos.p1Y);
            } else {
                window.drawEarth.draw(starX, starY, isDark, pos.p1X, pos.p1Y);
                window.drawMoon.draw(pos.p1X, pos.p1Y, starX, isDark, pos.mX, pos.mY);
            }
        }
    }

    function drawFront(starX, starY, isDark) {
        const pos = Physics.computePositions(starX, starY);

        if (!pos.isP1Behind) {
            if (pos.isMoonBehind) {
                window.drawMoon.draw(pos.p1X, pos.p1Y, starX, isDark, pos.mX, pos.mY);
                window.drawEarth.draw(starX, starY, isDark, pos.p1X, pos.p1Y);
            } else {
                window.drawEarth.draw(starX, starY, isDark, pos.p1X, pos.p1Y);
                window.drawMoon.draw(pos.p1X, pos.p1Y, starX, isDark, pos.mX, pos.mY);
            }
        }

        if (!pos.isP2Behind) window.drawSaturn.draw(starX, starY, isDark, pos.p2X, pos.p2Y);
        if (!pos.isP3Behind) drawMars(starX, starY, isDark, pos.p3X, pos.p3Y);

        if (Destruction.consumeRewindFinished()) {
            Destruction.resetPostSupernova();
            window.asteroids.resetAllSatellites();
            FSM.reset();
        }
    }

    return {
        update: Physics.update,
        drawBack,
        drawFront,
        computePositions: Physics.computePositions,
        witherEarth: Destruction.witherEarth,
        destroyMars: Destruction.destroyMars,
        resetPostSupernova: Destruction.resetPostSupernova,
        get planet1() { return D.planet1; },
        get moon()    { return D.moon; },
        get planet3() { return D.planet3; }
    };
})();

window.planets = planets;