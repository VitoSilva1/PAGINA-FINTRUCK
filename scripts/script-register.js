function registrarUsuario(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("password");
    const usernameInput = document.getElementById("nombre");
    const username = usernameInput.value
    const password = passwordInput.value;
    const msgDiv = document.getElementById("msgRegister");

    msgDiv.innerHTML = ''; // limpiar mensajes previos
    passwordInput.classList.remove("input-error", "input-success");

    // Validar campos vacíos
    if (!username || !email || !password) {
        msgDiv.innerHTML = `<div class="alert alert-danger">Por favor completa todos los campos ❌</div>`;
        passwordInput.classList.add("input-error");
        return;
    }

    // Validar contraseña (mínimo 6 caracteres, al menos un número y una letra)
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!regexPassword.test(password)) {
        msgDiv.innerHTML = `<div class="alert alert-warning">
            La contraseña debe tener al menos <b>6 caracteres</b> e incluir <b>letras y números</b> ⚠️
        </div>`;
        passwordInput.classList.add("input-error");
        return;
    }

    // Guardar usuario en localStorage
    localStorage.setItem("usernameRegistrado", username);
    localStorage.setItem("emailRegistrado", email);
    localStorage.setItem("passwordRegistrado", password);

    msgDiv.innerHTML = `<div class="alert alert-success">Usuario registrado con éxito ✅</div>`;

    // Marcar input como válido
    passwordInput.classList.add("input-success");

    // Resetear formulario
    document.getElementById("registerForm").reset();

    // Redirigir después de 1.5 segundos
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}