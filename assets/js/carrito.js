function cargarCarritoParaMostrar() {
    const carritoGuardado = localStorage.getItem('carrito');
    const contenedor = document.getElementById('container-carrito-productos');
    
    if(carritoGuardado) {
        const carrito = JSON.parse(carritoGuardado);
        
        // Contar la cantidad de productos únicos
        const cantidadProductosUnicos = Object.keys(carrito).length;

        // Mostrar la cantidad de productos únicos en el contenedor
        contenedor.textContent = `Cantidad de productos únicos en el carrito: ${cantidadProductosUnicos}`;
    } else {
        contenedor.textContent = "No hay productos en el carrito.";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoParaMostrar();
});
