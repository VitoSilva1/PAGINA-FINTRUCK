
const API_BASE_URL = window.fintrackConfig?.API_BASE_URL || "http://localhost:8000";

async function registrarUsuario(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const msgDiv = document.getElementById("msgRegister");

    msgDiv.innerHTML = '';

    if (!firstName || !lastName || !email || !password) {
        msgDiv.innerHTML = `<div class="alert alert-danger">Por favor completa todos los campos</div>`;
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                 
            }),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            const detail = result?.detail || "No se pudo registrar al usuario.";
            throw new Error(Array.isArray(detail) ? detail.join(", ") : detail);
        }

        msgDiv.innerHTML = `<div class="alert alert-success">Usuario registrado con éxito </div>`;
        document.getElementById("registerForm").reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (error) {
        msgDiv.innerHTML = `<div class="alert alert-danger">${error.message || "Ocurrió un error inesperado."}</div>`;
    }
}