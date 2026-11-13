/**
 * Valida los 4 parámetros introducidos en el formulario de búsqueda.
 * @param {Object} params - { param1, param2, param3, param4 }
 * @returns {Object} { isValid: boolean, error: string | null }
 */
export function validateSearchParams(params) {
    const { param1, param2, param3, param4 } = params;

    // 1. Comprobar que al menos un campo tiene contenido
    const hasAtLeastOne = [param1, param2, param3, param4].some(
        (val) => val && val.trim().length > 0
    );

    if (!hasAtLeastOne) {
        return {
            isValid: false,
            error: 'Por favor, rellena al menos uno de los 4 campos de búsqueda.'
        };
    }

    // 2. Validar longitud mínima en textos introducidos (evitar búsquedas de 1 letra)
    for (const [key, val] of Object.entries(params)) {
        if (val && val.trim().length === 1) {
            return {
                isValid: false,
                error: 'Los términos de búsqueda deben tener al menos 2 caracteres.'
            };
        }
    }

    // 3. Validar que el parámetro 3 (Año / Época), si se rellena, sea un año válido (4 dígitos)
    if (param3 && param3.trim() !== '') {
        const yearRegex = /^(18|19|20)\d{2}$/;
        if (!yearRegex.test(param3.trim())) {
            return {
                isValid: false,
                error: 'El campo Año / Época debe ser un año válido de 4 cifras (ej. 1927).'
            };
        }
    }

    return { isValid: true, error: null };
}
