import { cardsCarrito } from "../carrito/carritoIndex.js";
import { leerBoton } from "../carrito/carritoIndex.js";

export const obtenerProducto = async () =>{
    try{
        const response = await fetch("src/data/productos.json");
        const data = await response.json();
        mostrarProductos(data);
    }
    catch(error){
        console.log(error);
    }
}

export const mostrarProductos=(listaProductos)=>{
    const contenedorProductos = document.getElementById('productos');
        listaProductos.forEach(producto => {
            let card=document.createElement("section");
            card.innerHTML=`
            <div class="card" style="width: 18rem;">
            <img src="${producto.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title ">${producto.name}</h5>
            <p class="card-description">${producto.description}</p>
            <p class="card-text">${producto.price}$</p>
            <button id="${producto.id}" class="btn btn-primary agregar">Agregar al Carrito</button>
            </div>
            </div>
            </div>
            `;
            contenedorProductos.appendChild(card);
            leerBoton(producto.id);
        });
        cardsCarrito();
    };

