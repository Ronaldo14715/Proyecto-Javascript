console.log("Binvenidos a GEEK STORE");

class Producto{

    constructor(id,nombre,precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
    mostrarDatos(){
        return `ID: ${this.id}, Nombre: ${this.nombre}, precio: S/.${this.precio}`;
    }

}
class Tienda{

    constructor(){
        this.productos = {};
    }

    agregarProducto(producto){
        this.productos[producto.id] = producto;
    }

    mostrarProductos(){
        let productosString = "PRODUCTOS DISPONIBLES: \n";

        for(let i in this.productos){
           productosString += `${this.productos[i].mostrarDatos()}\n`;
        }
        return productosString;
    }
}

const geekStore = new Tienda();
const producto1 = new Producto(1, "Funko Pop - Naruto", 150);
const producto2 = new Producto(2, "Funko Pop - Sasuke", 150);
const producto3 = new Producto(3, "Funko Pop - Luffy", 170);
const producto4 = new Producto(4, "Funko Pop - Kaido", 130);

geekStore.agregarProducto(producto1);
geekStore.agregarProducto(producto2);
geekStore.agregarProducto(producto3);
geekStore.agregarProducto(producto4);

function agregarProductoAlCarrito(){
    let carrito = {};
    let total = 0;
    let idProducto;

    const productosDisponibles = geekStore.mostrarProductos();
    while(true){
        const productosDisponibles = geekStore.mostrarProductos();
        idProducto = prompt(`${productosDisponibles}\nPor favor, ingrese el ID del producto que desea agregar al carrito o escriba 'fin' para terminar:`);

        if (idProducto.toLowerCase() == "fin") {
            break;
        }else{
            idProducto = parseInt(idProducto);
            if (geekStore.productos[idProducto]) {
                carrito[idProducto] = geekStore.productos[idProducto];
                total += geekStore.productos[idProducto].precio;
                alert(`Producto agregado al carrito: ${geekStore.productos[idProducto].mostrarDatos()}`);
            } else {
                alert("Producto no encontrado. Por favor, ingrese un ID válido.");
            }
        }
    }
    alert("Carrito finalizado. Precio total: S/." + total);
}
agregarProductoAlCarrito();