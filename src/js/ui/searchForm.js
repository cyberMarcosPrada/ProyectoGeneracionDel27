import { validateSearchParams } from '../utils/validators.js';
import { showAlert, hideFeedback } from './feedback.js';

let currentCategory = 'authors'; // 'authors' | 'works'

const PLACEHOLDERS = {
    authors: {
        p1: 'Ej. Federico García Lorca, Rafael Alberti...',
        p2: 'Ej. Poesía, Teatro, Ensayo...',
        p3: 'Ej. 1898, 1927...',
        p4: 'Ej. Granada, Madrid, Málaga...'
    },
    works: {
        p1: 'Ej. Romancero gitano, Poeta en Nueva York...',
        p2: 'Ej. Poemario, Drama, Antología...',
        p3: 'Ej. 1928, 1936...',
        p4: 'Ej. Editorial, idioma o tema...'
    }
};

/**
 * Inicializa la navegación por pestañas, categorías y envío del formulario.
 * @param {Function} onSearchSubmit - Callback que recibe ({ category, params })
 * @param {Function} onTabChange - Callback opcional al cambiar entre Búsqueda y Biblioteca
 */
export function initSearchForm(onSearchSubmit, onTabChange) {
    setupMainNav(onTabChange);
    setupCategoryTabs();
    setupFormSubmit(onSearchSubmit);
}

function setupMainNav(onTabChange) {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            navButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach((section) => {
                section.classList.toggle('active', section.id === `${targetTab}-tab`);
            });

            if (typeof onTabChange === 'function') {
                onTabChange(targetTab);
            }
        });
    });
}

function setupCategoryTabs() {
    const catButtons = document.querySelectorAll('.cat-btn');

    catButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;

            catButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            updatePlaceholders(currentCategory);
            hideFeedback();
        });
    });
}

function updatePlaceholders(category) {
    const config = PLACEHOLDERS[category];
    if (!config) return;

    document.getElementById('input-param1').placeholder = config.p1;
    document.getElementById('input-param2').placeholder = config.p2;
    document.getElementById('input-param3').placeholder = config.p3;
    document.getElementById('input-param4').placeholder = config.p4;
}

function setupFormSubmit(onSearchSubmit) {
    const form = document.getElementById('search-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        hideFeedback();

        const params = {
            param1: document.getElementById('input-param1').value.trim(),
            param2: document.getElementById('input-param2').value.trim(),
            param3: document.getElementById('input-param3').value.trim(),
            param4: document.getElementById('input-param4').value.trim()
        };

        const validation = validateSearchParams(params);
        if (!validation.isValid) {
            showAlert(validation.error, 'error');
            return;
        }

        if (typeof onSearchSubmit === 'function') {
            onSearchSubmit({
                category: currentCategory,
                params
            });
        }
    });
}

export function getCurrentCategory() {
    return currentCategory;
}
