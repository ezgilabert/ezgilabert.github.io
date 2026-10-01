/**
 * planets/draw-earth.js
 * Draw Earth with continents, clouds, polar caps, and shading.
 * Depends on: definitions.js and the global canvas context.
 */

const drawEarth = (() => {
    const D = window.planetDefs;

    function draw(starX, starY, isDark, planetX, planetY) {
        const p = D.planet1;
        const withered = p.isWithered;

        // Órbita guía
        ctx.beginPath();
        ctx.ellipse(starX, starY, p.orbitRadiusX, p.orbitRadiusY, -0.2, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(59, 130, 246, 0.20)' : 'rgba(99, 102, 241, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.save();
        ctx.translate(planetX, planetY);

        // Halo
        ctx.beginPath();
        ctx.arc(0, 0, p.radius + 4, 0, Math.PI * 2);
        const haloGrad = ctx.createRadialGradient(0, 0, p.radius, 0, 0, p.radius + 5);
        haloGrad.addColorStop(0, withered ? 'rgba(180, 110, 45, 0.45)' : 'rgba(96, 165, 250, 0.6)');
        haloGrad.addColorStop(1, withered ? 'rgba(120, 53, 15, 0)' : 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // Cuerpo (clip circular)
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.clip();

        const oceanGrad = ctx.createRadialGradient(
            -p.radius * 0.3, -p.radius * 0.3, p.radius * 0.1,
            0, 0, p.radius
        );
        oceanGrad.addColorStop(0, withered ? '#c4a66a' : '#38bdf8');
        oceanGrad.addColorStop(0.3, withered ? '#a16207' : '#1d4ed8');
        oceanGrad.addColorStop(0.85, withered ? '#78350f' : '#1e3a8a');
        oceanGrad.addColorStop(1, withered ? '#451a03' : '#0f172a');

        ctx.fillStyle = oceanGrad;
        ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);

        // Continentes (rotan con el ángulo)
        const rot = p.angle * 2.2;
        ctx.beginPath();
        ctx.arc(Math.cos(rot) * 6 - 2, Math.sin(rot) * 4 - 3, 5.8, 0, Math.PI * 2);
        ctx.fillStyle = withered ? '#78716c' : '#16a34a';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(Math.cos(rot + 2.1) * 7 + 3, Math.sin(rot + 2.1) * 5 + 2, 6.8, 0, Math.PI * 2);
        ctx.fillStyle = withered ? '#57534e' : '#15803d';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(Math.cos(rot + 4.2) * 6 - 4, Math.sin(rot + 4.2) * 5 + 3, 5.2, 0, Math.PI * 2);
        ctx.fillStyle = withered ? '#a16207' : '#65a30d';
        ctx.fill();

        // Casquetes polares
        ctx.fillStyle = withered ? 'rgba(180, 150, 110, 0.45)' : 'rgba(241, 245, 249, 0.9)';
        ctx.beginPath();
        ctx.ellipse(0, -p.radius + 2, p.radius * 0.7, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0, p.radius - 2, p.radius * 0.6, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Nubes
        ctx.fillStyle = withered ? 'rgba(194, 140, 80, 0.22)' : 'rgba(255, 255, 255, 0.55)';
        ctx.beginPath();
        ctx.ellipse(Math.cos(rot * 1.3) * 5, -2, p.radius * 0.8, 2.2, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(Math.sin(rot * 0.9) * 4, 4, p.radius * 0.7, 1.8, -0.4, 0, Math.PI * 2);
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
        shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
        shadowGrad.addColorStop(1, 'rgba(2, 6, 23, 0.82)');

        ctx.fillStyle = shadowGrad;
        ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);

        ctx.restore();
    }

    return { draw };
})();

window.drawEarth = drawEarth;