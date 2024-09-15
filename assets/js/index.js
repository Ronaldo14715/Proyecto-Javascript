class Producto {
    constructor(id, imagen, descripcion, precio, cantidad = 1) {
        this.id = id;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

class Tienda {
    constructor() {
        this.productos = {};
    }
    agregarProducto(producto) {
        this.productos[producto.id] = producto;
    }
}

function mostrarProductos() {
    const contenedor = document.getElementById('container-productos-cards');
    contenedor.innerHTML = '';

    fetch('./assets/js/productos.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(productoData => {
                const producto = new Producto(
                    productoData.id,
                    productoData.imagen,
                    productoData.descripcion,
                    productoData.precio
                );

                const article = document.createElement('article');
                article.classList.add('card-producto');

                const headerDiv = document.createElement('div');
                headerDiv.classList.add('card-producto-header');

                const img = document.createElement('img');
                img.classList.add('card-header-img');
                img.src = producto.imagen;
                img.alt = producto.descripcion;

                headerDiv.appendChild(img);

                const bodyDiv = document.createElement('div');
                bodyDiv.classList.add('card-producto-body');

                const descripcionSpan = document.createElement('span');
                descripcionSpan.classList.add('card-body-span-descripcion'); 
                descripcionSpan.textContent = producto.descripcion;

                const precioSpan = document.createElement('span');
                precioSpan.classList.add('card-body-span-precio');
                precioSpan.innerHTML = `S/.${producto.precio}`;

                bodyDiv.appendChild(descripcionSpan);
                bodyDiv.appendChild(precioSpan);

                const footerDiv = document.createElement('div');
                footerDiv.classList.add('card-producto-footer');

                const buttonFooter = document.createElement('button');
                buttonFooter.classList.add('card-footer-button');
                buttonFooter.id = `btn-id-${producto.id}`;
                buttonFooter.innerHTML = `<i class="bi bi-cart-fill"></i> COMPRAR AHORA`;

                buttonFooter.addEventListener('click', () => agregarProductoAlCarrito(producto));

                footerDiv.appendChild(buttonFooter);

                article.appendChild(headerDiv);
                article.appendChild(bodyDiv);
                article.appendChild(footerDiv);

                contenedor.appendChild(article);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

function agregarProductoAlCarrito(producto) {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    if (!usuarioActual) {
        Toastify({
            text: "Debes iniciar sesión para agregar productos al carrito",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "red",
            }
        }).showToast();
        return;
    }

    const carritoKey = `carrito_${usuarioActual.usuario}`;
    let carrito = JSON.parse(localStorage.getItem(carritoKey)) || [];

    let productoExistente = carrito.find(p => p.id === producto.id);

    if (productoExistente) {

        productoExistente.cantidad += 1;

    } else {

        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem(carritoKey, JSON.stringify(carrito));

    Toastify({
        text: "Producto agregado exitosamente",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            background: "green",
        }
    }).showToast();
}

// Mostrar los productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
});
