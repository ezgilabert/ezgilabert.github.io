/**
 * planets/draw-saturn.js
 * Draw Saturn with its rear ring, body, and front ring.
 * Depends on: definitions.js and the global canvas context.
 */

const drawSaturn = (() => {
    const D = window.planetDefs;

    function draw(starX, starY, isDark, planetX, planetY) {
        const p = D.planet2;

        // Órbita guía
        ctx.beginPath();
        ctx.ellipse(starX, starY, p.orbitRadiusX, p.orbitRadiusY, -0.2, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(168, 85, 247, 0.15)' : 'rgba(147, 51, 234, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.save();
        ctx.translate(planetX, planetY);

        // Anillo trasero (mitad de arriba)
        ctx.beginPath();
        ctx.ellipse(0, 0, p.ringRadiusX, p.ringRadiusY, 0.3, Math.PI, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(216, 180, 254, 0.3)' : 'rgba(168, 85, 247, 0.25)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Cuerpo
        const planetGrad = ctx.createRadialGradient(
            -p.radius * 0.3, -p.radius * 0.3, p.radius * 0.1,
            0, 0, p.radius
        );
        planetGrad.addColorStop(0, '#c084fc');
        planetGrad.addColorStop(0.5, '#7e22ce');
        planetGrad.addColorStop(0.85, '#581c87');
        planetGrad.addColorStop(1, '#2e1065');

        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = planetGrad;
        ctx.fill();

        // Anillo frontal (mitad de abajo)
        ctx.beginPath();
        ctx.ellipse(0, 0, p.ringRadiusX, p.ringRadiusY, 0.3, 0, Math.PI);
        ctx.strokeStyle = isDark ? 'rgba(216, 180, 254, 0.5)' : 'rgba(168, 85, 247, 0.4)';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore();
    }

    return { draw };
})();

window.drawSaturn = drawSaturn;