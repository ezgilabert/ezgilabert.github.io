/**
 * planets/physics.js
 * Calculate orbital positions and advance angles.
 * Depends on: definitions.js.
 * Exposes: computePositions(starX, starY), update(direction).
 */

const planetPhysics = (() => {
    const D = window.planetDefs;

    /**
     * Calcula posiciones elípticas de los 4 cuerpos + flags de profundidad.
     */
    function computePositions(starX, starY) {
        const p1 = D.planet1, m = D.moon, p2 = D.planet2, p3 = D.planet3;

        const p1X = starX + Math.cos(p1.angle) * p1.orbitRadiusX
                          - Math.sin(p1.angle) * p1.orbitRadiusY * 0.2;
        const p1Y = starY + Math.sin(p1.angle) * p1.orbitRadiusY
                          + Math.cos(p1.angle) * p1.orbitRadiusX * 0.1;

        const mX = p1X + Math.cos(m.angle) * m.orbitRadiusX
                        - Math.sin(m.angle) * m.orbitRadiusY * 0.2;
        const mY = p1Y + Math.sin(m.angle) * m.orbitRadiusY
                        + Math.cos(m.angle) * m.orbitRadiusX * 0.1;

        const p2X = starX + Math.cos(p2.angle) * p2.orbitRadiusX
                          - Math.sin(p2.angle) * p2.orbitRadiusY * 0.2;
        const p2Y = starY + Math.sin(p2.angle) * p2.orbitRadiusY
                          + Math.cos(p2.angle) * p2.orbitRadiusX * 0.1;

        const p3X = starX + Math.cos(p3.angle) * p3.orbitRadiusX
                          - Math.sin(p3.angle) * p3.orbitRadiusY * 0.2;
        const p3Y = starY + Math.sin(p3.angle) * p3.orbitRadiusY
                          + Math.cos(p3.angle) * p3.orbitRadiusX * 0.1;

        return {
            p1X, p1Y, mX, mY, p2X, p2Y, p3X, p3Y,
            isP1Behind:   Math.sin(p1.angle) < 0,
            isMoonBehind: Math.sin(m.angle) < 0,
            isP2Behind:   Math.sin(p2.angle) < 0,
            isP3Behind:   Math.sin(p3.angle) < 0
        };
    }

    /**
     * Avanza los ángulos. direction=1 normal, -2.5 en rewind.
     */
    function update(direction) {
        const D_ = window.planetDefs;
        D_.planet1.angle += D_.planet1.speed * direction;
        D_.moon.angle    += D_.moon.speed    * direction;
        D_.planet2.angle += D_.planet2.speed * direction;
        D_.planet3.angle += D_.planet3.speed * direction;
    }

    return { computePositions, update };
})();

window.planetPhysics = planetPhysics;