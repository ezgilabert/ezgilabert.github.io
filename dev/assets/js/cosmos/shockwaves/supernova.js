/**
 * shockwaves/supernova.js
 * Draw the warm radial supernova overlay.
 * Depends on: state.js (S) and the global canvas context.
 */

const supernovaOverlay = (() => {
    const S = window.CosmosState;

    function draw(starX, starY) {
        const p = S.supernovaProgress;
        const g = S.supernovaGlow;
        if (g <= 0.01) return;

        // Coverage radius follows the largest shockwave.
        const coverR = Math.max(
            (S.shockwaves.length > 0
                ? Math.max(...S.shockwaves.map(sw => sw.radius))
                : Math.hypot(S.width, S.height) * 0.95),
            80
        );

        // Fases de color
        const coolP = Math.max(0, (p - 0.70) / 0.30);
        const coolEase = coolP * coolP;
        const yellowP = Math.max(0, Math.min(1, (p - 0.82) / 0.10));
        const yellowEase = yellowP * yellowP;
        const whiteP = Math.max(0, Math.min(1, (p - 0.90) / 0.10));
        const whiteEase = whiteP * whiteP;

        const fireAlpha = Math.max(0.06, 0.95 * (1 - coolEase * 0.7)) * g;
        const warmAlpha = Math.min(0.8, yellowEase * 0.95) * g;
        const whiteAlpha = Math.min(0.88, whiteEase * 1.05) * g;

        const blend = whiteEase;
        const vr = 255;
        const vg = Math.round(220 + (255 - 220) * blend);
        const vb = Math.round(120 + (255 - 120) * blend);

        // Layer 1: warm radial gradient.
        ctx.save();
        ctx.beginPath();
        ctx.arc(starX, starY, coverR, 0, Math.PI * 2);
        ctx.clip();

        const grad = ctx.createRadialGradient(starX, starY, 0, starX, starY, coverR);
        grad.addColorStop(0, `rgba(255, ${Math.round(245 + 10 * blend)}, ${Math.round(200 + 55 * blend)}, ${(0.2 + warmAlpha * 0.5 + whiteAlpha * 0.4) * g})`);
        grad.addColorStop(0.15, `rgba(255, 200, 80, ${fireAlpha * 0.95})`);
        grad.addColorStop(0.4, `rgba(251, 146, 60, ${fireAlpha * 0.88})`);
        grad.addColorStop(0.65, `rgba(234, 88, 12, ${fireAlpha * 0.65})`);
        grad.addColorStop(0.85, `rgba(120, 40, 20, ${fireAlpha * 0.25})`);
        grad.addColorStop(1, 'rgba(10, 5, 8, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, S.width, S.height);
        ctx.restore();

        // Layer 2: outer edge of the expanding cover.
        ctx.beginPath();
        ctx.arc(starX, starY, coverR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 220, 150, ${0.35 * g * (1 - whiteEase)})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(255, 180, 60, 0.5)';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Layer 3: final white flash.
        if (p > 0.82) {
            const veil = Math.min(0.88, yellowEase * 0.7 + whiteEase * 0.35) * g;
            ctx.fillStyle = `rgba(${vr}, ${vg}, ${vb}, ${veil})`;
            ctx.beginPath();
            ctx.arc(starX, starY, coverR, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    return { draw };
})();

window.supernovaOverlay = supernovaOverlay;