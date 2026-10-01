/**
 * asteroids/draw-iss.js
 * Draw the detailed ISS on the shared canvas.
 * Depends on: state.js (S) and the global canvas context.
 */

const drawISS = (() => {
    const S = window.CosmosState;

    /**
    * Assumes the context is already translated and rotated.
    * Draws centered at (0, 0).
     */
    function draw(size, panelSpan, isDark, blinkPhase) {
        const body = isDark ? 'rgba(241, 245, 249, 0.95)' : 'rgba(71, 85, 105, 0.92)';
        const module = isDark ? 'rgba(203, 213, 225, 0.92)' : 'rgba(100, 116, 139, 0.88)';
        const panel = isDark ? 'rgba(29, 78, 216, 0.92)' : 'rgba(30, 64, 175, 0.85)';
        const panelLine = isDark ? 'rgba(147, 197, 253, 0.55)' : 'rgba(96, 165, 250, 0.45)';
        const accent = isDark ? 'rgba(56, 189, 248, 0.85)' : 'rgba(37, 99, 235, 0.8)';

        ctx.shadowColor = isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(30, 64, 175, 0.25)';
        ctx.shadowBlur = 8;

        // Viga principal
        ctx.fillStyle = body;
        ctx.fillRect(-size * 0.7, -size * 0.12, size * 1.4, size * 0.24);

        // Divisiones internas
        ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.6)' : 'rgba(100, 116, 139, 0.5)';
        ctx.lineWidth = 1;
        for (let i = -3; i <= 3; i++) {
            const x = (i / 3) * size * 0.55;
            ctx.beginPath();
            ctx.moveTo(x, -size * 0.12);
            ctx.lineTo(x, size * 0.12);
            ctx.stroke();
        }

        // Módulos
        ctx.shadowBlur = 4;
        ctx.fillStyle = module;
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.32, size * 0.26, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(-size * 0.38, 0, size * 0.2, size * 0.16, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(size * 0.38, 0, size * 0.18, size * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Acento
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(-size * 0.12, size * 0.08, size * 0.07, 0, Math.PI * 2);
        ctx.fill();

        // Brazo robótico
        ctx.strokeStyle = isDark ? 'rgba(226, 232, 240, 0.85)' : 'rgba(148, 163, 184, 0.8)';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(size * 0.15, -size * 0.1);
        ctx.quadraticCurveTo(size * 0.35, -size * 0.55, size * 0.55, -size * 0.35);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(size * 0.55, -size * 0.35, size * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = body;
        ctx.fill();

        // Solar panels (four quadrants).
        const pw = panelSpan;
        const ph = size * 0.32;
        ctx.shadowBlur = 6;
        ctx.fillStyle = panel;
        ctx.fillRect(-size * 0.7 - pw, -ph - size * 0.08, pw, ph * 0.9);
        ctx.fillRect(-size * 0.7 - pw, size * 0.12, pw, ph * 0.9);
        ctx.fillRect(size * 0.7, -ph - size * 0.08, pw, ph * 0.9);
        ctx.fillRect(size * 0.7, size * 0.12, pw, ph * 0.9);

        // Grid de paneles
        ctx.shadowBlur = 0;
        ctx.strokeStyle = panelLine;
        ctx.lineWidth = 0.6;
        for (let k = 1; k < 6; k++) {
            const frac = k / 6;
            const lx = -size * 0.7 - pw + pw * frac;
            ctx.beginPath();
            ctx.moveTo(lx, -ph - size * 0.08);
            ctx.lineTo(lx, -size * 0.08 - ph * 0.1);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(lx, size * 0.12);
            ctx.lineTo(lx, size * 0.12 + ph * 0.9);
            ctx.stroke();

            const rx = size * 0.7 + pw * frac;
            ctx.beginPath();
            ctx.moveTo(rx, -ph - size * 0.08);
            ctx.lineTo(rx, -size * 0.08 - ph * 0.1);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(rx, size * 0.12);
            ctx.lineTo(rx, size * 0.12 + ph * 0.9);
            ctx.stroke();
        }

        // LEDs parpadeantes
        const blink1 = 0.45 + 0.55 * Math.max(0, Math.sin(S.pulseAnim * 2.2 + blinkPhase));
        const blink2 = 0.45 + 0.55 * Math.max(0, Math.sin(S.pulseAnim * 2.8 + blinkPhase + 1.5));

        ctx.fillStyle = `rgba(74, 222, 128, ${blink1})`;
        ctx.beginPath();
        ctx.arc(size * 0.28, -size * 0.05, size * 0.06, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(251, 191, 36, ${blink2})`;
        ctx.beginPath();
        ctx.arc(size * 0.42, size * 0.06, size * 0.05, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
    }

    return { draw };
})();

window.drawISS = drawISS;