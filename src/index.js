import{mostrarProductos, obtenerProducto} from "./component/tienda/mostrarProductos.js";
import{mostrarCararito} from "./component/carrito/carritoIndex.js";
import{ocultarCarrito} from "./component/carrito/carritoIndex.js";

document.addEventListener("DOMContentLoaded",() => {
    obtenerProducto();
});
mostrarCararito();
ocultarCarrito();