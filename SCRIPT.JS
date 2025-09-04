const validUser = "example@example.cl";
const validPassword = "123456";

const inputUser = document.getElementById("username");
const inputPassword = document.getElementById("password");

function validar() {
    if (inputUser.value === validUser && inputPassword.value === validPassword) {
        alert("usuario y contraseña valido")
        window.location.href = "perfil.html";

    } else {
        alert("usuario o contraseña invalido")
    }
}

