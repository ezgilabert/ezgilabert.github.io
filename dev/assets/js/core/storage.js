/**
 * storage.js
 * Synchronous localStorage wrapper for user preferences.
 *
 * Consumers rely on this synchronous API; IndexedDB would require async changes.
 */

const storage = {
    get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw === null ? fallback : JSON.parse(raw);
        } catch {
            return fallback;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            /* modo privado o cuota llena: fallo silencioso */
        }
    }
};

window.Storage = storage;