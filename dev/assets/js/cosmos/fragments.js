/**
 * fragments.js
 * Create and draw debris from satellites, planets, and moons.
 */

const fragments = (() => {
    const { $ } = window.DOM;
    const S = window.CosmosState;

    // Fragment type configuration keyed by kind.
    // kind: 'satellite' | 'iss' | 'spaceship'
    const FRAGMENT_TYPES = {
        satellite: [
            { max: 0.35, name: 'solar_panel' },
            { max: 0.60, name: 'circuit' },
            { max: 0.75, name: 'module_pipe' },
            { max: 1.00, name: 'metal' }
        ],
        iss: [
            { max: 0.35, name: 'solar_panel' },
            { max: 0.60, name: 'circuit' },
            { max: 0.80, name: 'module_pipe' },
            { max: 1.00, name: 'metal' }
        ],
        spaceship: [
            { max: 0.25, name: 'cockpit_shard' },
            { max: 0.50, name: 'wing_fragment' },
            { max: 0.75, name: 'engine_part' },
            { max: 1.00, name: 'spaceship_metal' }
        ]
    };

    function pickType(rand, kind) {
        const table = FRAGMENT_TYPES[kind] || FRAGMENT_TYPES.satellite;
        const found = table.find(t => rand < t.max);
        return found ? found.name : 'metal';
    }

    /**
     * @param {object} target - objeto con posición y config
     * @param {number} impactX
     * @param {number} impactY
     * @param {number} baseSize
     * @param {'satellite'|'iss'|'spaceship'} kind
     */
    function createSatelliteFragments(target, impactX, impactY, baseSize, kind = 'satellite') {
        // Compatibilidad con la firma vieja (isISS boolean)
        if (kind === true) kind = 'iss';
        if (kind === false) kind = 'satellite';

        const out = [];
        let count;
        if (kind === 'iss') count = Math.floor(Math.random() * 20) + 35;
        else if (kind === 'spaceship') count = Math.floor(Math.random() * 15) + 25;
        else count = Math.floor(Math.random() * 10) + 18;

        for (let i = 0; i < count; i++) {
            const r = Math.sqrt(Math.random()) * (baseSize * 1.2);
            const theta = Math.random() * Math.PI * 2;
            const offsetX = r * Math.cos(theta);
            const offsetY = r * Math.sin(theta);

            const blastAngle = Math.atan2(offsetY, offsetX) + (Math.random() - 0.5) * 0.9;
            let blastSpeed;
            if (kind === 'iss') blastSpeed = Math.random() * 6.5 + 2.2;
            else if (kind === 'spaceship') blastSpeed = Math.random() * 7.5 + 2.5;
            else blastSpeed = Math.random() * 5.0 + 1.8;

            out.push({
                relX: offsetX,
                relY: offsetY,
                x: impactX + offsetX,
                y: impactY + offsetY,
                vx: Math.cos(blastAngle) * blastSpeed,
                vy: Math.sin(blastAngle) * blastSpeed,
                size: Math.random() * (kind === 'iss' ? 3.5 : kind === 'spaceship' ? 3 : 2.5) + 1.0,
                rot: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.45,
                category: pickType(Math.random(), kind),
                sparklePhase: Math.random() * Math.PI * 2,
                trail: [],
                life: 1.0
            });
        }
        return out;
    }

    function drawSatelliteFragments(frags, baseX, baseY) {
        for (const frag of frags) {
            if (S.transitionType === 'rewind') {
                frag.x += (baseX + frag.relX - frag.x) * 0.14;
                frag.y += (baseY + frag.relY - frag.y) * 0.14;
                frag.rot -= frag.vRot * 2;
                frag.life = Math.min(1, frag.life + 0.02);
            } else if (S.transitionType === 'explode') {
                frag.x += frag.vx;
                frag.y += frag.vy;
                frag.vx *= 0.97;
                frag.vy *= 0.97;
                frag.rot += frag.vRot;
                frag.life -= 0.006;
                if (frag.life < 0.3) frag.life = 0.3;

                if (frag.category === 'circuit' && Math.random() > 0.65) {
                    frag.trail.push({ x: frag.x, y: frag.y, alpha: 0.9, color: '#38bdf8', size: frag.size * 0.5 });
                } else if (frag.category === 'engine_part' && Math.random() > 0.5) {
                    frag.trail.push({ x: frag.x, y: frag.y, alpha: 0.9, color: '#fb923c', size: frag.size * 0.6 });
                } else if (Math.random() > 0.7) {
                    frag.trail.push({ x: frag.x, y: frag.y, alpha: 0.6, color: '#fb923c', size: frag.size * 0.6 });
                }
            }

            // Trail
            for (let t = frag.trail.length - 1; t >= 0; t--) {
                const tr = frag.trail[t];
                tr.alpha -= 0.06;
                if (tr.alpha <= 0) { frag.trail.splice(t, 1); continue; }
                ctx.fillStyle = tr.color;
                ctx.beginPath();
                ctx.arc(tr.x, tr.y, tr.size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Dibujo
            ctx.save();
            ctx.globalAlpha = Math.max(0.3, Math.min(1, frag.life));
            ctx.translate(frag.x, frag.y);
            ctx.rotate(frag.rot);

            drawFragmentShape(frag);
            ctx.restore();
        }
    }

    function drawFragmentShape(frag) {
        const s = frag.size;
        switch (frag.category) {
            case 'solar_panel':
                ctx.fillStyle = '#1d4ed8';
                ctx.strokeStyle = '#60a5fa';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.rect(-s * 0.6, -s * 1.2, s * 1.2, s * 2.4);
                ctx.fill(); ctx.stroke();
                break;

            case 'module_pipe':
                ctx.fillStyle = '#cbd5e1';
                ctx.strokeStyle = '#f8fafc';
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.rect(-s * 1.5, -s * 0.4, s * 3.0, s * 0.8);
                ctx.fill(); ctx.stroke();
                break;

            case 'circuit': {
                const spark = Math.sin(S.pulseAnim * 12 + frag.sparklePhase) > 0.4;
                ctx.fillStyle = spark ? '#38bdf8' : '#334155';
                ctx.beginPath();
                ctx.arc(0, 0, s * 0.8, 0, Math.PI * 2);
                ctx.fill();
                if (spark) { ctx.shadowColor = '#0284c7'; ctx.shadowBlur = 6; }
                break;
            }

            // --- Spaceship fragments ---
            case 'cockpit_shard':
                ctx.fillStyle = 'rgba(125, 211, 252, 0.9)';
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(-s * 0.5, -s * 0.5);
                ctx.lineTo(s * 0.6, -s * 0.3);
                ctx.lineTo(s * 0.2, s * 0.7);
                ctx.lineTo(-s * 0.6, s * 0.3);
                ctx.closePath();
                ctx.fill(); ctx.stroke();
                // Reflejo
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.beginPath();
                ctx.arc(-s * 0.15, -s * 0.15, s * 0.15, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'wing_fragment':
                ctx.fillStyle = '#94a3b8';
                ctx.strokeStyle = '#cbd5e1';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(-s * 1.2, -s * 0.2);
                ctx.lineTo(s * 1.2, s * 0.1);
                ctx.lineTo(s * 0.8, s * 0.5);
                ctx.lineTo(-s * 1, s * 0.3);
                ctx.closePath();
                ctx.fill(); ctx.stroke();
                break;

            case 'engine_part': {
                ctx.fillStyle = '#fb923c';
                ctx.strokeStyle = '#f97316';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.rect(-s * 0.6, -s * 0.6, s * 1.2, s * 1.2);
                ctx.fill(); ctx.stroke();
                // Brillo interno
                const pulse = 0.6 + 0.4 * Math.sin(S.pulseAnim * 15 + frag.sparklePhase);
                ctx.fillStyle = `rgba(255, 240, 150, ${pulse})`;
                ctx.beginPath();
                ctx.arc(0, 0, s * 0.35, 0, Math.PI * 2);
                ctx.fill();
                break;
            }

            case 'spaceship_metal':
            default:
                ctx.fillStyle = '#cbd5e1';
                ctx.beginPath();
                ctx.rect(-s * 0.5, -s * 0.5, s, s * 1.1);
                ctx.fill();
                break;
        }
    }

    // ============================================================
    // Planet fragments remain unchanged.
    // ============================================================
    const EARTH_COLORS = ['#38bdf8', '#1d4ed8', '#15803d', '#a16207', '#f8fafc', '#15803d'];
    const MOON_COLORS  = ['#f8fafc', '#cbd5e1', '#94a3b8', '#64748b'];
    const MARS_COLORS  = ['#fb923c', '#ea580c', '#c2410c', '#7c2d12', '#a16207'];

    function buildParticles(impactX, impactY, baseRadius, count, colors, blastFactor) {
        const out = [];
        for (let i = 0; i < count; i++) {
            const r = Math.sqrt(Math.random()) * (baseRadius * 0.95);
            const theta = Math.random() * Math.PI * 2;
            const offsetX = r * Math.cos(theta);
            const offsetY = r * Math.sin(theta);

            const blastAngle = Math.atan2(offsetY, offsetX) + (Math.random() - 0.5) * 0.45;
            const blastDist = Math.random() * 170 + 60;

            const isDust = Math.random() < 0.35;
            const pointCount = Math.floor(Math.random() * 3) + 4;
            const baseR = isDust ? Math.random() * 1.5 + 0.5 : Math.random() * 3.5 + 1.2;
            const points = [];
            for (let k = 0; k < pointCount; k++) {
                const pa = (k / pointCount) * Math.PI * 2;
                const pr = baseR * (0.6 + Math.random() * 0.7);
                points.push({ x: Math.cos(pa) * pr, y: Math.sin(pa) * pr });
            }

            out.push({
                relX: offsetX,
                relY: offsetY,
                destX: impactX + offsetX + Math.cos(blastAngle) * blastDist,
                destY: impactY + offsetY + Math.sin(blastAngle) * blastDist,
                x: impactX + offsetX,
                y: impactY + offsetY,
                vx: (Math.cos(blastAngle) * blastDist) * blastFactor,
                vy: (Math.sin(blastAngle) * blastDist) * blastFactor,
                rot: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.2,
                color: colors[Math.floor(Math.random() * colors.length)],
                isDust,
                points,
                trail: []
            });
        }
        return out;
    }

    function createPlanetFragments(impactX, impactY, planetRadius, moonX, moonY, moonRadius) {
        const planetFrags = buildParticles(impactX, impactY, planetRadius, 55, EARTH_COLORS, 0.045);
        const moonFrags   = buildParticles(moonX,   moonY,   moonRadius,   28, MOON_COLORS,  0.045);
        return { planetFrags, moonFrags };
    }

    function createMarsFragments(impactX, impactY, radius) {
        return buildParticles(impactX, impactY, radius, 48, MARS_COLORS, 0.045);
    }

    function drawFragments(frags, baseX, baseY, rewindRate, dustChance) {
        for (const frag of frags) {
            if (S.transitionType === 'rewind') {
                frag.x += (baseX + frag.relX - frag.x) * 0.12;
                frag.y += (baseY + frag.relY - frag.y) * 0.12;
                frag.rot -= frag.vRot * 1.5;
            } else {
                frag.x += (frag.destX - frag.x) * 0.06;
                frag.y += (frag.destY - frag.y) * 0.06;
                frag.rot += frag.vRot;

                if (frag.isDust && Math.random() > dustChance) {
                    frag.trail.push({
                        x: frag.x + (Math.random() - 0.5) * 2,
                        y: frag.y + (Math.random() - 0.5) * 2,
                        alpha: 0.6,
                        size: Math.random() * 1.8 + 0.6,
                        color: frag.color
                    });
                }
            }

            for (let t = frag.trail.length - 1; t >= 0; t--) {
                const tr = frag.trail[t];
                tr.alpha -= 0.035;
                tr.size *= 0.95;
                if (tr.alpha <= 0) { frag.trail.splice(t, 1); continue; }
                ctx.save();
                ctx.globalAlpha = tr.alpha;
                ctx.fillStyle = tr.color;
                ctx.beginPath();
                ctx.arc(tr.x, tr.y, tr.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            ctx.save();
            ctx.translate(frag.x, frag.y);
            ctx.rotate(frag.rot);
            ctx.fillStyle = frag.color;
            if (frag.isDust) {
                ctx.beginPath();
                ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.beginPath();
                for (let p = 0; p < frag.points.length; p++) {
                    if (p === 0) ctx.moveTo(frag.points[p].x, frag.points[p].y);
                    else ctx.lineTo(frag.points[p].x, frag.points[p].y);
                }
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }
    }

    return {
        createSatelliteFragments,
        drawSatelliteFragments,
        createPlanetFragments,
        createMarsFragments,
        drawFragments,
        EARTH_COLORS,
        MOON_COLORS
    };
})();

window.fragments = fragments;