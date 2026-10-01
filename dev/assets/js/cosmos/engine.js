/**
 * engine.js
 * Coordinate the render loop and theme transitions.
 * The FSM owns transition state; this module communicates through window.Events.
 */

const cosmos = (() => {
    const S = window.CosmosState;
    const Events = window.Events;
    const FSM = window.transition;
    let canvas, ctx;

    // ============================================================
    // RESIZE
    // ============================================================
    function resize() {
        S.width = canvas.width = window.innerWidth;
        S.height = canvas.height = window.innerHeight;
    }

    // ============================================================
    // TRANSITIONS
    // ============================================================

    function triggerSupernova() {
        if (!FSM.tryStart(FSM.STATES.EXPLODE)) return false;

        S.screenShake = 10;
        S.flashIntensity = 0.35;
        S.supernovaProgress = 0;
        S.supernovaGlow = 0;
        S.dwarfProgress = 0;

        const starX = S.width * S.sceneAnchorX + S.mouseX;
        const starY = S.height * 0.5 + S.mouseY;

        window.shockwaves.trigger(starX, starY);
        window.particles.expandAll();

        Events.emit('transition:start', { type: 'explode' });
        return true;
    }

    function triggerRewind() {
        if (!FSM.tryStart(FSM.STATES.REWIND)) return false;

        S.rewindFactor = 1.0;
        S.screenShake = 12;
        S.supernovaProgress = 0;
        S.supernovaGlow = 0;
        S.dwarfProgress = 0;

        window.particles.collapseAll();

        Events.emit('transition:start', { type: 'rewind' });
        return true;
    }

    // ============================================================
    // LOOP PRINCIPAL
    // ============================================================
    function render() {
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) resize();
        ctx.clearRect(0, 0, S.width, S.height);

        // --- Shake ---
        S.shakeX = 0;
        S.shakeY = 0;
        if (S.screenShake > 0.2) {
            S.shakeX = (Math.random() - 0.5) * S.screenShake;
            S.shakeY = (Math.random() - 0.5) * S.screenShake;
            S.screenShake *= 0.91;
        }

        ctx.save();
        ctx.translate(S.shakeX, S.shakeY);

        // Smooth mouse movement and advance the pulse animation.
        S.mouseX += (S.targetMouseX - S.mouseX) * 0.05;
        S.mouseY += (S.targetMouseY - S.mouseY) * 0.05;
        S.panX += (S.targetPanX - S.panX) * 0.08;
        S.panY += (S.targetPanY - S.panY) * 0.08;
        ctx.translate(S.panX, S.panY);
        S.pulseAnim += 0.03;

        const isDark = document.documentElement.classList.contains('dark');
        const starX = S.width * S.sceneAnchorX + S.mouseX;
        const starY = S.height * 0.5 + S.mouseY;

        const isExplode = FSM.is(FSM.STATES.EXPLODE);
        const isRewind  = FSM.is(FSM.STATES.REWIND);

        if (isRewind && !window.planets.planet3.isDestroyed) {
            S.rewindFactor = Math.max(0, S.rewindFactor - 0.022);
            if (S.rewindFactor === 0) {
                window.asteroids.resetAllSatellites();
                window.planets.resetPostSupernova();
                FSM.reset();
            }
        }

        // --- Progreso de supernova / rewind ---
        if (isExplode && S.supernovaProgress > 0.5) {
            S.dwarfProgress = Math.min(1, S.dwarfProgress + 0.012);
        } else if (isRewind) {
            S.dwarfProgress = Math.max(0, S.dwarfProgress - 0.018);
        }

        // Find the largest active shockwave radius.
        let waveRadius = 0;
        if (isExplode && S.shockwaves.length > 0) {
            for (const sw of S.shockwaves) {
                if (sw.radius > waveRadius) waveRadius = sw.radius;
            }
        }
        const waveX = S.shockwaves[0]?.x ?? starX;
        const waveY = S.shockwaves[0]?.y ?? starY;

        // --- Física de planetas ---
        window.planets.update(isRewind ? -2.5 : 1);

        // ============================================================
        // Draw layers back-to-front.
        // ============================================================
        window.asteroids.draw(starX, starY, isDark, waveRadius, waveX, waveY);
        window.planets.drawBack(starX, starY, isDark);
        window.sun.draw(starX, starY, isDark);
        window.planets.drawFront(starX, starY, isDark);
        window.shockwaves.draw(isDark);
        window.particles.draw(isDark, starX, starY);

        // ============================================================
        // PROGRESO GLOBAL DE SUPERNOVA
        // ============================================================
        if (isExplode && S.shockwaves.length > 0) {
            let maxR = 0, maxMax = 1;
            for (const sw of S.shockwaves) {
                if (sw.radius > maxR) {
                    maxR = sw.radius;
                    maxMax = sw.maxRadius;
                }
            }
            S.supernovaProgress = Math.min(1, maxR / maxMax);
            S.supernovaGlow = Math.min(1, Math.max(S.supernovaGlow, S.supernovaProgress * 0.95 + 0.05));
        } else if (S.supernovaGlow > 0.01) {
            S.supernovaGlow *= 0.965;
            S.supernovaProgress = Math.min(1, S.supernovaProgress + 0.008);
        } else {
            S.supernovaGlow = 0;
            if (isExplode) {
                // The explode transition completed naturally.
                FSM.reset();
                Events.emit('transition:end', { type: 'explode' });
            }
        }

        // ============================================================
        // Commit the light theme once per transition.
        // ============================================================
        if (isExplode && S.supernovaProgress > 0.94 && S.supernovaGlow > 0.5) {
            if (!S._themeCommitted) {
                S._themeCommitted = true;
                Events.emit('theme:commit-light');
            }
        } else if (FSM.isIdle()) {
            // Allow the next supernova to commit the light theme.
            S._themeCommitted = false;
        }

        // ============================================================
        // OVERLAY SUPERNOVA
        // ============================================================
        if (S.supernovaGlow > 0.01 || S.flashIntensity > 0.01) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            if (S.supernovaGlow > 0.01) {
                window.shockwaves.drawSupernovaOverlay(
                    starX + S.panX + S.shakeX,
                    starY + S.panY + S.shakeY
                );
            }

            // These effects cover the viewport, independent of the scene pan.
            if (S.flashIntensity > 0.01) {
                ctx.fillStyle = `rgba(255, 240, 200, ${S.flashIntensity})`;
                ctx.fillRect(0, 0, S.width, S.height);
                S.flashIntensity *= 0.9;
            }
            ctx.restore();
        }

        ctx.restore();
        requestAnimationFrame(render);
    }

    // ============================================================
    // INIT
    // ============================================================
    function init() {
        canvas = document.getElementById('space-canvas');
        ctx = canvas.getContext('2d');
        window.ctx = ctx;

        resize();
        if (!document.documentElement.classList.contains('dark')) {
            const starX = S.width * S.sceneAnchorX;
            const starY = S.height * 0.5;
            const positions = window.planets.computePositions(starX, starY);
            window.planets.witherEarth();
            window.planets.destroyMars(positions.p3X, positions.p3Y);
            window.asteroids.destroyAllTargets();
        }
        window.addEventListener('resize', resize);

        window.addEventListener('mousemove', (e) => {
            if (!S.pointerParallaxEnabled) return;
            S.targetMouseX = (e.clientX - S.width / 2) * 0.03;
            S.targetMouseY = (e.clientY - S.height / 2) * 0.03;
        });

        // Bridge FSM events to the transition events consumed by other modules.
        FSM.on('enter:idle', () => {
            // No transition is active; re-enable the theme button.
            Events.emit('transition:end', { type: 'auto' });
        });

        window.shockwaves.init();
        window.particles.init();

        requestAnimationFrame(render);
    }

    return { init, triggerSupernova, triggerRewind };
})();

window.cosmos = cosmos;