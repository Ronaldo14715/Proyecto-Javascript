document.addEventListener('DOMContentLoaded', () => {
    //NAV
    const abrirNav = document.querySelector('#abrir');
    const cerrarNav = document.querySelector('#cerrar');
    const nav = document.querySelector('#containerNav');

    if (abrirNav && cerrarNav && nav) {
        abrirNav.addEventListener('click', () => {
            nav.classList.add('visible');
        });

        cerrarNav.addEventListener('click', () => {
            nav.classList.remove('visible');
        });
    } else {
        console.error('Error');
    }

    //LOGIN - LOGOUT

    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    if (usuarioActual) {

        loginLink.style.display = 'none';
        logoutLink.style.display = 'inline';
        logoutLink.textContent = `CERRAR SESIÓN (${usuarioActual.usuario})`;
    } else {

        loginLink.style.display = 'inline';
        logoutLink.style.display = 'none';
    }

    logoutLink.addEventListener('click', function (event) {
        
        event.preventDefault(); 
        
        Swal.fire({
            title: '¿Estas seguro?',
            text: '¿Quieres cerrar sesion?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'No, permanecer'
        }).then((result) => {
            if(result.isConfirmed){

                localStorage.removeItem('usuarioActual');
                Swal.fire(
                    '¡Sesión cerrada!',
                    'Has cerrado sesión correctamente.',
                    'success'
                ).then(() => {
                    window.location.href = "./pages/login.html";
                });

            }else{

                Swal.fire(
                    '¡Cancelado!',
                    'Tu sesión sigue activa.',
                    'info'
                );
            }

        });

    });

});
