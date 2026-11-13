const modal = () => document.getElementById('app-modal');
const modalBody = () => document.getElementById('modal-body');

/**
 * Inicializa los eventos de cierre del modal (botón X, clic fuera y tecla Escape).
 */
export function initModal() {
    const modalEl = modal();
    if (!modalEl) return;

    const closeBtn = modalEl.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
            closeModal();
        }
    });
}

/**
 * Abre el modal e inyecta contenido HTML o un nodo DOM.
 * @param {string|HTMLElement} content 
 */
export function openModal(content) {
    const modalEl = modal();
    const bodyEl = modalBody();
    if (!modalEl || !bodyEl) return;

    bodyEl.innerHTML = '';

    if (typeof content === 'string') {
        bodyEl.innerHTML = content;
    } else if (content instanceof HTMLElement) {
        bodyEl.appendChild(content);
    }

    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
}

/**
 * Cierra el modal y limpia su contenido.
 */
export function closeModal() {
    const modalEl = modal();
    const bodyEl = modalBody();
    if (!modalEl) return;

    modalEl.classList.add('hidden');
    if (bodyEl) bodyEl.innerHTML = '';
    document.body.style.overflow = '';
}