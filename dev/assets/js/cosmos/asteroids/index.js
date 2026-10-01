/**
 * asteroids/index.js
 * Draw both asteroid belts and update their physics.
 */

const asteroids = (() => {
    const S = window.CosmosState;
    const FSM = window.transition;
    const Belts = window.asteroidBelts;
    const Collisions = window.asteroidCollisions;

    Belts.init();

    function drawAsteroidShape(ast, isDark) {
        ctx.fillStyle = isDark ? ast.colorDark : ast.colorLight;
        ctx.beginPath();
        for (let j = 0; j < ast.points; j++) {
            const a = (j / ast.points) * Math.PI * 2;
            const r = ast.size + (Math.sin(j * 2.5 + ast.rot) * 0.7);
            const px = Math.cos(a) * r;
            const py = Math.sin(a) * r;
            if (j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
    }

    function drawSolarBelt(starX, starY, isDark, waveRadius, waveX, waveY) {
        const solarBelt = Belts.getSolarBelt();
        const isRewind  = FSM.is(FSM.STATES.REWIND);
        const isExplode = FSM.is(FSM.STATES.EXPLODE);

        ctx.beginPath();
        ctx.ellipse(starX, starY, 780, 290, -0.2, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(71, 85, 105, 0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        if (waveRadius > 0 && isExplode) {
            Collisions.checkSolar(solarBelt, starX, starY, waveRadius, waveX, waveY);
        }

        for (const ast of solarBelt) {
            ast.angle += (isRewind ? -ast.speed * 2.5 : ast.speed);
            ast.rot += ast.vRot;

            const ax = starX + Math.cos(ast.angle) * ast.orbitRadiusX
                             - Math.sin(ast.angle) * ast.orbitRadiusY * 0.2;
            const ay = starY + Math.sin(ast.angle) * ast.orbitRadiusY
                             + Math.cos(ast.angle) * ast.orbitRadiusX * 0.1;

            if (ast.isDestroyed) {
                window.fragments.drawSatelliteFragments(ast.fragments, ax, ay);
                continue;
            }

            ctx.save();
            ctx.translate(ax, ay);
            ctx.rotate(ast.rot);

            if (ast.isSatellite) {
                window.drawSatellite.draw(ast.size, ast.panelSpan, isDark, ast.blinkPhase);
            } else {
                drawAsteroidShape(ast, isDark);
            }
            ctx.restore();
        }
    }

    function getLinearBeltPath() {
        const viewX = S.mouseX;
        const viewY = S.mouseY;
        const startX = S.width * 0.45 + viewX;
        const startY = -80 + viewY;
        const endX = -120 + viewX;
        const endY = S.height * 0.9 + viewY;
        const angle = Math.atan2(endY - startY, endX - startX);

        return { startX, startY, endX, endY, perpAngle: angle + Math.PI / 2 };
    }

    function drawLinearBelt(isDark, waveRadius, waveX, waveY) {
        const linearBelt = Belts.getLinearBelt();
        const isRewind  = FSM.is(FSM.STATES.REWIND);
        const isExplode = FSM.is(FSM.STATES.EXPLODE);
        const { startX, startY, endX, endY, perpAngle } = getLinearBeltPath();

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = isDark ? 'rgba(203, 213, 225, 0.08)' : 'rgba(100, 116, 139, 0.06)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        for (const ast of linearBelt) {
            if (isRewind) {
                ast.t -= ast.speed * 2.5;
                if (ast.t < 0) ast.t += 1;
            } else {
                ast.t += ast.speed;
                if (ast.t > 1) ast.t -= 1;
            }
            ast.rot += ast.vRot;
        }

        if (waveRadius > 0 && isExplode) {
            Collisions.checkLinear(
                linearBelt,
                startX, startY, endX, endY,
                perpAngle, waveRadius, waveX, waveY
            );
        }

        for (const ast of linearBelt) {
            const baseX = startX + (endX - startX) * ast.t;
            const baseY = startY + (endY - startY) * ast.t;
            const ax = baseX + Math.cos(perpAngle) * ast.offsetY;
            const ay = baseY + Math.sin(perpAngle) * ast.offsetY;

            if (ast.isDestroyed) {
                window.fragments.drawSatelliteFragments(ast.fragments, ax, ay);
                continue;
            }

            ctx.save();
            ctx.translate(ax, ay);
            ctx.rotate(ast.rot);

            if (ast.isSpaceship) {
                window.drawSpaceship.draw(ast.size, isDark, ast.blinkPhase);
            } else if (ast.isISS) {
                window.drawISS.draw(ast.size, ast.panelSpan, isDark, ast.blinkPhase);
            } else if (ast.isSatellite) {
                window.drawSatellite.draw(ast.size, ast.panelSpan, isDark, ast.blinkPhase);
            } else {
                drawAsteroidShape(ast, isDark);
            }
            ctx.restore();
        }
    }

    function draw(starX, starY, isDark, waveRadius, waveX, waveY) {
        drawSolarBelt(starX, starY, isDark, waveRadius, waveX, waveY);
        drawLinearBelt(isDark, waveRadius, waveX, waveY);
    }

    function resetAllSatellites() {
        Belts.resetAll();
    }

    function destroyAllTargets() {
        const starX = S.width * S.sceneAnchorX + S.mouseX;
        const starY = S.height * 0.5 + S.mouseY;
        const { startX, startY, endX, endY, perpAngle } = getLinearBeltPath();

        Collisions.checkSolar(Belts.getSolarBelt(), starX, starY, Infinity, starX, starY);
        Collisions.checkLinear(
            Belts.getLinearBelt(), startX, startY, endX, endY,
            perpAngle, Infinity, starX, starY
        );
    }

    return { draw, resetAllSatellites, destroyAllTargets };
})();

window.asteroids = asteroids;