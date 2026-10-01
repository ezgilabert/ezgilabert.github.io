/**
 * sun/red-giant.js
 * Draw the sun in dark mode as it transitions from red giant to white dwarf.
 * Orquesta: em-waves, coronal-loops, flares.
 * Depends on state.js (S), the sun effects modules, and the global canvas context.
 */

const sunRedGiant = (() => {
    const S = window.CosmosState;

    function draw(starX, starY) {
        const dwarfProgress = S.dwarfProgress;
        const pulseRadius = Math.sin(S.pulseAnim) * 8;
        const baseRadius = (115 + pulseRadius) * (1 - dwarfProgress * 0.25);
        const heatAlpha = 1 - dwarfProgress;

        // ============================================================
        // Layer 1: warm outer atmosphere.
        // ============================================================
        ctx.save();
        ctx.translate(-S.panX, -S.panY);
        const screenStarX = starX + S.panX;
        const screenStarY = starY + S.panY;
        const outerHeat = ctx.createRadialGradient(
            screenStarX, screenStarY, 10, screenStarX, screenStarY,
            Math.max(S.width, S.height) * 1.2
        );
        outerHeat.addColorStop(0, `rgba(239, 68, 68, ${0.55 * heatAlpha})`);
        outerHeat.addColorStop(0.18, `rgba(220, 38, 38, ${0.32 * heatAlpha})`);
        outerHeat.addColorStop(0.45, `rgba(185, 28, 28, ${0.20 * heatAlpha})`);
        outerHeat.addColorStop(0.75, `rgba(120, 20, 20, ${0.12 * heatAlpha})`);
        outerHeat.addColorStop(1, `rgba(40, 10, 15, ${0.05 * heatAlpha})`);
        ctx.fillStyle = outerHeat;
        ctx.fillRect(0, 0, S.width, S.height);
        ctx.restore();

        // ============================================================
        // Layer 2: ambient light cast leftward from the sun.
        // ============================================================
        ctx.save();
        ctx.translate(-S.panX, -S.panY);
        const leftAmbientLight = ctx.createLinearGradient(S.width, screenStarY, 0, screenStarY);
        leftAmbientLight.addColorStop(0, `rgba(249, 115, 22, ${0.20 * heatAlpha})`);
        leftAmbientLight.addColorStop(0.5, `rgba(220, 38, 38, ${0.12 * heatAlpha})`);
        leftAmbientLight.addColorStop(1, `rgba(180, 50, 20, ${0.06 * heatAlpha})`);
        ctx.fillStyle = leftAmbientLight;
        ctx.fillRect(0, 0, S.width, S.height);
        ctx.restore();

        // ============================================================
        // Layer 3: electromagnetic waves.
        // ============================================================
        const waveAlphaMod = Math.max(0, 1 - dwarfProgress * 1.2);
        window.sunEmWaves.draw(starX, starY, baseRadius, waveAlphaMod);

        // ============================================================
        // Layer 4: coronal loops.
        // ============================================================
        const loopAlphaMod = Math.max(0, 1 - dwarfProgress * 1.5);
        window.sunCoronalLoops.draw(starX, starY, baseRadius, loopAlphaMod);

        // ============================================================
        // Layer 5: solar flares.
        // ============================================================
        const sparkAlphaMod = Math.max(0, 1 - dwarfProgress * 1.8);
        window.sunFlares.draw(starX, starY, baseRadius, sparkAlphaMod);

        // ============================================================
        // Layer 6: core blending from red giant to white dwarf.
        // ============================================================
        const whiteDwarfBlend = dwarfProgress;
        const coreGradient = ctx.createRadialGradient(starX, starY, 2, starX, starY, baseRadius);

        const c1r = 255;
        const c1g = 240 + 15 * whiteDwarfBlend;
        const c1b = 138 + 117 * whiteDwarfBlend;
        const c2r = 249 - 100 * whiteDwarfBlend;
        const c2g = 115 + 100 * whiteDwarfBlend;
        const c2b = 22 + 200 * whiteDwarfBlend;
        const c3r = 220 - 120 * whiteDwarfBlend;
        const c3g = 38 + 150 * whiteDwarfBlend;
        const c3b = 38 + 180 * whiteDwarfBlend;

        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        coreGradient.addColorStop(0.15, `rgba(${c1r}, ${c1g}, ${c1b}, 1)`);
        coreGradient.addColorStop(0.35, `rgba(${c2r}, ${c2g}, ${c2b}, 1)`);
        coreGradient.addColorStop(0.7, `rgba(${c3r}, ${c3g}, ${c3b}, ${1 - whiteDwarfBlend * 0.4})`);
        coreGradient.addColorStop(1, `rgba(153, 27, 27, ${(1 - whiteDwarfBlend) * 0.6})`);

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(starX, starY, baseRadius, 0, Math.PI * 2);
        ctx.fill();

        // ============================================================
        // Layer 7: white dwarf halo, revealed at the end of the transition.
        // ============================================================
        if (whiteDwarfBlend > 0.1) {
            const dwarfGlow = ctx.createRadialGradient(
                starX, starY, 0, starX, starY,
                baseRadius * 2.5
            );
            dwarfGlow.addColorStop(0, `rgba(255, 255, 255, ${whiteDwarfBlend * 0.3})`);
            dwarfGlow.addColorStop(0.3, `rgba(200, 220, 255, ${whiteDwarfBlend * 0.15})`);
            dwarfGlow.addColorStop(1, 'rgba(150, 180, 255, 0)');
            ctx.fillStyle = dwarfGlow;
            ctx.beginPath();
            ctx.arc(starX, starY, baseRadius * 2.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    return { draw };
})();

window.sunRedGiant = sunRedGiant;