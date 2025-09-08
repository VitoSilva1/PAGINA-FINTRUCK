function registrarUsuario(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const msgDiv = document.getElementById("msgRegister");

    msgDiv.innerHTML = ''; // limpiar mensajes previos

    if (!email || !password) {
        msgDiv.innerHTML = `<div class="alert alert-danger">Por favor completa todos los campos ❌</div>`;
        return;
    }

    localStorage.setItem("emailRegistrado", email);
    localStorage.setItem("passwordRegistrado", password);

    msgDiv.innerHTML = `<div class="alert alert-success">Usuario registrado con éxito ✅</div>`;

    document.getElementById("registerForm").reset();

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}
