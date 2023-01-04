const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

//Agrego html con dom
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

    //Por cada objeto array se agrega un div con id
    const boton = document.getElementById(`agregar${producto.id}`)

    //esta funcion ejecuta el agregar el carrito con la id del producto
    boton.addEventListener('click', () => {

        agregarAlCarrito(producto.id)
    })
})

//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {

    //comprueba si el elemento se agrego al carrito
    const existe = carrito.some(prod => prod.id === prodId)

    if (existe) {
        const prod = carrito.map(prod => {
            // map encuentra cual es el que es igual al que está agregado, le suma la cantidad
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else { //en caso de que no se agrega al carrito el otro producto
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }

    actualizarCarrito() //LLAMAMOS A LA FUNCION CADA VEZ QUE SE MODIFICA EL CARRITO
}

// Eliminar del carrito
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos un elemento 
    actualizarCarrito() //LLAMAMOS A LA FUNCION QUE MODIFICA EL CARRITO
}

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = "" //Cada vez que yo llame a actualizarCarrito, lo primero q hago
    //es borrar el nodo. Y despues recorro el array lo actualizo de nuevo y lo rellena con la info
    //actualizado

    // AGREGAR AL MODAL. Recorremos sobre el array de carrito.
    //Por cada producto creamos un div con esta estructura y le hacemos un append al contenedorCarrito (el modal)

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length // actualizamos con la longitud del carrito.

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //Por cada producto que recorro en mi carrito, al acumulador le suma la propiedad precio, con el acumulador empezando en 0.

}