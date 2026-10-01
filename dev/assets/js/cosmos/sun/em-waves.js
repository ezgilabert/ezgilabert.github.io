/**
 * sun/em-waves.js
 * Create, update, and draw the sun's electromagnetic waves.
 */

const sunEmWaves = (() => {
    const S = window.CosmosState;
    const FSM = window.transition;
    const EM_WAVE_COUNT = 7;
    const waves = [];

    for (let i = 0; i < EM_WAVE_COUNT; i++) {
        const phase = i / EM_WAVE_COUNT;
        waves.push({
            radius: 115 + phase * 280 + Math.random() * 40,
            maxRadius: 380 + Math.random() * 160,
            baseSpeed: 0.9 + Math.random() * 1.8 + (i % 3) * 0.35,
            speed: 0,
            thickness: 1.2 + Math.random() * 2.8,
            hue: 185 + Math.random() * 45,
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.018 + Math.random() * 0.025,
            dashOffset: 0,
            dashPattern: Math.random() > 0.45
                ? [6 + Math.random() * 10, 4 + Math.random() * 8]
                : null,
            eccentricity: 0.02 + Math.random() * 0.06,
            rot: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.004
        });
        waves[i].speed = waves[i].baseSpeed;
    }

    function draw(starX, starY, baseRadius, waveAlphaMod) {
        const isRewind = FSM.is(FSM.STATES.REWIND);

        for (const wave of waves) {
            const speedMod = 0.55 + 0.55 * Math.sin(S.pulseAnim * 0.7 + wave.phase);
            wave.speed = wave.baseSpeed * speedMod;

            if (isRewind) {
                wave.radius -= wave.speed * 2.2;
                wave.rot -= wave.vRot * 1.5;
                wave.dashOffset += 1.8;
            } else {
                wave.radius += wave.speed;
                wave.rot += wave.vRot;
                wave.dashOffset -= 1.2;
            }

            if (wave.radius > wave.maxRadius) {
                wave.radius = baseRadius + Math.random() * 18;
                wave.maxRadius = 360 + Math.random() * 180;
                wave.baseSpeed = 0.85 + Math.random() * 1.9;
                wave.phase = Math.random() * Math.PI * 2;
            } else if (wave.radius < baseRadius - 5) {
                wave.radius = wave.maxRadius - Math.random() * 20;
            }

            const progress = (wave.radius - baseRadius) / (wave.maxRadius - baseRadius);
            const fade = Math.max(0, 1 - progress);
            const pulse = 0.65 + 0.35 * Math.sin(S.pulseAnim * wave.pulseSpeed * 40 + wave.phase);
            const alpha = fade * pulse * 0.55 * waveAlphaMod;
            if (alpha < 0.02) continue;

            const rx = wave.radius;
            const ry = wave.radius * (1 - wave.eccentricity);

            ctx.save();
            ctx.translate(starX, starY);
            ctx.rotate(wave.rot);

            ctx.beginPath();
            ctx.ellipse(0, 0, rx + 3, ry + 3, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `hsla(${wave.hue}, 90%, 65%, ${alpha * 0.25})`;
            ctx.lineWidth = wave.thickness * 2.8;
            ctx.shadowColor = `hsl(${wave.hue}, 100%, 70%)`;
            ctx.shadowBlur = 18 * waveAlphaMod;
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
            if (wave.dashPattern) {
                ctx.setLineDash(wave.dashPattern);
                ctx.lineDashOffset = wave.dashOffset;
            }
            ctx.strokeStyle = `hsla(${wave.hue}, 95%, 72%, ${alpha})`;
            ctx.lineWidth = wave.thickness;
            ctx.shadowColor = `hsl(${wave.hue}, 100%, 75%)`;
            ctx.shadowBlur = 10 * waveAlphaMod;
            ctx.stroke();
            ctx.setLineDash([]);

            if (progress < 0.55) {
                ctx.beginPath();
                ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
                ctx.strokeStyle = `hsla(${wave.hue + 15}, 100%, 88%, ${alpha * 0.7})`;
                ctx.lineWidth = Math.max(0.6, wave.thickness * 0.35);
                ctx.shadowBlur = 6 * waveAlphaMod;
                ctx.stroke();
            }
            ctx.restore();
        }
    }

    return { draw };
})();

window.sunEmWaves = sunEmWaves;