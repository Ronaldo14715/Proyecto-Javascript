class Producto {
    constructor(id, imagen, descripcion, precio) {
        this.id = id;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.precio = precio;
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

    fetch('/assets/js/productos.json')
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

                buttonFooter.addEventListener('click', () => agregarProductoAlCarrito(producto.id));

                footerDiv.appendChild(buttonFooter);

                article.appendChild(headerDiv);
                article.appendChild(bodyDiv);
                article.appendChild(footerDiv);

                contenedor.appendChild(article);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}



document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
});
