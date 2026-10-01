/**
 * sun/white-dwarf.js
 * Draw the cool white dwarf sun in light mode.
 * Depends on: state.js (S) and the global canvas context.
 */

const sunWhiteDwarf = (() => {
    const S = window.CosmosState;

    function draw(starX, starY) {
        ctx.save();
        ctx.translate(-S.panX, -S.panY);
        const screenStarX = starX + S.panX;
        const screenStarY = starY + S.panY;
        const dwarfGlow = ctx.createRadialGradient(
            screenStarX, screenStarY, 2, screenStarX, screenStarY,
            Math.max(S.width, S.height) * 0.5
        );
        dwarfGlow.addColorStop(0, '#ffffff');
        dwarfGlow.addColorStop(0.03, 'rgba(129, 140, 248, 0.95)');
        dwarfGlow.addColorStop(0.15, 'rgba(99, 102, 241, 0.28)');
        dwarfGlow.addColorStop(0.45, 'rgba(192, 132, 252, 0.12)');
        dwarfGlow.addColorStop(1, 'rgba(243, 240, 247, 0)');
        ctx.fillStyle = dwarfGlow;
        ctx.fillRect(0, 0, S.width, S.height);
        ctx.restore();
    }

    return { draw };
})();

window.sunWhiteDwarf = sunWhiteDwarf;