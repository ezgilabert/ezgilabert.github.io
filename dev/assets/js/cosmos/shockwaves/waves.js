/**
 * shockwaves/waves.js
 * Shock waves, explosion sparks, and collisions with planets and the profile card.
 */

const shockWaves = (() => {
    const S = window.CosmosState;
    const FSM = window.transition;
    const Events = window.Events;

    function trigger(impactX, impactY) {
        S.shockwaves.length = 0;
        const screenDiag = Math.hypot(S.width || 1920, S.height || 1080) * 1.15;

        S.shockwaves.push({
            x: impactX, y: impactY,
            radius: 6, maxRadius: screenDiag, speed: 22, thickness: 14,
            color1: 'rgba(255, 255, 255, 0.9)', color2: 'rgba(186, 230, 253, 0.85)', opacity: 1.0,
            mainCardHit: false
        });
        S.shockwaves.push({
            x: impactX, y: impactY,
            radius: 3, maxRadius: screenDiag * 0.92, speed: 18, thickness: 28,
            color1: 'rgba(251, 146, 60, 0.9)', color2: 'rgba(239, 68, 68, 0.75)', opacity: 1.0,
            mainCardHit: false
        });
        S.shockwaves.push({
            x: impactX, y: impactY,
            radius: 1, maxRadius: screenDiag * 0.85, speed: 14, thickness: 36,
            color1: 'rgba(253, 224, 71, 0.85)', color2: 'rgba(217, 119, 6, 0.55)', opacity: 0.95,
            mainCardHit: false
        });
        S.shockwaves.push({
            x: impactX, y: impactY,
            radius: 0, maxRadius: screenDiag * 1.05, speed: 10.5, thickness: 10,
            color1: 'rgba(125, 211, 252, 0.75)', color2: 'rgba(56, 189, 248, 0.45)', opacity: 0.9,
            mainCardHit: false
        });

        createExplosionSparks(impactX, impactY);
    }

    function createExplosionSparks(impactX, impactY) {
        S.explosionSparks.length = 0;
        const sparkCount = 65;
        for (let i = 0; i < sparkCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 12 + 3.5;
            S.explosionSparks.push({
                x: impactX,
                y: impactY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 2.2 + 0.5,
                color: Math.random() > 0.45
                    ? '#fde047'
                    : (Math.random() > 0.5 ? '#fb923c' : '#f87171'),
                life: 1.0,
                decay: Math.random() * 0.02 + 0.014
            });
        }
    }

    function checkMainCardImpact(sw) {
        if (!FSM.is(FSM.STATES.EXPLODE) || sw.mainCardHit) return;

        const mainCard = document.querySelector('main.glass-card');
        if (!mainCard) return;

        const rect = mainCard.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const distToCard = Math.hypot(cardCenterX - sw.x, cardCenterY - sw.y) * 0.85;

        if (sw.radius >= distToCard) {
            sw.mainCardHit = true;
            Events.emit('card:impact');
        }
    }

    function draw() {
        const isRewind  = FSM.is(FSM.STATES.REWIND);
        const isExplode = FSM.is(FSM.STATES.EXPLODE);

        // --- Shock waves ---
        for (let i = S.shockwaves.length - 1; i >= 0; i--) {
            const sw = S.shockwaves[i];

            if (isRewind) {
                sw.radius -= sw.speed * 1.2;
                sw.opacity = Math.min(1.0, sw.radius / (sw.maxRadius * 0.35));
            } else {
                sw.radius += sw.speed;
                const t = Math.min(1, sw.radius / sw.maxRadius);
                sw.opacity = Math.max(0, Math.pow(1 - t, 0.65));
            }

            if (sw.radius > 2 && sw.opacity > 0.02) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
                ctx.strokeStyle = sw.color1;
                ctx.lineWidth = sw.thickness * Math.max(0.35, sw.opacity);
                ctx.shadowColor = sw.color2;
                ctx.shadowBlur = 36;
                ctx.globalAlpha = Math.min(1, sw.opacity * 1.15);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(sw.x, sw.y, Math.max(1, sw.radius * 0.96), 0, Math.PI * 2);
                ctx.strokeStyle = sw.color2;
                ctx.lineWidth = sw.thickness * 0.45 * sw.opacity;
                ctx.stroke();
                ctx.restore();

                if (isExplode) {
                    const pos = window.planets.computePositions(sw.x, sw.y);
                    const distToEarth = Math.hypot(pos.p1X - sw.x, pos.p1Y - sw.y);
                    const distToMars = Math.hypot(pos.p3X - sw.x, pos.p3Y - sw.y);

                    if (!window.planetDefs.planet1.isWithered && sw.radius >= distToEarth - 10) {
                        window.planets.witherEarth();
                    }
                    if (!window.planets.planet3.isDestroyed && sw.radius >= distToMars - 10) {
                        window.planets.destroyMars(pos.p3X, pos.p3Y);
                        createExplosionSparks(pos.p3X, pos.p3Y);
                    }
                }

                checkMainCardImpact(sw);

            } else if (sw.radius <= 2 || sw.opacity <= 0) {
                S.shockwaves.splice(i, 1);
            }
        }

        // --- Sparks ---
        for (let i = S.explosionSparks.length - 1; i >= 0; i--) {
            const sp = S.explosionSparks[i];

            if (isRewind) {
                sp.x -= sp.vx * 1.5;
                sp.y -= sp.vy * 1.5;
                sp.life += sp.decay * 1.8;
            } else {
                sp.x += sp.vx;
                sp.y += sp.vy;
                sp.vx *= 0.96;
                sp.vy *= 0.96;
                sp.life -= sp.decay;
            }

            if (sp.life <= 0 || sp.life > 1.2) {
                S.explosionSparks.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = Math.min(1.0, sp.life);
            ctx.strokeStyle = sp.color;
            ctx.lineWidth = sp.size;
            ctx.shadowColor = sp.color;
            ctx.shadowBlur = 8;

            ctx.beginPath();
            ctx.moveTo(sp.x, sp.y);
            ctx.lineTo(sp.x - sp.vx * 1.8, sp.y - sp.vy * 1.8);
            ctx.stroke();
            ctx.restore();
        }
    }

    return { trigger, draw, createExplosionSparks };
})();

window.shockWaves = shockWaves;