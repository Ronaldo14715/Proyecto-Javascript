class Usuario {
    constructor(usuario, password, nombre, apellido, genero, dni) {
        this.usuario = usuario;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
        this.genero = genero;
        this.dni = dni;
    }
}

const btnSignIn = document.getElementById('btn-signIn');
const btnLogIn = document.getElementById('btn-logIn');

btnSignIn.addEventListener('click', () => {
    const usuario = document.getElementById('txtUsuario').value.trim();
    const password = document.getElementById('txtPassword').value.trim();
    const nombre = document.getElementById('txtNombre').value.trim();
    const apellido = document.getElementById('txtApellido').value.trim();
    const genero = document.getElementById('selectGenero').value;
    const dni = document.getElementById('txtDni').value.trim();

    if (usuario && password && nombre && apellido && genero && dni) {

        const usuarioN = new Usuario(usuario, password, nombre, apellido, genero, dni);

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioExistente = usuarios.find(user => user.usuario === usuario || user.dni === dni);

        if (usuarioExistente) {

            Toastify({
                text: "El usuario ya existe",
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                    background: "red",
                }
            }).showToast();
            return; 
        }

        usuarios.push(usuarioN);

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        localStorage.setItem('usuarioActual', JSON.stringify(usuarioN));

        Toastify({
            text: "Cuenta creada y sesión iniciada con éxito",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "green",
            }
        }).showToast();

        window.location.href = './../index.html';

    } else {

        Toastify({
            text: "Por favor, completa todos los campos",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "red",
            }
        }).showToast();

    }
});

btnLogIn.addEventListener('click', () => {

    const usuarioLogin = document.getElementById('txtEmailLogin').value.trim();
    const passwordLogin = document.getElementById('txtcontraseñaLogin').value.trim();

    if (usuarioLogin && passwordLogin) {

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioEncontrado = usuarios.find(user => (user.usuario === usuarioLogin && user.password === passwordLogin));

        if (usuarioEncontrado) {

            localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));

            Toastify({
                text: "Inicio de sesión exitoso. Bienvenido de nuevo!",
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                    background: "green",
                }
            }).showToast();

            window.location.href = "./../index.html";
        } else {

            Toastify({
                text: "Usuario o contraseña incorrectos.",
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                    background: "red",
                }
            }).showToast();

        }
    } else {

        Toastify({
            text: "Por favor, completa todos los campos.",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "red",
            }
        }).showToast();

    }
});
