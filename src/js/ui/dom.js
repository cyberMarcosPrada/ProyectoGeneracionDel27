/**
 * Crea un elemento del DOM con atributos, clases e hijos de forma declarativa.
 * @param {string} tag - Etiqueta HTML (ej. 'div', 'button', 'p')
 * @param {Object} options - { className, text, html, attrs, dataset }
 * @param {Array<HTMLElement>} children - Elementos hijos a insertar
 * @returns {HTMLElement}
 */
export function createElement(tag, options = {}, children = []) {
    const el = document.createElement(tag);

    if (options.className) {
        el.className = options.className;
    }

    if (options.text) {
        el.textContent = options.text;
    }

    if (options.html) {
        el.innerHTML = options.html;
    }

    if (options.attrs) {
        Object.entries(options.attrs).forEach(([key, val]) => {
            el.setAttribute(key, val);
        });
    }

    if (options.dataset) {
        Object.entries(options.dataset).forEach(([key, val]) => {
            el.dataset[key] = val;
        });
    }

    children.forEach((child) => {
        if (child instanceof HTMLElement) {
            el.appendChild(child);
        }
    });

    return el;
}

/**
 * Limpia todo el contenido HTML de un contenedor.
 * @param {HTMLElement|string} container - Elemento o selector CSS
 */
export function clearContainer(container) {
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (el) {
        el.innerHTML = '';
    }
}
