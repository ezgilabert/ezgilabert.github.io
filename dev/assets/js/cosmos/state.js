/**
 * state.js
 * Shared animation state for the cosmos scene.
 *
 * Transition flags (isTransitioning, transitionType, rewindComplete, and
 * themeSwitchedToLight) live in transition.js; this module stores animation data.
 */

window.CosmosState = {
    // Dimensiones y mouse
    width: 0,
    height: 0,
    sceneAnchorX: 0.82,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    pointerParallaxEnabled: true,
    panX: 0,
    panY: 0,
    targetPanX: 0,
    targetPanY: 0,

    // Animación general
    pulseAnim: 0,
    screenShake: 0,
    shakeX: 0,
    shakeY: 0,
    flashIntensity: 0,

    // Progresos de la supernova / rewind (datos animados)
    rewindFactor: 0,
    supernovaProgress: 0,
    supernovaGlow: 0,
    dwarfProgress: 0,

    // Colecciones
    shockwaves: [],
    explosionSparks: []
};