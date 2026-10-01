/**
 * sun/coronal-loops.js
 * Create, update, and draw the sun's coronal loops.
 */

const sunCoronalLoops = (() => {
    const S = window.CosmosState;
    const FSM = window.transition;
    const loops = [];

    function makeLoop() {
        const startAngle = Math.random() * Math.PI * 2;
        const span = Math.random() * 0.4 + 0.2;
        return {
            startAngle,
            endAngle: startAngle + span,
            peakRadius: Math.random() * 45 + 25,
            twist: (Math.random() - 0.5) * 20,
            width: Math.random() * 3 + 1.5,
            lifecycle: Math.random(),
            lifeSpeed: Math.random() * 0.008 + 0.004
        };
    }

    for (let i = 0; i < 8; i++) loops.push(makeLoop());

    function draw(starX, starY, baseRadius, loopAlphaMod) {
        const isRewind = FSM.is(FSM.STATES.REWIND);

        for (let i = 0; i < loops.length; i++) {
            const loop = loops[i];

            if (isRewind) {
                loop.startAngle -= 0.003;
                loop.endAngle -= 0.003;
                loop.lifecycle -= loop.lifeSpeed * 2;
                if (loop.lifecycle < 0) loop.lifecycle = 1;
            } else {
                loop.startAngle += 0.001;
                loop.endAngle += 0.001;
                loop.lifecycle += loop.lifeSpeed;
                if (loop.lifecycle > 1) {
                    loops[i] = makeLoop();
                    continue;
                }
            }

            const alpha = Math.sin(loop.lifecycle * Math.PI) * loopAlphaMod;
            if (alpha < 0.02) continue;

            const p1Angle = loop.startAngle;
            const p2Angle = loop.endAngle;
            const midAngle = (p1Angle + p2Angle) / 2;

            const ax = starX + Math.cos(p1Angle) * (baseRadius - 4);
            const ay = starY + Math.sin(p1Angle) * (baseRadius - 4);
            const bx = starX + Math.cos(p2Angle) * (baseRadius - 4);
            const by = starY + Math.sin(p2Angle) * (baseRadius - 4);

            const h = baseRadius + loop.peakRadius * alpha;
            const cx = starX + Math.cos(midAngle) * h + Math.cos(midAngle + Math.PI / 2) * loop.twist;
            const cy = starY + Math.sin(midAngle) * h + Math.sin(midAngle + Math.PI / 2) * loop.twist;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.quadraticCurveTo(cx, cy, bx, by);

            const loopGrad = ctx.createLinearGradient(ax, ay, cx, cy);
            loopGrad.addColorStop(0, `rgba(255, 230, 100, ${0.9 * alpha})`);
            loopGrad.addColorStop(0.5, `rgba(249, 115, 22, ${0.95 * alpha})`);
            loopGrad.addColorStop(1, `rgba(220, 38, 38, ${0.8 * alpha})`);

            ctx.strokeStyle = loopGrad;
            ctx.lineWidth = loop.width * alpha;
            ctx.lineCap = 'round';
            ctx.shadowColor = '#f97316';
            ctx.shadowBlur = 22 * alpha;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.quadraticCurveTo(cx, cy, bx, by);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 * alpha})`;
            ctx.lineWidth = Math.max(1, loop.width * 0.25 * alpha);
            ctx.shadowColor = '#fef08a';
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.restore();
        }
    }

    return { draw };
})();

window.sunCoronalLoops = sunCoronalLoops;