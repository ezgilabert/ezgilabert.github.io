/**
 * particles.js
 * Nebular gas particles for the red giant and white dwarf states.
 */

const particles = (() => {
    const S = window.CosmosState;
    const FSM = window.transition;
    const NUM_PARTICLES = 600;
    const particlesArr = [];

    for (let i = 0; i < NUM_PARTICLES; i++) {
        const angle = Math.random() * Math.PI * 2;
        const targetDist = Math.random() * Math.max(window.innerWidth, window.innerHeight) * 0.45;
        particlesArr.push({
            angle,
            dist: targetDist,
            targetDist,
            vDist: 0,
            speed: (Math.random() * 0.002 + 0.0005) * (Math.random() > 0.5 ? 1 : -1),
            size: Math.random() * 2 + 0.5,
            colorRedGiant: Math.random() > 0.5 ? 'rgba(249, 115, 22, 0.6)' : 'rgba(239, 68, 68, 0.5)',
            colorWhiteDwarf: Math.random() > 0.5 ? 'rgba(168, 85, 247, 0.5)' : 'rgba(99, 102, 241, 0.5)'
        });
    }

    function expandAll() {
        for (const p of particlesArr) {
            p.vDist = Math.random() * 18 + 8;
        }
    }

    function collapseAll() {
        const maxDim = Math.max(S.width, S.height);
        for (const p of particlesArr) {
            p.dist = maxDim * 0.85 + Math.random() * 150;
            p.vDist = -(Math.random() * 28 + 14);
        }
    }

    function update() {
        const isExplode = FSM.is(FSM.STATES.EXPLODE);
        const isRewind  = FSM.is(FSM.STATES.REWIND);
        const isBusy    = FSM.isBusy();

        for (const p of particlesArr) {
            if (isBusy) {
                p.dist += p.vDist;

                if (isExplode) {
                    p.vDist *= 0.92;
                } else if (isRewind) {
                    p.vDist *= 0.93;
                    if (p.dist <= p.targetDist) p.dist = p.targetDist;
                }
            } else {
                p.angle += p.speed;
            }

            if (p.dist > Math.max(S.width, S.height) * 0.78) {
                p.dist = Math.random() * 50 + 10;
            }
        }
    }

    function draw(isDark, starX, starY) {
        update();

        for (const p of particlesArr) {
            const px = starX + Math.cos(p.angle) * p.dist;
            const py = starY + Math.sin(p.angle) * p.dist * 0.75;

            const particleAlpha = isDark
                ? Math.max(0.2, 1 - p.dist / (S.width * 0.45)) * (1 - S.dwarfProgress * 0.8)
                : Math.max(0.15, 0.7 - p.dist / (S.width * 0.55));

            ctx.fillStyle = isDark ? p.colorRedGiant : p.colorWhiteDwarf;
            ctx.globalAlpha = particleAlpha;
            ctx.beginPath();
            ctx.arc(px, py, isDark ? p.size : p.size * 1.1, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;
    }

    function init() { /* nada especial */ }

    return { init, draw, expandAll, collapseAll };
})();

window.particles = particles;