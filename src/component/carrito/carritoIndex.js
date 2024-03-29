let total=0;
let carrito=[];
let listaProductos=[];

fetch("src/data/productos.json")
    .then(response => response.json())
    .then(data=>{
        listaProductos=data
    }
    );

export const agregarAlCarro=(id)=>{
            const pushNuevoProduto=()=>{
                let productoNuevo={
                    ...producto,
                    cantidad:1
                }
                carrito.push(productoNuevo);
            };
        
            let producto=listaProductos.find(articulos=>articulos.id===id);
            let productoEnCarro=carrito.find(articulos=>articulos.id===id);
            if(producto.stock==0){
                swal.fire({
                    title:`Alerta el producto que quiere comprar en este momento no se encuentra en stock`,
                    icon:`warning`,
                    width:600,
                    padding:`3em`,
                    showConfirmButton:false,
                    timer:3000
                })
            }
            else{
                productoEnCarro ? productoEnCarro.cantidad++ : pushNuevoProduto();
                producto.stock--;
                listaProductos.push(producto);
                Toastify({
                    text:`${producto.name} Agregado `,
                    duration:2000,
                    gravity:`bottom`,
                    position:`left`
                }).showToast();
            }
};

export const calcularTotal=()=>{
    total=0;
    carrito.forEach(producto=>{
        total+=(producto.cantidad*producto.price);
    })
    return Math.round(total);
};

export const verCarritosGuardados=()=>{
    const btnCarritosGuardados=document.getElementById(`carritosGuardados`);
    btnCarritosGuardados.addEventListener("click",()=>{
        let articleCarrito=document.getElementById('productosCarrito');
        articleCarrito.innerHTML = "";
        let btns = document.createElement(`div`);
        btns.classList.add("btnsLStorage");
        btns.innerHTML=`
        <button id="btnVolver" class="btn btn-primary">Volver a mi carrito</button>
        <button id="btnVaciarLs" class="btn btn-primary btnEliminar">Borrar Carritos</button>
        `;
        articleCarrito.appendChild(btns);
        let btnVolver=document.getElementById('btnVolver');
        btnVolver.addEventListener("click",()=>{
            cardsCarrito();
        });
        let btnVaciar=document.getElementById('btnVaciarLs');
        btnVaciar.addEventListener("click",()=>{
            localStorage.clear();
            swal.fire({
                title:`Se han borrado los Carritos Guardados`,
                icon:`success`,
                showCancelButton:false,
            })
            cardsCarrito();
        });
        for(let i=1;i<=localStorage.length;i++){
            let tituloSection=document.createElement('div');
            tituloSection.classList.add("carritoLStorage");
            tituloSection.innerHTML=`
            <h4>Carrito numero ${i}</h4>
            `
            articleCarrito.appendChild(tituloSection);
            let carritoLStorage=JSON.parse(localStorage.getItem(`carrito${i}`));
            for (const producto of carritoLStorage){
                let sectionCarrito=document.createElement("h5");
                sectionCarrito.innerHTML=`${producto.name}
                `;
                tituloSection.appendChild(sectionCarrito);
            };
        };
    });
}

