/**
 * asteroids/collisions.js
 * Detect shockwave collisions with satellites, the ISS, and the spaceship.
 * Depends on: state.js (S), fragments.js, and asteroids/config.js.
 */

const asteroidCollisions = (() => {
    const S = window.CosmosState;
    const C = window.AsteroidConfig;

    function destroyTarget(target, posX, posY, size, kind) {
        // kind: 'satellite' | 'iss' | 'spaceship'
        target.isDestroyed = true;
        target.fragments = window.fragments.createSatelliteFragments(
            target, posX, posY, size, kind
        );
    }

    function checkSolar(solarBelt, starX, starY, waveRadius, waveX, waveY) {
        for (const sat of solarBelt) {
            if (!sat.isSatellite || sat.isDestroyed) continue;

            const posX = starX + Math.cos(sat.angle) * sat.orbitRadiusX
                                - Math.sin(sat.angle) * sat.orbitRadiusY * 0.2;
            const posY = starY + Math.sin(sat.angle) * sat.orbitRadiusY
                                + Math.cos(sat.angle) * sat.orbitRadiusX * 0.1;

            const dist = Math.hypot(posX - waveX, posY - waveY);
            if (waveRadius >= dist - C.COLLISION_PADDING) {
                destroyTarget(sat, posX, posY, sat.size * 1.1, 'satellite');
            }
        }
    }

    function checkLinear(linearBelt, startX, startY, endX, endY, perpAngle, waveRadius, waveX, waveY) {
        for (const target of linearBelt) {
            const isTarget = target.isSatellite || target.isISS || target.isSpaceship;
            if (!isTarget || target.isDestroyed) continue;

            const baseX = startX + (endX - startX) * target.t;
            const baseY = startY + (endY - startY) * target.t;
            const posX = baseX + Math.cos(perpAngle) * target.offsetY;
            const posY = baseY + Math.sin(perpAngle) * target.offsetY;

            const dist = Math.hypot(posX - waveX, posY - waveY);
            if (waveRadius >= dist - C.COLLISION_PADDING) {
                let kind = 'satellite';
                let size = target.size * 1.1;
                if (target.isISS) { kind = 'iss'; size = target.size * 0.85; }
                else if (target.isSpaceship) { kind = 'spaceship'; size = target.size * 0.9; }

                destroyTarget(target, posX, posY, size, kind);
            }
        }
    }

    return { checkSolar, checkLinear };
})();

window.asteroidCollisions = asteroidCollisions;