/**
 * planets/draw-moon.js
 * Draw the Moon with craters, a halo, and shading.
 * Depends on: definitions.js and the global canvas context.
 */

const drawMoon = (() => {
    const D = window.planetDefs;

    function draw(earthX, earthY, starX, isDark, moonX, moonY) {
        const m = D.moon;

        // Órbita guía
        ctx.beginPath();
        ctx.ellipse(earthX, earthY, m.orbitRadiusX, m.orbitRadiusY, -0.1, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(226, 232, 240, 0.18)' : 'rgba(100, 116, 139, 0.15)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.save();
        ctx.translate(moonX, moonY);

        // Halo
        ctx.beginPath();
        ctx.arc(0, 0, m.radius + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(226, 232, 240, 0.2)';
        ctx.fill();

        // Cuerpo
        const moonGrad = ctx.createRadialGradient(
            -m.radius * 0.3, -m.radius * 0.3, m.radius * 0.1,
            0, 0, m.radius
        );
        moonGrad.addColorStop(0, '#f8fafc');
        moonGrad.addColorStop(0.5, '#cbd5e1');
        moonGrad.addColorStop(0.85, '#64748b');
        moonGrad.addColorStop(1, '#334155');

        ctx.beginPath();
        ctx.arc(0, 0, m.radius, 0, Math.PI * 2);
        ctx.fillStyle = moonGrad;
        ctx.fill();

        // Cráteres
        ctx.fillStyle = 'rgba(71, 85, 105, 0.45)';
        ctx.beginPath();
        ctx.arc(-1.2, -1, 1.1, 0, Math.PI * 2);
        ctx.arc(1.5, 0.8, 0.9, 0, Math.PI * 2);
        ctx.arc(-0.5, 1.8, 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Sombra
        const sunAngle = Math.atan2(0 - moonY, starX - moonX);
        const shadowGrad = ctx.createLinearGradient(
            Math.cos(sunAngle) * m.radius,
            Math.sin(sunAngle) * m.radius,
            -Math.cos(sunAngle) * m.radius,
            -Math.sin(sunAngle) * m.radius
        );
        shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)');
        shadowGrad.addColorStop(1, 'rgba(2, 6, 23, 0.85)');

        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.arc(0, 0, m.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    return { draw };
})();

window.drawMoon = drawMoon;