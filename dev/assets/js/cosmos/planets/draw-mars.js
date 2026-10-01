/**
 * planets/draw-mars.js
 * Draw Mars with surface markings, polar caps, and shading.
 * Depends on: definitions.js and the global canvas context.
 */

const drawMars = (() => {
    const D = window.planetDefs;

    function draw(starX, starY, isDark, planetX, planetY) {
        const p = D.planet3;

        // Órbita guía
        ctx.beginPath();
        ctx.ellipse(starX, starY, p.orbitRadiusX, p.orbitRadiusY, -0.2, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(249, 115, 22, 0.10)' : 'rgba(194, 65, 12, 0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.save();
        ctx.translate(planetX, planetY);

        // Halo
        ctx.beginPath();
        ctx.arc(0, 0, p.radius + 4, 0, Math.PI * 2);
        const haloGrad = ctx.createRadialGradient(0, 0, p.radius, 0, 0, p.radius + 5);
        haloGrad.addColorStop(0, 'rgba(251, 146, 60, 0.5)');
        haloGrad.addColorStop(1, 'rgba(194, 65, 12, 0)');
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // Cuerpo (clip circular)
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.clip();

        const marsGrad = ctx.createRadialGradient(
            -p.radius * 0.3, -p.radius * 0.3, p.radius * 0.1,
            0, 0, p.radius
        );
        marsGrad.addColorStop(0, '#fb923c');
        marsGrad.addColorStop(0.35, '#ea580c');
        marsGrad.addColorStop(0.7, '#c2410c');
        marsGrad.addColorStop(0.9, '#7c2d12');
        marsGrad.addColorStop(1, '#431407');

        ctx.fillStyle = marsGrad;
        ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);

        // Manchas marcianas (rotan)
        const rot = p.angle * 2.4;
        ctx.fillStyle = 'rgba(120, 53, 15, 0.55)';
        ctx.beginPath();
        ctx.ellipse(Math.cos(rot) * 3, Math.sin(rot) * 2, 4.2, 2.6, rot * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(Math.cos(rot + 2.1) * 4, Math.sin(rot + 2.1) * 3, 3.0, 1.8, rot * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(Math.cos(rot + 4.3) * 3.5, Math.sin(rot + 4.3) * 2.5, 2.4, 1.6, rot * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Casquetes polares
        ctx.fillStyle = 'rgba(254, 243, 199, 0.85)';
        ctx.beginPath();
        ctx.ellipse(0, -p.radius + 1.5, p.radius * 0.55, 2.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0, p.radius - 1.5, p.radius * 0.45, 1.8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Shade relative to the sun.
        const sunAngle = Math.atan2(0 - planetY, starX - planetX);
        const shadowGrad = ctx.createLinearGradient(
            Math.cos(sunAngle) * p.radius,
            Math.sin(sunAngle) * p.radius,
            -Math.cos(sunAngle) * p.radius,
            -Math.sin(sunAngle) * p.radius
        );
        shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)');
        shadowGrad.addColorStop(1, 'rgba(20, 5, 0, 0.85)');

        ctx.fillStyle = shadowGrad;
        ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);

        ctx.restore();
    }

    return { draw };
})();

window.drawMars = drawMars;