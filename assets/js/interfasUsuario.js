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
    //NAV
});
