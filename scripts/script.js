function iniciarSesion(event) {
    event.preventDefault();

    const emailLogin = document.getElementById("username").value.trim();
    const passwordLogin = document.getElementById("password").value;
    const msgDiv = document.getElementById("msgLogin");

    msgDiv.innerHTML = ''; // limpiar mensajes previos

    const emailRegistrado = localStorage.getItem("emailRegistrado");
    const passwordRegistrado = localStorage.getItem("passwordRegistrado");

    if (emailLogin === emailRegistrado && passwordLogin === passwordRegistrado) {
        msgDiv.innerHTML = `<div class="alert alert-success">Bienvenido, has iniciado sesión 🎉</div>`;
        setTimeout(() => {
            window.location.href = "perfil.html";
        }, 1500);
    } else {
        msgDiv.innerHTML = `<div class="alert alert-danger">Correo o contraseña incorrectos ❌</div>`;
    }
}
