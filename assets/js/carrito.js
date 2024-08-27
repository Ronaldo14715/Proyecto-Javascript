function mostrarCarrito(){
    const carritoGuardado = localStorage.getItem('carrito');
    const contenedor = document.getElementById('container-carrito');

    if(carritoGuardado){
        const carrito = JSON.parse(carritoGuardado);
        const cantidadProductosUnicos = Object.keys(carrito).length;
        let total = 0;
        
        contenedor.innerHTML = '';

        const containerCarritoProductos = document.createElement('div'); 
        containerCarritoProductos.classList.add('container-carrito-productos');

        const carritoProductos = document.createElement('div');
        carritoProductos.classList.add('carrito-productos');

        const carritoContador = document.createElement('div');
        carritoContador.classList.add('carrito-contador');
        const spanCantidadUnico = document.createElement('span');
        spanCantidadUnico.textContent = `Cesta de compra ${cantidadProductosUnicos}`;
        carritoContador.appendChild(spanCantidadUnico);
        containerCarritoProductos.appendChild(carritoContador);

        Object.keys(carrito).forEach(id => {
            const producto = carrito[id];
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');

            // IMAGEN
            const carritoProductoDivImg = document.createElement('div');
            carritoProductoDivImg.classList.add('carrito-productos-img');
            const productoImg = document.createElement('img');
            productoImg.src = producto.imagen;
            productoImg.alt = producto.descripcion;
            carritoProductoDivImg.appendChild(productoImg);

            // DESCRIPCIÓN
            const carritoProductoDivDescripcion = document.createElement('div');
            carritoProductoDivDescripcion.classList.add('carrito-productos-descripcion');

            const descripcionP = document.createElement('p');
            descripcionP.textContent = producto.descripcion;

            const spanPrecio = document.createElement('span');
            spanPrecio.textContent = `S/. ${producto.precio.toFixed(2)}`;

            const spanEnvio = document.createElement('span');
            spanEnvio.classList.add('carrito-envio');
            spanEnvio.textContent = "Envio gratis";

            carritoProductoDivDescripcion.appendChild(descripcionP);
            carritoProductoDivDescripcion.appendChild(spanPrecio);
            carritoProductoDivDescripcion.appendChild(spanEnvio);

            productoDiv.appendChild(carritoProductoDivImg);
            productoDiv.appendChild(carritoProductoDivDescripcion);

            carritoProductos.appendChild(productoDiv);
            containerCarritoProductos.appendChild(carritoProductos);
        });

        const containerCarritoPagar = document.createElement('div');
        containerCarritoPagar.classList.add('container-carrito-pagar');

        const carritoPagarTotal = document.createElement('div');
        carritoPagarTotal.classList.add('carrito-pagar-total');

        const spanTextResumen = document.createElement('span');
        spanTextResumen.textContent = 'Resumen';
        const spanTotal = document.createElement('span');
        spanTotal.textContent = `Total: S/.${total.toFixed(2)}`;

        carritoPagarTotal.appendChild(spanTextResumen);
        carritoPagarTotal.appendChild(spanTotal);

        const carritoPagarDivButton = document.createElement('div');
        carritoPagarDivButton.classList.add('carrito-pagar-button');

        const pagarButton = document.createElement('button');
        pagarButton.textContent = "PAGAR";
        carritoPagarDivButton.appendChild(pagarButton);

        containerCarritoPagar.appendChild(carritoPagarTotal);
        containerCarritoPagar.appendChild(carritoPagarDivButton);

        contenedor.appendChild(containerCarritoProductos);
        contenedor.appendChild(containerCarritoPagar);
    } else {
        console.log("No hay productos en el carrito.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
});
