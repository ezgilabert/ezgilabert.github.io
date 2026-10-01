/**
 * transition.js
 * State machine for theme transitions between idle, explode, and rewind.
 * Emits events through window.Events without depending on consumers.
 *
 * Valid states:
 *   - 'idle'    → no active transition
 *   - 'explode' → supernova en curso (dark → light)
 *   - 'rewind'  → rewinding en curso (light → dark)
 *
 * Uso:
 *   transition.goTo('explode');         // dispara enter/exit
 *   transition.is('explode');           // booleano
 *   transition.on('enter:explode', fn); // suscribirse
 *   transition.on('exit:explode', fn);
 *
 * Eventos emitidos (nombres):
 *   - 'transition:change'         → { from, to }
 *   - 'enter:idle' / 'exit:idle'
 *   - 'enter:explode' / 'exit:explode'
 *   - 'enter:rewind' / 'exit:rewind'
 */

const transition = (() => {
    const Events = window.Events;

    const STATES = {
        IDLE:    'idle',
        EXPLODE: 'explode',
        REWIND:  'rewind'
    };

    let current = STATES.IDLE;

    // ============================================================
    // API
    // ============================================================

    function state() {
        return current;
    }

    function is(s) {
        return current === s;
    }

    function isIdle()    { return current === STATES.IDLE; }
    function isExplode() { return current === STATES.EXPLODE; }
    function isRewind()  { return current === STATES.REWIND; }
    function isBusy()    { return current !== STATES.IDLE; }

    /**
    * Change state; do nothing if the requested state is already active.
     * Emite 'exit:X' y luego 'enter:Y'.
     */
    function goTo(next) {
        if (next === current) return false;
        if (!Object.values(STATES).includes(next)) {
            console.warn(`[transition] estado inválido: "${next}"`);
            return false;
        }

        const prev = current;
        Events.emit(`exit:${prev}`, { from: prev, to: next });
        current = next;
        Events.emit('transition:change', { from: prev, to: next });
        Events.emit(`enter:${next}`, { from: prev, to: next });
        return true;
    }

    /**
    * Enter a state only while idle to prevent overlapping transitions.
     */
    function tryStart(target) {
        if (!isIdle()) return false;
        return goTo(target);
    }

    /** Return to idle. */
    function reset() {
        return goTo(STATES.IDLE);
    }

    /**
     * Suscribe un handler a un evento de la FSM.
    * Return an unsubscribe function.
     */
    function on(event, handler) {
        return Events.on(event, handler);
    }

    // ============================================================
    // Helpers de compatibilidad (evitan tocar TODO de una)
    // ============================================================
    // Keep `isTransitioning` and `transitionType` for legacy consumers.
    // como PROXIES de lectura para no romper código existente.
    // Eventualmente se eliminan.
    function legacyType() {
        return current === STATES.IDLE ? 'none' : current;
    }

    return {
        STATES,
        state,
        is,
        isIdle,
        isExplode,
        isRewind,
        isBusy,
        goTo,
        tryStart,
        reset,
        on,
        legacyType
    };
})();

window.transition = transition;