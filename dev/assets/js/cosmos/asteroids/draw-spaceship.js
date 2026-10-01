/**
 * asteroids/draw-spaceship.js
 * Draw the spaceship in the linear asteroid belt.
 * Depends on: state.js (S) and the global canvas context.
 */

const drawSpaceship = (() => {
    const S = window.CosmosState;

    /**
    * Assumes the context is already translated and rotated.
    * Draws centered at (0, 0), facing upward.
     */
    function draw(size, isDark, blinkPhase) {
        const body = isDark ? 'rgba(226, 232, 240, 0.95)' : 'rgba(51, 65, 85, 0.92)';
        const accent = isDark ? 'rgba(56, 189, 248, 0.9)' : 'rgba(37, 99, 235, 0.85)';
        const wing = isDark ? 'rgba(148, 163, 184, 0.85)' : 'rgba(71, 85, 105, 0.8)';
        const cockpit = isDark ? 'rgba(125, 211, 252, 0.85)' : 'rgba(30, 64, 175, 0.75)';
        const engine = isDark ? 'rgba(251, 146, 60, 0.9)' : 'rgba(234, 88, 12, 0.85)';

        // ============================================================
        // Estela del motor (detrás)
        // ============================================================
        const flameLen = size * (1.2 + 0.4 * Math.sin(S.pulseAnim * 8 + blinkPhase));
        const flameGrad = ctx.createLinearGradient(0, size * 0.5, 0, size * 0.5 + flameLen);
        flameGrad.addColorStop(0, `rgba(255, 240, 150, 0.9)`);
        flameGrad.addColorStop(0.4, `rgba(251, 146, 60, 0.7)`);
        flameGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');

        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.moveTo(-size * 0.18, size * 0.5);
        ctx.lineTo(size * 0.18, size * 0.5);
        ctx.lineTo(0, size * 0.5 + flameLen);
        ctx.closePath();
        ctx.fill();

        // ============================================================
        // Alas laterales
        // ============================================================
        ctx.fillStyle = wing;
        // Ala izquierda
        ctx.beginPath();
        ctx.moveTo(-size * 0.25, size * 0.1);
        ctx.lineTo(-size * 0.85, size * 0.4);
        ctx.lineTo(-size * 0.85, size * 0.55);
        ctx.lineTo(-size * 0.25, size * 0.45);
        ctx.closePath();
        ctx.fill();

        // Ala derecha
        ctx.beginPath();
        ctx.moveTo(size * 0.25, size * 0.1);
        ctx.lineTo(size * 0.85, size * 0.4);
        ctx.lineTo(size * 0.85, size * 0.55);
        ctx.lineTo(size * 0.25, size * 0.45);
        ctx.closePath();
        ctx.fill();

        // ============================================================
        // Cuerpo principal (fuselaje)
        // ============================================================
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.9);                    // punta
        ctx.quadraticCurveTo(size * 0.4, -size * 0.6, size * 0.35, 0);
        ctx.lineTo(size * 0.25, size * 0.5);
        ctx.lineTo(-size * 0.25, size * 0.5);
        ctx.lineTo(-size * 0.35, 0);
        ctx.quadraticCurveTo(-size * 0.4, -size * 0.6, 0, -size * 0.9);
        ctx.closePath();
        ctx.fill();

        // ============================================================
        // Cabina (cockpit) — elipse brillante
        // ============================================================
        const cockpitGrad = ctx.createRadialGradient(
            -size * 0.05, -size * 0.25, size * 0.05,
            0, -size * 0.15, size * 0.35
        );
        cockpitGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        cockpitGrad.addColorStop(0.5, cockpit);
        cockpitGrad.addColorStop(1, isDark ? 'rgba(2, 6, 23, 0.4)' : 'rgba(15, 23, 42, 0.3)');

        ctx.fillStyle = cockpitGrad;
        ctx.beginPath();
        ctx.ellipse(0, -size * 0.15, size * 0.22, size * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        // Reflejo en la cabina
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.ellipse(-size * 0.08, -size * 0.3, size * 0.05, size * 0.12, 0, 0, Math.PI * 2);
        ctx.fill();

        // ============================================================
        // Detalles del fuselaje
        // ============================================================
        ctx.strokeStyle = accent;
        ctx.lineWidth = Math.max(0.4, size * 0.04);

        // Línea central
        ctx.beginPath();
        ctx.moveTo(0, size * 0.05);
        ctx.lineTo(0, size * 0.45);
        ctx.stroke();

        // Paneles laterales
        ctx.beginPath();
        ctx.moveTo(-size * 0.2, size * 0.2);
        ctx.lineTo(size * 0.2, size * 0.2);
        ctx.stroke();

        // ============================================================
        // Boquillas del motor (dos)
        // ============================================================
        ctx.fillStyle = engine;
        ctx.beginPath();
        ctx.rect(-size * 0.2, size * 0.45, size * 0.12, size * 0.12);
        ctx.fill();
        ctx.beginPath();
        ctx.rect(size * 0.08, size * 0.45, size * 0.12, size * 0.12);
        ctx.fill();

        // ============================================================
        // Blinking navigation light.
        // ============================================================
        const blink = 0.5 + 0.5 * Math.max(0, Math.sin(S.pulseAnim * 4 + blinkPhase));
        ctx.fillStyle = `rgba(74, 222, 128, ${blink})`;
        ctx.beginPath();
        ctx.arc(0, -size * 0.75, size * 0.08, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo around the light.
        ctx.fillStyle = `rgba(74, 222, 128, ${blink * 0.3})`;
        ctx.beginPath();
        ctx.arc(0, -size * 0.75, size * 0.18, 0, Math.PI * 2);
        ctx.fill();
    }

    return { draw };
})();

window.drawSpaceship = drawSpaceship;