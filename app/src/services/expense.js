const API_EXPENSE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';

// const parseResponse = async (response) => {
//     const body = await response.json().catch(() => ({}));

//     if (!response.ok) {
//         const detail = body?.detail;
//         const message = Array.isArray(detail) ? detail.join(', ') : detail || 'Ocurrió un error inesperado.';
//         throw new Error(message); ``
//     }

//     return body;
// };

const enviarGastos = async (gastos) => { // gastos es el objeto generado en guardarGasto
    try {
        const body = typeof gastos === 'string' ? gastos : JSON.stringify(gastos);
        const response = await fetch(`${API_EXPENSE_URL}/expenses/bulk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body, // Convertir el objeto de gastos a JSON
        });

        if (!response.ok) {
            throw new Error('Error al enviar los gastos');
        }

        const data = await response.json();
        console.log('Respuesta de la API:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};

export { enviarGastos };