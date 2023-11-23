
document.body.onload = function () {
    const iniciosesion = document.getElementById("sign-in-form");
    iniciosesion.style.display = "none";

}


document.addEventListener('DOMContentLoaded', () => {
    const $btnSignIn = document.querySelector('.sign-in-btn');
    const $btnSignUp = document.querySelector('.sign-up-btn');
    const $signUp = document.querySelector('.sign-up');
    const $signIn = document.querySelector('.sign-in');
    const $movimientosContainer = document.getElementById('movimientos-container');
    const $registroButton = document.getElementById('register-button');
    const $message = document.getElementById('message');
    const $cambiarClaveButton = document.getElementById('cambiar-clave-button');
    const $loginButton = document.getElementById('login-button');
    const $botonsalir = document.getElementById('salir-button');

    let loginAttempts = 0;
    const maxLoginAttempts = 3;
    let isAccountLocked = false;


    $btnSignIn.addEventListener('click', () => {
        const iniciosesion = document.getElementById("sign-in-form");
        iniciosesion.style.display = "block";
        const panelregistro = document.getElementById("sign-up-form");
        panelregistro.style.display = "none";

        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active');
    });

    $btnSignUp.addEventListener('click', () => {
        const iniciosesion = document.getElementById("sign-in-form");
        iniciosesion.style.display = "none";
        const panelregistro = document.getElementById("sign-up-form");
        panelregistro.style.display = "block";
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active');
    });

    const users = []; // Array que almacena usuarios

    users.push({
        username: "j8a",
        password: "1234"
    });

    //Apartado de registro
    $registroButton.addEventListener('click', () => {

        const registerUsername = document.getElementById('register-username').value;
        const registerPassword = document.getElementById('register-password').value;


        if (registerUsername && registerPassword) {
            users.push({ username: registerUsername, password: registerPassword });
            $message.textContent = "Registro exitoso.";
            $message.style.display = "block";
            $message.classList.remove("login-success");
            $message.classList.add("registration-success");
        } else {
            $message.textContent = "Por favor, complete todos los campos.";
            $message.style.display = "block";
        }
    });


    //Apartado error al digitar cuenta
    $loginButton.addEventListener('click', () => {
        if (isAccountLocked) {
            $message.textContent = "Cuenta bloqueada por 24 horas. Comunícate con tu asesor.";
            $message.style.display = "block";
            return;
        }


        const loginUsername = document.getElementById('login-username').value;
        const loginPassword = document.getElementById('login-password').value;

        const user = users.find(u => u.username === loginUsername && u.password === loginPassword);

        if (user) {
            //Mensajes
            $message.textContent = "Inicio de sesión exitoso.";
            $message.style.display = "block";
            $message.classList.remove("registration-success");
            $message.classList.add("login-success");


            $movimientosContainer.style.display = "block";
            document.getElementById("sign-in-form").style.display = "none";

        } else {
            loginAttempts++;
            if (loginAttempts >= maxLoginAttempts) {
                isAccountLocked = true;
                $message.textContent = "Cuenta bloqueada por 24 horas. Comunícate con un asesor.";
                $message.style.display = "block";
            } else {
                $message.textContent = `Usuario o contraseña incorrectos. Intentos restantes: ${maxLoginAttempts - loginAttempts}.`;
                $message.style.display = "block";
            }
        }
    });

    $cambiarClaveButton.addEventListener('click', () => {
        const nuevacontraseña = prompt("Ingresa tu nueva clave: ");
        const confirmarcontraseña = prompt("Confirma tu nueva clave: ");

        if (nuevacontraseña !== null && confirmarcontraseña !== null) {
            if (nuevacontraseña === confirmarcontraseña) {
                alert("Cambio de clave exitoso");
            } else {
                alert("Las claves no coinciden, intentalo de nuevo ")

            }
        }

    });

    $botonsalir.addEventListener('click', () => {
        window.location.href = '';
    })


});
