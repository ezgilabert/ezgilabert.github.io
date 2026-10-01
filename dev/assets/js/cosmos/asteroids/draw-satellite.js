/**
 * asteroids/draw-satellite.js
 * Draw a generic satellite on the shared canvas.
 * Depends on: state.js (S) and the global canvas context.
 */

const drawSatellite = (() => {
    const S = window.CosmosState;

    /**
    * Assumes the context is already translated and rotated.
    * Draws centered at (0, 0).
     */
    function draw(size, panelSpan, isDark, blinkPhase) {
        // Cuerpo
        ctx.fillStyle = isDark ? 'rgba(226, 232, 240, 0.9)' : 'rgba(71, 85, 105, 0.85)';
        ctx.fillRect(-size * 0.45, -size * 0.35, size * 0.9, size * 0.7);

        // Antena
        ctx.strokeStyle = isDark ? 'rgba(203, 213, 225, 0.8)' : 'rgba(100, 116, 139, 0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.35);
        ctx.lineTo(0, -size * 0.9);
        ctx.stroke();

        // Punta de antena
        ctx.beginPath();
        ctx.arc(0, -size * 0.95, size * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.9)' : 'rgba(37, 99, 235, 0.8)';
        ctx.fill();

        // Solar panels.
        const panelW = panelSpan;
        const panelH = size * 0.45;
        ctx.fillStyle = isDark ? 'rgba(30, 58, 138, 0.85)' : 'rgba(30, 64, 175, 0.75)';
        ctx.fillRect(-size * 0.45 - panelW, -panelH * 0.5, panelW, panelH);
        ctx.fillRect(size * 0.45, -panelH * 0.5, panelW, panelH);

        // Grid de paneles
        ctx.strokeStyle = isDark ? 'rgba(96, 165, 250, 0.5)' : 'rgba(147, 197, 253, 0.45)';
        ctx.lineWidth = 0.6;
        for (let k = 1; k < 3; k++) {
            const lx = -size * 0.45 - panelW + (panelW * k) / 3;
            ctx.beginPath();
            ctx.moveTo(lx, -panelH * 0.5);
            ctx.lineTo(lx, panelH * 0.5);
            ctx.stroke();

            const rx = size * 0.45 + (panelW * k) / 3;
            ctx.beginPath();
            ctx.moveTo(rx, -panelH * 0.5);
            ctx.lineTo(rx, panelH * 0.5);
            ctx.stroke();
        }

        // LED parpadeante
        const blink = 0.4 + 0.6 * Math.max(0, Math.sin(S.pulseAnim * 3 + blinkPhase));
        ctx.fillStyle = `rgba(74, 222, 128, ${blink})`;
        ctx.beginPath();
        ctx.arc(size * 0.25, 0, size * 0.12, 0, Math.PI * 2);
        ctx.fill();
    }

    return { draw };
})();

window.drawSatellite = drawSatellite;