/**
 * asteroids/belts.js
 * Create and manage the solar and linear asteroid belts.
 * Depends on: asteroids/config.js.
 * Exposes: getSolarBelt(), getLinearBelt(), resetAll().
 */

const asteroidBelts = (() => {
    const C = window.AsteroidConfig;

    // ============================================================
    // Mutable belt state.
    // ============================================================
    const solarBelt = [];
    const linearBelt = [];

    // ============================================================
    // Helpers
    // ============================================================
    function rand(min, max) { return Math.random() * (max - min) + min; }
    function randInt(min, max) { return Math.floor(rand(min, max + 1)); }
    function randSign() { return Math.random() > 0.5 ? 1 : -1; }

    function pickColor(palette, variants) {
        return palette[variants[randInt(0, variants.length - 1)]];
    }

    // ============================================================
    // Solar belt.
    // ============================================================
    function buildSolarBelt() {
        for (let i = 0; i < C.NUM_SOLAR; i++) {
            const isSatellite = Math.random() < C.SOLAR_SATELLITE_CHANCE;

            solarBelt.push({
                angle: Math.random() * Math.PI * 2,
                orbitRadiusX: rand(C.SOLAR_ORBIT_RX_MIN, C.SOLAR_ORBIT_RX_MAX),
                orbitRadiusY: rand(C.SOLAR_ORBIT_RY_MIN, C.SOLAR_ORBIT_RY_MAX),
                speed: rand(C.SOLAR_SPEED_MIN, C.SOLAR_SPEED_MAX) * randSign(),
                size: isSatellite
                    ? rand(C.SATELLITE_SIZE_MIN, C.SATELLITE_SIZE_MAX)
                    : rand(C.ASTEROID_SIZE_MIN, C.ASTEROID_SIZE_MAX),
                colorDark: pickColor(C.COLORS_DARK, ['metalA', 'metalB']),
                colorLight: pickColor(C.COLORS_LIGHT, ['metalA', 'metalB']),
                points: randInt(C.ASTEROID_POINTS_MIN, C.ASTEROID_POINTS_MAX),
                rot: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * C.VROT_RANGE,
                isSatellite,
                panelSpan: isSatellite ? rand(10, 17) : 0,
                blinkPhase: Math.random() * Math.PI * 2,
                isDestroyed: false,
                fragments: []
            });
        }
    }

    // ============================================================
    // Linear belt.
    // ============================================================
    function buildLinearBelt() {
        for (let i = 0; i < C.NUM_LINEAR; i++) {
            linearBelt.push({
                t: Math.random(),
                offsetY: (Math.random() - 0.5) * C.LINEAR_OFFSET_Y_SPAN,
                speed: rand(C.LINEAR_SPEED_MIN, C.LINEAR_SPEED_MAX),
                size: rand(C.ASTEROID_SIZE_MIN, C.ASTEROID_SIZE_MAX),
                colorDark: pickColor(C.COLORS_DARK, ['metalC', 'metalD']),
                colorLight: pickColor(C.COLORS_LIGHT, ['metalC', 'metalD']),
                points: randInt(C.ASTEROID_POINTS_MIN, C.ASTEROID_POINTS_MAX),
                rot: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * C.VROT_RANGE * 1.25,
                isSatellite: false,
                isISS: false,
                isSpaceship: false,
                panelSpan: 0,
                blinkPhase: 0,
                isDestroyed: false,
                fragments: []
            });
        }

        // Add the satellite and ISS variants.
        linearBelt.push({
            t: 0.22, offsetY: -35, speed: 0.00035,
            size: 7, colorDark: '', colorLight: '', points: 0,
            rot: 0.3, vRot: 0.008,
            isSatellite: true, isISS: false, isSpaceship: false,
            panelSpan: 14, blinkPhase: 1.2,
            isDestroyed: false, fragments: []
        });

        linearBelt.push({
            t: 0.68, offsetY: 48, speed: 0.00028,
            size: 6.5, colorDark: '', colorLight: '', points: 0,
            rot: -0.5, vRot: -0.006,
            isSatellite: true, isISS: false, isSpaceship: false,
            panelSpan: 12, blinkPhase: 2.8,
            isDestroyed: false, fragments: []
        });

        linearBelt.push({
            t: 0.42, offsetY: 8, speed: 0.00018,
            size: 18, colorDark: '', colorLight: '', points: 0,
            rot: 0.12, vRot: 0.003,
            isSatellite: false, isISS: true, isSpaceship: false,
            panelSpan: 36, blinkPhase: 0.5,
            isDestroyed: false, fragments: []
        });

        // Spaceship.
        linearBelt.push({
            t: C.SPACESHIP_T,
            offsetY: C.SPACESHIP_OFFSET_Y,
            speed: C.SPACESHIP_SPEED,
            size: C.SPACESHIP_SIZE,
            colorDark: '', colorLight: '', points: 0,
            rot: -0.15, vRot: 0.002,
            isSatellite: false, isISS: false, isSpaceship: true,
            panelSpan: 0,
            blinkPhase: Math.random() * Math.PI * 2,
            isDestroyed: false, fragments: []
        });
    }

    // ============================================================
    // API
    // ============================================================
    function init() {
        buildSolarBelt();
        buildLinearBelt();
    }

    function getSolarBelt() { return solarBelt; }
    function getLinearBelt() { return linearBelt; }

    function resetAll() {
        for (const s of solarBelt) { s.isDestroyed = false; s.fragments = []; }
        for (const l of linearBelt) { l.isDestroyed = false; l.fragments = []; }
    }

    return { init, getSolarBelt, getLinearBelt, resetAll };
})();

window.asteroidBelts = asteroidBelts;