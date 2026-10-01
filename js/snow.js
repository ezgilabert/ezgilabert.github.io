/* Canvas snow animation with theme-specific settings and object pooling. */
(function (App) {
    'use strict';

    var utils = App.utils;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);

    var CONFIG = {
        dark: {
            countMultiplier: 1,
            opacity: 1,
            windStrength: 1.6,
            swayMultiplier: 1.2,
            fallMultiplier: 1.15,
            glow: true,
            leftSpawnRatio: 0.50,
            extraAlpha: 0,
            contrastShadow: false
        },
        light: {
            countMultiplier: 1.15,
            opacity: 1,
            windStrength: 0.18,
            swayMultiplier: 1,
            fallMultiplier: 1,
            glow: false,
            leftSpawnRatio: 0,
            extraAlpha: 0.1,
            contrastShadow: true
        }
    };

    var DEPTH = {
        FAR_MAX: 0.3,
        MID_MIN: 0.3,
        MID_MAX: 0.7,
        NEAR_MIN: 0.7,
        GLOW_THRESHOLD: 0.75
    };

    var PHYSICS = {
        GRAVITY_PER_DEPTH: 0.006,
        GRAVITY_BASE: 0.003,
        SWAY_FREQ_SCALE: 0.02,
        WIND_DEPTH_BASE: 0.5,
        WIND_DEPTH_FACTOR: 1.4,
        WIND_MULTIPLIER: 1.1,
        SWAY_MULTIPLIER: 0.18,
        OPACITY_LERP: 0.05,
        WIND_LERP: 0.03,
        TIME_STEP: 0.01
    };

    var SPAWN = {
        OFFSCREEN_Y: 60,
        OFFSCREEN_X: 50,
        RECYCLE_X_EXTRA: 40,
        MARGIN_MULT: 4,
        RECYCLE_MARGIN_MULT: 5,
        SAFETY_MARGIN_MULT: 6
    };

    var LIMITS = {
        MAX_PARTICLES: 220,
        DENSITY_DIVISOR: 11000,
        COUNT_STEP: 3
    };

    var canvas, ctx, width, height;
    var particles = [];
    var time = 0;
    var currentCount = 0;
    var currentOpacity = 1;
    var currentWindStrength = 0;
    var animationId = null;
    var isRunning = false;
    var cachedIsDark = false;
    var lastFrameTime = null;

    function getConfig() {
        return cachedIsDark ? CONFIG.dark : CONFIG.light;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * DPR;
        canvas.height = height * DPR;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    /**
    * Combines slow sine waves into wind noise, approximately 0.7 to 1.5.
     */
    function windNoise(t) {
        var base =
            1.0 +
            Math.sin(t * 0.17) * 0.22 +
            Math.sin(t * 0.41) * 0.15 +
            Math.sin(t * 0.83) * 0.08;

        var gust =
            1.0 +
            Math.sin(t * 0.09) * 0.28 +
            Math.sin(t * 0.23) * 0.18 +
            Math.sin(t * 0.55) * 0.08;

        return base * gust;
    }

    function makeParticle() {
        return {
            x: 0, y: 0, baseX: 0,
            depth: 0, size: 1, speed: 1,
            swayAmp: 1, swayFreq: 1, swayPhase: 0,
            rotation: 0, rotationSpeed: 0,
            opacity: 1, glow: false,
            vy: 0, life: 0,
            spawnFromLeft: false
        };
    }

    function resetParticle(p, fromEdge) {
        var r = Math.random();
        var depth;

        if (r < 0.28) {
            depth = Math.random() * DEPTH.FAR_MAX;
        } else if (r < 0.85) {
            depth = DEPTH.MID_MIN + Math.random() * (DEPTH.MID_MAX - DEPTH.MID_MIN);
        } else {
            depth = DEPTH.NEAR_MIN + Math.random() * (1 - DEPTH.NEAR_MIN);
        }

        p.depth = depth;
        p.size = 0.8 + depth * 2.8;
        p.speed = (0.35 + depth * 1.2) * (0.75 + Math.random() * 0.5);
        p.swayAmp = 0.4 + depth * 1.6;
        p.swayFreq = 0.5 + Math.random() * 1.0;
        p.swayPhase = Math.random() * Math.PI * 2;
        p.rotation = Math.random() * Math.PI * 2;
        p.rotationSpeed = (Math.random() - 0.5) * 0.015 * (0.5 + depth);
        p.opacity = 0.4 + depth * 0.5;
        p.glow = depth > DEPTH.GLOW_THRESHOLD;
        p.vy = 0;
        p.life = 0;

        var cfg = getConfig();
        p.spawnFromLeft = Math.random() < cfg.leftSpawnRatio;

        if (p.spawnFromLeft) {
            p.x = -p.size * SPAWN.MARGIN_MULT - Math.random() * SPAWN.OFFSCREEN_X;
            p.y = Math.random() * height;
        } else {
            p.x = Math.random() * width;
            p.y = -p.size * SPAWN.MARGIN_MULT -
                Math.random() * (fromEdge ? SPAWN.OFFSCREEN_Y : height);
        }

        p.baseX = p.x;
    }

    function drawSnowflake(p) {
        var cfg = getConfig();

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        var baseAlpha = Math.min(1, (p.opacity + cfg.extraAlpha) * currentOpacity);
        var color = '255, 255, 255';

        if (p.glow && cachedIsDark) {
            ctx.shadowColor = 'rgba(200, 220, 255, ' + (baseAlpha * 0.7) + ')';
            ctx.shadowBlur = p.size * 2.2;
        } else if (cfg.contrastShadow) {
            ctx.shadowColor = 'rgba(80, 70, 60, ' + (baseAlpha * 0.5) + ')';
            ctx.shadowBlur = p.size * 1.5;
            ctx.shadowOffsetX = 0.5;
            ctx.shadowOffsetY = 0.8;
        }

        ctx.fillStyle = 'rgba(' + color + ', ' + baseAlpha + ')';
        ctx.strokeStyle = 'rgba(' + color + ', ' + (baseAlpha * 0.9) + ')';
        ctx.lineWidth = Math.max(0.5, p.size * 0.18);
        ctx.lineCap = 'round';

        if (p.size < 1.3) {
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
        } else {
            drawCrystal(p.size);
        }

        ctx.restore();
    }

    /**
    * Draws a six-point crystal with optional branches.
     * @param {number} size
     */
    function drawCrystal(size) {
        var arms = 6;
        var armLength = size * 1.6;

        ctx.beginPath();

        for (var i = 0; i < arms; i++) {
            var angle = (Math.PI * 2 / arms) * i;
            var ex = Math.cos(angle) * armLength;
            var ey = Math.sin(angle) * armLength;

            ctx.moveTo(0, 0);
            ctx.lineTo(ex, ey);

            if (size > 2.1) {
                drawBranches(ex, ey, angle, armLength);
            }
        }

        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawBranches(ex, ey, angle, armLength) {
        var branchLen = armLength * 0.32;
        var branchAngle = Math.PI / 4;
        var baseX = ex * 0.55;
        var baseY = ey * 0.55;

        ctx.moveTo(baseX, baseY);
        ctx.lineTo(
            baseX + Math.cos(angle + branchAngle) * branchLen,
            baseY + Math.sin(angle + branchAngle) * branchLen
        );

        ctx.moveTo(baseX, baseY);
        ctx.lineTo(
            baseX + Math.cos(angle - branchAngle) * branchLen,
            baseY + Math.sin(angle - branchAngle) * branchLen
        );
    }

    function update(frameScale) {
        var cfg = getConfig();

        var targetCount = Math.floor(
            Math.min(width * height / LIMITS.DENSITY_DIVISOR, LIMITS.MAX_PARTICLES) *
            cfg.countMultiplier
        );

        var countStep = LIMITS.COUNT_STEP * frameScale;
        if (currentCount < targetCount) {
            currentCount = Math.min(currentCount + countStep, targetCount);
        } else if (currentCount > targetCount) {
            currentCount = Math.max(currentCount - countStep, targetCount);
        }

        var particleCount = Math.round(currentCount);
        while (particles.length < particleCount) {
            var np = makeParticle();
            resetParticle(np, false);
            particles.push(np);
        }
        while (particles.length > particleCount) {
            particles.pop();
        }

        var opacityLerp = 1 - Math.pow(1 - PHYSICS.OPACITY_LERP, frameScale);
        var windLerp = 1 - Math.pow(1 - PHYSICS.WIND_LERP, frameScale);
        currentOpacity += (cfg.opacity - currentOpacity) * opacityLerp;
        currentWindStrength += (cfg.windStrength - currentWindStrength) * windLerp;

        time += PHYSICS.TIME_STEP * frameScale;
        var wind = windNoise(time);

        ctx.clearRect(0, 0, width, height);

        for (var i = 0; i < particles.length; i++) {
            updateParticle(particles[i], cfg, wind, frameScale);
            drawSnowflake(particles[i]);
        }
    }

    function updateParticle(p, cfg, wind, frameScale) {
        p.life += frameScale;

        var maxFall = p.speed * cfg.fallMultiplier;
        p.vy = Math.min(
            p.vy + (PHYSICS.GRAVITY_PER_DEPTH * p.depth + PHYSICS.GRAVITY_BASE) * frameScale,
            maxFall
        );
        p.y += p.vy * frameScale;

        var sway = Math.sin(
            p.life * p.swayFreq * PHYSICS.SWAY_FREQ_SCALE + p.swayPhase
        ) * p.swayAmp * cfg.swayMultiplier;

        // Scale horizontal wind by particle depth to create parallax.
        var windPush =
            currentWindStrength * wind *
            (PHYSICS.WIND_DEPTH_BASE + p.depth * PHYSICS.WIND_DEPTH_FACTOR) *
            PHYSICS.WIND_MULTIPLIER;

        p.x += (windPush + sway * PHYSICS.SWAY_MULTIPLIER) * frameScale;
        p.rotation += p.rotationSpeed * frameScale;

        if (p.y > height + p.size * SPAWN.MARGIN_MULT) {
            resetParticle(p, true);
            return;
        }

        if (p.x > width + p.size * SPAWN.RECYCLE_MARGIN_MULT) {
            resetParticle(p, true);
            p.x = -p.size * SPAWN.RECYCLE_MARGIN_MULT -
                Math.random() * SPAWN.RECYCLE_X_EXTRA;
            p.y = Math.random() * height;
            p.baseX = p.x;
            p.spawnFromLeft = true;
            return;
        }

        if (p.x < -p.size * SPAWN.SAFETY_MARGIN_MULT) {
            resetParticle(p, true);
        }
    }

    function loop(timestamp) {
        if (!isRunning) return;
        var frameScale = lastFrameTime === null
            ? 1
            : Math.min((timestamp - lastFrameTime) / (1000 / 60), 2);
        lastFrameTime = timestamp;
        cachedIsDark = document.documentElement.classList.contains('dark');
        update(frameScale);
        animationId = requestAnimationFrame(loop);
    }

    function start() {
        if (isRunning || utils.prefersReducedMotion() || document.hidden) return;
        isRunning = true;
        lastFrameTime = null;
        animationId = requestAnimationFrame(loop);
    }

    function stop() {
        isRunning = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        lastFrameTime = null;
    }

    var Snow = {
        init: function () {
            canvas = document.getElementById('snow-canvas');
            if (!canvas) return;

            ctx = canvas.getContext('2d');
            if (!ctx) return;

            resize();
            window.addEventListener('resize', utils.debounce(resize, 150));

            var motionQuery = window.matchMedia
                ? window.matchMedia('(prefers-reduced-motion: reduce)')
                : null;
            var onMotionPreferenceChange = function (event) {
                if (event.matches) {
                    stop();
                } else {
                    start();
                }
            };

            if (motionQuery && motionQuery.addEventListener) {
                motionQuery.addEventListener('change', onMotionPreferenceChange);
            } else if (motionQuery && motionQuery.addListener) {
                motionQuery.addListener(onMotionPreferenceChange);
            }

            start();

            document.addEventListener('visibilitychange', function () {
                if (document.hidden) {
                    stop();
                } else {
                    start();
                }
            });
        },

        onThemeChange: function () {
            cachedIsDark = document.documentElement.classList.contains('dark');
        }
    };

    App.Snow = Snow;
})(window.App = window.App || {});