class Producto{
    constructor(id,imagen,descripcion,precio){
        this.id = id;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

class Tienda{
    constructor(){
        this.productos = {};
    }
    agregarProducto(producto){
        this.productos[producto.id] = producto;
    }
}

const geekStore = new Tienda();
const producto1 = new Producto(1,"../assets/img/figuraNarutoShippudenSasuke.webp","Funko Pop - Naruto", 150);
const producto2 = new Producto(2,"../assets/img/figuraOnePieceGoldRoger.jpg","Funko Pop - Sasuke", 150);
const producto3 = new Producto(3,"../assets/img/figuraOnePieceLuffy.jpg","Funko Pop - Luffy", 170);

geekStore.agregarProducto(producto1);
geekStore.agregarProducto(producto2);
geekStore.agregarProducto(producto3);

function mostrarProductos(productos){
    const contenedor = document.getElementById('container-productos-cards');
    contenedor.innerHTML = '';

    for(let id in productos){
        if(productos.hasOwnProperty(id)){
            const producto = productos[id];

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

            buttonFooter.addEventListener('click', () => agregarProductoAlCarrito(id));

            footerDiv.appendChild(buttonFooter);

            article.appendChild(headerDiv);
            article.appendChild(bodyDiv);
            article.appendChild(footerDiv);

            contenedor.appendChild(article);

        }
    }
}

let carrito = {};
let total = 0;

function agregarProductoAlCarrito(idProducto){
    const producto = geekStore.productos[idProducto];
    if(producto){
        if(!carrito[idProducto]){
            carrito[idProducto] = {descripcion: producto.descripcion, precio: producto.precio, cantidad: 1};
        }else{
            carrito[idProducto].cantidad += 1;
        }
        total += producto.precio;

        let mensajeCarrito = "Productos agregado al carrito:\n";

        for(let id in carrito){
            let item = carrito[id];
            mensajeCarrito += `-${item.descripcion} (Cantidad: ${item.cantidad}, Precio: S/. ${item.precio})\n`;
        }
        mensajeCarrito+= `\nPrecio total: S./${total}`;
        alert(mensajeCarrito);
    }else{
        console.log("error, producto no encontrado.");
    }
}

function eliminarProductoDelCarrito(idProducto){
    const producto = carrito[idProducto];
    if(producto){
        if (total - producto.precio < 0) {
            total = 0;
        } else {
            total -= producto.precio;
        }

        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        } else {
            delete carrito[idProducto];
        }

        console.log(`Producto eliminado: ${producto.descripcion}`);
        console.log(`Nuevo total en carrito: S/.${total}`);
    }else{
        console.log("El producto no se encuentra en el carrito");
    }
}


document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(geekStore.productos);
});