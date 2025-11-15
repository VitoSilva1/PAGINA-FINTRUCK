const API_BASE_URL = window.fintrackConfig?.API_BASE_URL || "http://localhost:8000";

async function iniciarSesion(event) {
    event.preventDefault();

    const emailLogin = document.getElementById("username").value.trim();
    const passwordLogin = document.getElementById("password").value;
    const msgDiv = document.getElementById("msgLogin");

    msgDiv.innerHTML = ''; // limpiar mensajes previos

    if (!emailLogin || !passwordLogin) {
        msgDiv.innerHTML = `<div class="alert alert-danger">Por favor ingresa tu correo y contraseña </div>`;
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailLogin,
                password: passwordLogin,
            }),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            const detail = result?.detail || "No se pudo iniciar sesión.";
            throw new Error(Array.isArray(detail) ? detail.join(", ") : detail);
        }

        localStorage.setItem("fintrackAccessToken", result.access_token);
        localStorage.setItem("fintrackUserEmail", emailLogin);

        msgDiv.innerHTML = `<div class="alert alert-success">Bienvenido, has iniciado sesión </div>`;
        setTimeout(() => {
            window.location.href = "perfil.html";
        }, 1500);
    } catch (error) {
        msgDiv.innerHTML = `<div class="alert alert-danger">${error.message || "Correo o contraseña incorrectos "}</div>`;
    }
}
