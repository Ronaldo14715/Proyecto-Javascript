function mostrarCarrito() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const contenedor = document.getElementById('container-carrito');

    contenedor.innerHTML = '';
    const containerCarritoProductos = document.createElement('div');
    containerCarritoProductos.classList.add('container-carrito-productos');

    let carrito = [];
    let cantidadProductosUnicos = 0;
    let total = 0;

    if (usuarioActual) {
        const carritoGuardado = localStorage.getItem(`carrito_${usuarioActual.usuario}`);

        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            cantidadProductosUnicos = carrito.length;
        }
    }

    const carritoProductos = document.createElement('div');
    carritoProductos.classList.add('carrito-productos');

    const carritoContador = document.createElement('div');
    carritoContador.classList.add('carrito-contador');
    const spanCantidadUnico = document.createElement('span');
    spanCantidadUnico.textContent = `Cesta de compra (${cantidadProductosUnicos})`;
    carritoContador.appendChild(spanCantidadUnico);
    containerCarritoProductos.appendChild(carritoContador);

    if (cantidadProductosUnicos > 0) {
        carrito.forEach(producto => {
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

            const descripcionP = document.createElement('span');
            descripcionP.textContent = producto.descripcion;

            const spanPrecio = document.createElement('span');
            spanPrecio.textContent = `S/. ${producto.precio.toFixed(2)}`;

            const spanCantidad = document.createElement('span');
            spanCantidad.textContent = `Cantidad: ${producto.cantidad}`;

            const spanEnvio = document.createElement('span');
            spanEnvio.classList.add('carrito-envio');
            spanEnvio.textContent = "Envío gratis";

            const divButtonCantidad = document.createElement('div');
            divButtonCantidad.style.width = "100%";
            divButtonCantidad.classList.add('d-flex','justify-content-evenly','my-2');

            const disminuirBtn = document.createElement('button');
            disminuirBtn.textContent = '-';
            disminuirBtn.classList.add('btn','btn-warning');
            disminuirBtn.onclick = () => disminuirCantidad(producto.id);

            const aumentarBtn = document.createElement('button');
            aumentarBtn.textContent = '+';
            aumentarBtn.classList.add('btn','btn-primary');
            aumentarBtn.onclick = () => aumentarCantidad(producto.id);

            divButtonCantidad.appendChild(disminuirBtn);
            divButtonCantidad.appendChild(aumentarBtn);

            // Botón para eliminar producto
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.classList.add('btn','btn-danger');
            
            eliminarBtn.onclick = () => eliminarProducto(producto.id);

            carritoProductoDivDescripcion.appendChild(descripcionP);
            carritoProductoDivDescripcion.appendChild(spanPrecio);
            carritoProductoDivDescripcion.appendChild(spanCantidad);
            carritoProductoDivDescripcion.appendChild(spanEnvio);
            carritoProductoDivDescripcion.appendChild(divButtonCantidad);
            carritoProductoDivDescripcion.appendChild(eliminarBtn);

            productoDiv.appendChild(carritoProductoDivImg);
            productoDiv.appendChild(carritoProductoDivDescripcion);

            carritoProductos.appendChild(productoDiv);
        });
    } else {
        const carritoVacioDiv = document.createElement('div');
        const carritoVacioP = document.createElement('p');
        carritoVacioDiv.classList.add('carrito-vacio');
        carritoVacioP.textContent = 'SIN PRODUCTOS AGREGADOS';
        carritoVacioDiv.appendChild(carritoVacioP);
        carritoProductos.appendChild(carritoVacioDiv);
    }

    containerCarritoProductos.appendChild(carritoProductos);

    const containerCarritoPagar = document.createElement('div');
    containerCarritoPagar.classList.add('container-carrito-pagar');

    const carritoPagarTotal = document.createElement('div');
    carritoPagarTotal.classList.add('carrito-pagar-total');

    const spanTextResumen = document.createElement('span');
    spanTextResumen.textContent = 'Resumen';
    const spanTotal = document.createElement('span');
    spanTotal.textContent = `Total: S/.${total}`;

    carritoPagarTotal.appendChild(spanTextResumen);
    carritoPagarTotal.appendChild(spanTotal);

    const carritoPagarDivButton = document.createElement('div');
    carritoPagarDivButton.classList.add('carrito-pagar-button');

    const pagarButton = document.createElement('button');
    pagarButton.textContent = "PAGAR";
    pagarButton.disabled = total === 0;
    pagarButton.classList.add('btn','btn-secondary')
    carritoPagarDivButton.appendChild(pagarButton);

    containerCarritoPagar.appendChild(carritoPagarTotal);
    containerCarritoPagar.appendChild(carritoPagarDivButton);

    contenedor.appendChild(containerCarritoProductos);
    contenedor.appendChild(containerCarritoPagar);
}

function disminuirCantidad(productoId) {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!usuarioActual) return;

    let carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioActual.usuario}`)) || [];

    carrito = carrito.map(producto => {
        if (producto.id === productoId) {
            producto.cantidad -= 1;
            if (producto.cantidad <= 0) {
                return null; 
            }
        }
        return producto;
    }).filter(producto => producto !== null);
    guardarCarrito(usuarioActual.usuario, carrito);
    mostrarCarrito();
}

function aumentarCantidad(productoId) {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!usuarioActual) return;

    let carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioActual.usuario}`)) || [];

    carrito = carrito.map(producto => {
        if (producto.id === productoId) {
            producto.cantidad += 1;
        }
        return producto;
    });

    guardarCarrito(usuarioActual.usuario, carrito);
    mostrarCarrito();
}

function eliminarProducto(productoId) {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!usuarioActual) return;

    let carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioActual.usuario}`)) || [];

    Swal.fire({
        title: '¿Estas seguro?',
        text: '¿Quieres eliminar este producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar producto',
        cancelButtonText: 'No'
    }).then((result) => {

        if(result.isConfirmed){

            Swal.fire(
                'Eliminado!',
                '',
                'success'
            )

            carrito = carrito.filter(producto => producto.id !== productoId); 
            guardarCarrito(usuarioActual.usuario, carrito);
            mostrarCarrito();

        }else{

            Swal.fire(
                '¡Cancelado!',
                '',
                'info'
            );
        }
    });

}

function guardarCarrito(usuario, carrito) {
    if (carrito.length === 0) {
        localStorage.removeItem(`carrito_${usuario}`);
    } else {
        localStorage.setItem(`carrito_${usuario}`, JSON.stringify(carrito));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
});