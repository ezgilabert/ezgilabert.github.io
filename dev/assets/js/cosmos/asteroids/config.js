/**
 * asteroids/config.js
 * Asteroid belt configuration constants and helpers.
 * Contains no mutable state or drawing logic.
 */

window.AsteroidConfig = {
    // Solar belt (elliptical orbit around the sun).
    NUM_SOLAR: 150,
    SOLAR_ORBIT_RX_MIN: 520,
    SOLAR_ORBIT_RX_MAX: 940,
    SOLAR_ORBIT_RY_MIN: 210,
    SOLAR_ORBIT_RY_MAX: 370,
    SOLAR_SATELLITE_CHANCE: 0.05,

    // Linear belt (diagonal path across the screen).
    NUM_LINEAR: 110,
    LINEAR_OFFSET_Y_SPAN: 160,

    // Estilos de asteroide
    ASTEROID_SIZE_MIN: 2.5,
    ASTEROID_SIZE_MAX: 8.5,
    SATELLITE_SIZE_MIN: 6,
    SATELLITE_SIZE_MAX: 10,
    ASTEROID_POINTS_MIN: 5,
    ASTEROID_POINTS_MAX: 8,

    // Spaceship.
    SPACESHIP_SIZE: 12,
    SPACESHIP_OFFSET_Y: 55,     // donde aparece respecto a la línea
    SPACESHIP_T: 0.12,          // posición inicial en la línea (0-1)
    SPACESHIP_SPEED: 0.00022,   // Speed along the belt.

    // Paletas de color (dark / light)
    COLORS_DARK: {
        metalA: 'rgba(148, 163, 184, 0.85)',
        metalB: 'rgba(100, 116, 139, 0.75)',
        metalC: 'rgba(203, 213, 225, 0.88)',
        metalD: 'rgba(148, 163, 184, 0.78)'
    },
    COLORS_LIGHT: {
        metalA: 'rgba(71, 85, 105, 0.7)',
        metalB: 'rgba(51, 65, 85, 0.6)',
        metalC: 'rgba(100, 116, 139, 0.72)',
        metalD: 'rgba(71, 85, 105, 0.62)'
    },

    // Colisión
    COLLISION_PADDING: 12,

    // Velocidades base
    SOLAR_SPEED_MIN: 0.0003,
    SOLAR_SPEED_MAX: 0.0013,
    LINEAR_SPEED_MIN: 0.0003,
    LINEAR_SPEED_MAX: 0.0011,

    // Rotación
    VROT_RANGE: 0.02
};