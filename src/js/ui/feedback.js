import { createElement, clearContainer } from './dom.js';

const feedbackContainer = () => document.getElementById('feedback-container');

/**
 * Muestra un spinner de carga en el contenedor de feedback.
 * @param {string} message 
 */
export function showSpinner(message = 'Buscando en archivos históricos...') {
    const container = feedbackContainer();
    if (!container) return;

    clearContainer(container);
    const spinner = createElement('div', {
        className: 'feedback-spinner',
        html: `<div class="loader"></div><p>${message}</p>`
    });
    container.appendChild(spinner);
}

/**
 * Oculta el spinner o limpia el contenedor de feedback.
 */
export function hideFeedback() {
    clearContainer(feedbackContainer());
}

/**
 * Muestra una alerta estática (error, advertencia o info).
 * @param {string} message 
 * @param {'error'|'success'|'info'} type 
 */
export function showAlert(message, type = 'error') {
    const container = feedbackContainer();
    if (!container) return;

    clearContainer(container);
    const alertBox = createElement('div', {
        className: `alert alert-${type}`,
        text: message
    });
    container.appendChild(alertBox);
}

/**
 * Muestra una alerta flotante temporal (Toast) en la esquina de la pantalla.
 * @param {string} message 
 * @param {'success'|'error'|'info'} type 
 */
export function showToast(message, type = 'info') {
    const toast = createElement('div', {
        className: `toast toast-${type}`,
        text: message
    });

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Renderiza un estado vacío en la cuadrícula de resultados.
 * @param {HTMLElement} targetGrid 
 * @param {string} message 
 */
export function showEmptyState(targetGrid, message = 'No se encontraron resultados para tu búsqueda.') {
    if (!targetGrid) return;
    clearContainer(targetGrid);

    const emptyBox = createElement('div', {
        className: 'empty-state',
        html: `<p>📭 ${message}</p>`
    });
    targetGrid.appendChild(emptyBox);
}
