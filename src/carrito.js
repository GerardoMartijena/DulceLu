const mostrarCararito=() => {
    let btnCarrito = document.getElementById('btn');
    let sectionCarrito= document.getElementById('htmlCarrito');
    btnCarrito.addEventListener('click', () => {
        sectionCarrito.classList.remove("ocultar");
        sectionCarrito.classList.add("mostrar");    
    });
};
const ocultarCarrito = () => {
    let btnCerrarCarrito = document.getElementById('btnCerrarCarrito');
    let sectionCarrito= document.getElementById('htmlCarrito');
    btnCerrarCarrito.addEventListener('click', () => {
        sectionCarrito.classList.remove("mostrar");
        sectionCarrito.classList.add("ocultar");    
    });
};

mostrarCararito();
ocultarCarrito();