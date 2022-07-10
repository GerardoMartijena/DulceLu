const mostrarProductos=()=>{
    const articleTienda = document.getElementById('productos');
    for (const producto of productos) {
        const section= document.createElement('section');
        section.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${producto.image}" class="card-img-top">
        <div class="card-body">
        <h2>${producto.name}</h2>
        <p class="card-description">${producto.description}</p>
        <p>${producto.price}</p>
        <button id="${producto.id}" class="btn btn-primary">Agregar</button>
        </div>
        `;
        articleTienda.appendChild(section);
    }
}
mostrarProductos();