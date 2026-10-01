/**
 * mobile-sheet.js
 * Mobile profile bottom sheet; the avatar is not draggable.
 *
 * - Sheet: opens/closes on avatar, close button, backdrop, Escape, and swipe events.
 * - Avatar: fixed in the top-right corner (not draggable).
 * - Opens automatically 600 ms after loading on mobile.
 * - The avatar remains hidden until the user closes the sheet once.
 */

const mobileSheet = (() => {
    const { $ } = window.DOM;

    let sheet, backdrop, trigger, closeBtn;
    const AUTO_OPEN_DELAY = 600;

    // The avatar appears after the user closes the initial auto-opened sheet.
    let avatarUnlocked = false;

    // Sheet drag state
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    // ============================================================
    // SHEET
    // ============================================================
    function open() {
        if (!sheet) return;
        sheet.classList.add('is-open');
        backdrop.classList.add('is-visible');
    }

    function close() {
        if (!sheet) return;
        sheet.classList.remove('is-open');
        backdrop.classList.remove('is-visible');
        sheet.style.transform = '';

        // Reveal the avatar when the sheet is closed for the first time.
        if (!avatarUnlocked) {
            avatarUnlocked = true;
            unlockAvatar();
        }
    }

    function isOpen() {
        return sheet && sheet.classList.contains('is-open');
    }

    // ============================================================
    // AVATAR
    // ============================================================
    function lockAvatar() {
        if (!trigger) return;
        trigger.style.opacity = '0';
        trigger.style.pointerEvents = 'none';
    }

    function unlockAvatar() {
        if (!trigger) return;
        trigger.style.opacity = '';
        trigger.style.pointerEvents = '';
    }

    function onTriggerClick() {
        open();
    }

    // ============================================================
    // SHEET DRAG
    // ============================================================
    function onSheetTouchStart(e) {
        if (!isOpen()) return;
        if (sheet.scrollTop > 5) return;
        startY = e.touches[0].clientY;
        currentY = startY;
        isDragging = true;
        sheet.style.transition = 'none';
    }

    function onSheetTouchMove(e) {
        if (!isDragging) return;
        currentY = e.touches[0].clientY;
        const deltaY = Math.max(0, currentY - startY);
        sheet.style.transform = `translateY(${deltaY}px)`;
    }

    function onSheetTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        sheet.style.transition = '';
        const deltaY = currentY - startY;
        if (deltaY > 100) close();
        else sheet.style.transform = '';
        startY = 0;
        currentY = 0;
    }

    // ============================================================
    // INIT
    // ============================================================
    function init() {
        sheet     = $('#profile-sidebar');
        backdrop  = $('#profile-backdrop');
        trigger   = $('#profile-trigger');
        closeBtn  = $('#profile-close');

        if (!sheet || !backdrop || !trigger) {
            console.warn('[sheet] elementos no encontrados');
            return;
        }

        // Eventos del sheet
        trigger.addEventListener('click', onTriggerClick);
        backdrop.addEventListener('click', close);
        if (closeBtn) closeBtn.addEventListener('click', close);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen()) close();
        });

        sheet.addEventListener('touchstart', onSheetTouchStart, { passive: true });
        sheet.addEventListener('touchmove', onSheetTouchMove, { passive: true });
        sheet.addEventListener('touchend', onSheetTouchEnd);
        sheet.addEventListener('touchcancel', onSheetTouchEnd);

        // Lock the avatar and auto-open the sheet on mobile.
        if (window.matchMedia('(max-width: 767px)').matches) {
            lockAvatar();
            setTimeout(open, AUTO_OPEN_DELAY);
        }
    }

    return { init, open, close, isOpen };
})();

window.mobileSheet = mobileSheet;