/**
 * sun/index.js
 * Dispatch between the red giant (dark) and white dwarf (light) renderers.
 *
 * Reemplaza al antiguo sun.js.
 * API pública idéntica: draw(starX, starY, isDark).
 */

const sun = (() => {
    function draw(starX, starY, isDark) {
        if (isDark) window.sunRedGiant.draw(starX, starY);
        else        window.sunWhiteDwarf.draw(starX, starY);
    }

    return { draw };
})();

window.sun = sun;