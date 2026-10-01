/**
 * sun/flares.js
 * Solar flares and particles that orbit and escape the sun.
 */

const sunFlares = (() => {
    const S = window.CosmosState;
    const FSM = window.transition;
    const sparks = [];
    const NUM_SPARKS = 35;

    for (let i = 0; i < NUM_SPARKS; i++) {
        sparks.push({
            angle: Math.random() * Math.PI * 2,
            dist: 115 + Math.random() * 120,
            speed: Math.random() * 2 + 0.8,
            size: Math.random() * 1.8 + 0.6
        });
    }

    function draw(starX, starY, baseRadius, sparkAlphaMod) {
        const direction = FSM.is(FSM.STATES.REWIND) ? -1.5 : 1;

        for (const sp of sparks) {
            sp.dist += sp.speed * direction;
            if (sp.dist > baseRadius + 140) {
                sp.dist = baseRadius + 5;
                sp.angle = Math.random() * Math.PI * 2;
            } else if (sp.dist < baseRadius) {
                sp.dist = baseRadius + 120;
            }

            const sx = starX + Math.cos(sp.angle) * sp.dist;
            const sy = starY + Math.sin(sp.angle) * sp.dist;

            ctx.fillStyle = '#fde047';
            ctx.globalAlpha = Math.max(0, 1 - (sp.dist - baseRadius) / 140) * 0.8 * sparkAlphaMod;
            ctx.beginPath();
            ctx.arc(sx, sy, sp.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    }

    return { draw };
})();

window.sunFlares = sunFlares;