export const cardsCarrito=()=>{
    const carritoVacio=()=>{

        let sectionCarrito=document.createElement("section");
        
        sectionCarrito.innerHTML=`
        <br>
        <h4>El carrito esta vacio</h4>
        `;
        articleCarrito.appendChild(sectionCarrito);
        verCarritosGuardados();
    };
    const dibujarCarrito=()=>{
        
        const restarCantidad=(btnRestarId) =>{
            const btnRestar=document.getElementById(`btnRestar${btnRestarId}`);
                btnRestar.addEventListener('click', () => {
                    const producto = listaProductos.find((producto) => producto.id === btnRestarId);
                    const item = carrito.find((productoCarrito) => productoCarrito.id === btnRestarId);
                    if(item.cantidad>1){
                        item.cantidad--;
                        producto.stock++;
                        listaProductos.push(producto);
                        calcularTotal();
                        cardsCarrito();
                        Toastify({
                            text:`Producto Eliminado`,
                            duration:2000,
                            gravity:`bottom`,
                            position:`right`,
                        }).showToast();
                    }
                    else{
                        swal.fire({
                            title:`Quieres eliminar este producto`,
                            icon:`warning`,
                            showCancelButton:true,
                            confirmButtonText:`Eliminar este producto`,
                            cancelButtonText:`cancelar`
                        }).then((result)=>{
                            if(result.isConfirmed){
                                const indice=carrito.indexOf(item)
                                carrito.splice(indice,1);
                                producto.stock++;
                                listaProductos.push(producto);
                                calcularTotal();
                                cardsCarrito();
                                swal.fire({
                                    title:`Producto Eliminado`,
                                    icon:`success`,
                                    showConfirmButton:false,
                                })
                            }
                        });
                    }
                });
        };
        
        const vaciarCarrito=()=>{
            const btnVaciarCarrito=document.getElementById("btnVaciarCarrito");
            btnVaciarCarrito.addEventListener("click",()=>{
                swal.fire({
                    title:`Quieres vaciar el carrito`,
                    icon:`warning`,
                    showCancelButton:true,
                    confirmButtonText:`vaciar carrito`,
                    cancelButtonText:`cancelar`
                }).then((result)=>{
                    carrito.forEach(productoCarrito => {
                        let producto = listaProductos.find((producto)=>producto.id === productoCarrito.id);
                        producto.stock = productoCarrito.cantidad;
                    });
                    carrito.length=0;
                    calcularTotal();
                    cardsCarrito();
                })
                
            });
        };
        const guardarCarrito=()=>{
            let numCarrito=localStorage.length+1;
            const botonGuardar=document.getElementById(`guardarCarrito`);
            botonGuardar.addEventListener("click",()=>{
                localStorage.setItem(`carrito${numCarrito}`,JSON.stringify(carrito));
                Toastify({
                    text:`carrito ${numCarrito} guardado `,
                    duration:2000,
                    gravity:`bottom`,
                    position:`right`
                }).showToast();
            });
        };
        articleCarrito.innerHTML = "";
        let btnsCarrito = document.createElement('div');
        btnsCarrito.classList.add('btnCarrito');
        btnsCarrito.innerHTML=`
        <button id="btnVaciarCarrito" class="btn btn-primary btnEliminar" type="submit">Vaciar Carrito</button>
        <button id="guardarCarrito" class="btn btn-primary btnEliminar" type="submit">Guardar Carrito</button>
        <button id="carritosGuardados" class="btn btn-primary btnEliminar" type="submit">Ver Carritos Guardados</button>
        <h5>Total: ${total}</h5>
        `;
        articleCarrito.appendChild(btnsCarrito); 
        for (const producto of carrito) {
        let sectionCarrito=document.createElement("section");
        sectionCarrito.innerHTML=`
        <br>
        <div class="card" style="width: 18rem;">
        <img src="${producto.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Producto:${producto.name}</h5>
        <p class="card-text">$${producto.price}</p>
        <p class="card-text">Cantidada:${producto.cantidad}</p>
        <button id="btnEliminar${producto.id}" class="btn btn-primary btnEliminar" type="submit">X</button>
        <button id="btnRestar${producto.id}" class="btn btn-primary btnEliminar" type="submit">-</button>
        </div>
        </div>
        `;
        articleCarrito.appendChild(sectionCarrito);
        eliminarDelCarrito(producto.id);
        restarCantidad(producto.id);
        vaciarCarrito();
        verCarritosGuardados();
        }
        guardarCarrito();
    };
    let articulosEnCarrito=carrito.length;
    let articleCarrito=document.getElementById('productosCarrito');
    articleCarrito.innerHTML='';
    let btnsCarrito = document.createElement('div');
        btnsCarrito.classList.add('btnCarrito');
        btnsCarrito.innerHTML=`
        <button id="btnVaciarCarrito" class="btn btn-primary btnEliminar" type="submit">Vaciar Carrito</button>
        <button id="guardarCarrito" class="btn btn-primary btnEliminar" type="submit">Guardar Carrito</button>
        <button id="carritosGuardados" class="btn btn-primary btnEliminar" type="submit">Ver Carritos Guardados</button>
        <h5>Total: ${total}</h5>
        `;
        articleCarrito.appendChild(btnsCarrito); 
    articulosEnCarrito==0 ? carritoVacio() : dibujarCarrito();
}

export const eliminarDelCarrito=(btnEliminarId)=>{
    const btnEliminar=document.getElementById(`btnEliminar${btnEliminarId}`)
    btnEliminar.addEventListener("click",() =>{
        swal.fire({
            title:`Quieres eliminar este producto`,
            icon:`warning`,
            showCancelButton:true,
            confirmButtonText:`Eliminar este producto`,
            cancelButtonText:`cancelar`
        }).then((result)=>{
            if(result.isConfirmed){
                const producto = listaProductos.find((producto)=>producto.id === btnEliminarId);
                const item=carrito.find((producto)=>producto.id===btnEliminarId);
                const indice=carrito.indexOf(item)
                carrito.splice(indice,1);
                producto.stock+=item.cantidad;
                listaProductos.push(producto);
                calcularTotal();
                cardsCarrito();
            }
        });
    });

};

export const mostrarCararito=() => {
    let btnCarrito = document.getElementById('btn');
    let sectionCarrito= document.getElementById('htmlCarrito');
    btnCarrito.addEventListener('click', () => {
        sectionCarrito.classList.remove("ocultar");
        sectionCarrito.classList.add("mostrar");    
    });
};

export const ocultarCarrito = () => {
    let btnCerrarCarrito = document.getElementById('btnCerrarCarrito');
    let sectionCarrito= document.getElementById('htmlCarrito');
    btnCerrarCarrito.addEventListener('click', () => {
        sectionCarrito.classList.remove("mostrar");
        sectionCarrito.classList.add("ocultar");    
    });
};

export const leerBoton=(botonAgregarId)=>{
    let botonAgregar=document.getElementById(`${botonAgregarId}`);
        botonAgregar.addEventListener('click',()=>{
            agregarAlCarro(botonAgregarId);
            calcularTotal();
            cardsCarrito();
        })
}