/**
 * events.js
 * Global pub/sub event bus for decoupled modules.
 *
 * Uso:
 *   Events.on('card:impact', () => { ... });
 *   Events.emit('card:impact', { foo: 'bar' });
 *   const off = Events.on('x', fn);
 *   off(); // desuscribe
 *
 * Convención de nombres: 'dominio:accion' (ej: 'theme:commit', 'wave:hit').
 */

const events = (() => {
    /** @type {Record<string, Function[]>} */
    let listeners = {};

    /**
     * Suscribe un handler a un evento.
     * @param {string} event
     * @param {(payload?: any) => void} handler
     * @returns {() => void} función para desuscribir
     */
    function on(event, handler) {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(handler);
        return () => off(event, handler);
    }

    /**
     * Desuscribe un handler específico.
     */
    function off(event, handler) {
        if (!listeners[event]) return;
        listeners[event] = listeners[event].filter(fn => fn !== handler);
    }

    /**
     * Emite un evento. Los errores de un handler no rompen a los demás.
     */
    function emit(event, payload) {
        if (!listeners[event]) return;
        // Copia defensiva: si un handler desuscribe durante el emit, no afecta el loop
        const handlers = listeners[event].slice();
        for (const fn of handlers) {
            try {
                fn(payload);
            } catch (err) {
                console.error(`[Events] handler error en "${event}":`, err);
            }
        }
    }

    /**
     * Limpia handlers. Sin argumento limpia TODO.
     */
    function clear(event) {
        if (event) delete listeners[event];
        else listeners = {};
    }

    /**
     * Debug: lista cuántos handlers tiene cada evento.
     */
    function debug() {
        const out = {};
        for (const [k, v] of Object.entries(listeners)) out[k] = v.length;
        return out;
    }

    return { on, off, emit, clear, debug };
})();

window.Events = events;