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
const producto1 = new Producto(1,"../assets/img/figuraNarutoShippudenSasuke.webp","Funko Pop - Sasuke", 150);
const producto2 = new Producto(2,"../assets/img/figuraOnePieceGoldRoger.jpg","Funko Pop - Gol D Roger", 150);
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

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if(carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

function guardarCarrito(){
    localStorage.setItem('carrito',JSON.stringify(carrito));
}

let carrito = {};
let total = 0;

function agregarProductoAlCarrito(idProducto){
    const producto = geekStore.productos[idProducto];
    if(producto){
        if(!carrito[idProducto]){
            carrito[idProducto] = {descripcion: producto.descripcion, precio: producto.precio,imagen: producto.imagen, cantidad: 1};
        }else{
            carrito[idProducto].cantidad += 1;
        }
        total += producto.precio;

        let mensajeCarrito = `Producto agregado al carrito:\n${producto.descripcion}`;

        
        Toastify({
            text: mensajeCarrito,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to left, #fff, #808080 )", color: "#171717",
            },
            onClick: function(){} // Callback after click
          }).showToast();

        guardarCarrito();
    }else{
        console.log("error, producto no encontrado.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(geekStore.productos);
    cargarCarrito();
});