// const validUser = "example@example.cl";
// const validPassword = "123456";

// function crearUsusario() {
//     const inputEmail = document.getElementById("email");
//     console.log(inputEmail.value)
//     const inputPassword = document.getElementById("password");
//     console.log(inputPassword.value);
// }


// function validar() {
//     if (inputUser.value === validUser && inputPassword.value === validPassword) {
//         alert("usuario y contraseña valido")
//         window.location.href = "perfil.html";

//     } else {
//         alert("usuario o contraseña invalido")
//     }
// }

// Registrar usuario y guardar en LocalStorage
function registrarUsuario(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("emailRegistrado", email);
    localStorage.setItem("passwordRegistrado", password);

    console.log("Usuario registrado:", email, password);
    alert("Usuario registrado con éxito ✅");
}

// Iniciar sesión validando contra LocalStorage
function iniciarSesion(event) {
    event.preventDefault();

    const emailLogin = document.getElementById("username").value;
    const passwordLogin = document.getElementById("password").value;

    const emailRegistrado = localStorage.getItem("emailRegistrado");
    const passwordRegistrado = localStorage.getItem("passwordRegistrado");

    if (emailLogin === emailRegistrado && passwordLogin === passwordRegistrado) {
        console.log("Inicio de sesión exitoso ✅");
        alert("Bienvenido, has iniciado sesión 🎉");

        window.location.href = "perfil.html";
    } else {
        console.log("Credenciales incorrectas ❌");
        alert("Correo o contraseña incorrectos");
    }
}