const stockProductos = [{
        id: 1,
        nombre: "Aceite Motul-3000",
        cantidad: 1,
        desc: "Aceite ideal para motos 50cc-150cc",
        precio: 1500,
        img: "./img/motul3000.jpg",
    },
    {
        id: 2,
        nombre: "Motul-5100",
        cantidad: 1,
        desc: "Aceite ideal para motos 150cc-350cc",
        precio: 2000,
        img: "./img/motul5100.jpg",
    },
    {
        id: 3,
        nombre: "Motul-7100",
        cantidad: 1,
        desc: "Aceite ideal para motos 350cc-650cc",
        precio: 3000,
        img: "./img/motul7100.jpg",
    },
    {
        id: 4,
        nombre: "Motul-2T",
        cantidad: 1,
        desc: "Aceite ideal para motos 2 Tiempos",
        precio: 2500,
        img: "./img/motul2t.jpg",
    },
    {
        id: 5,
        nombre: "Ipone-Katana",
        cantidad: 1,
        desc: "Aceite ideal para motos 650cc-850cc",
        precio: 4000,
        img: "./img/ipone-katana.jpg",
    },
    {
        id: 6,
        nombre: "Ipone-Katana-Gold",
        cantidad: 1,
        desc: "Aceite ideal para motos 850cc-1300cc",
        precio: 5000,
        img: "./img/ipone-katana-premium.jpg",
    },
    {
        id: 7,
        nombre: "Filtro de Aceite",
        cantidad: 1,
        desc: "Filtro de aceite ideal para motos 50cc-150cc",
        precio: 500,
        img: "./img/filtro-barato.jpg",
    },
    {
        id: 8,
        nombre: "Filtro de Aceite",
        cantidad: 1,
        desc: "Filtro de aceite ideal para motos 250cc-650cc",
        precio: 1500,
        img: "./img/filtro-caro.jpg",
    },
    {
        id: 9,
        nombre: "Filtro de Aire",
        cantidad: 1,
        desc: "Filtro de aire ideal para motos 50cc-250cc",
        precio: 500,
        img: "./img/aire-barato.jpg",
    },
    {
        id: 10,
        nombre: "Filtro de Aire",
        cantidad: 1,
        desc: "Filtro de aire ideal para motos 250cc-650cc",
        precio: 850,
        img: "./img/aire-medio.jpg",
    },
    {
        id: 11,
        nombre: "Filtro de Aire",
        cantidad: 1,
        desc: "Filtro de aire ideal para motos 650cc-1300cc",
        precio: 1300,
        img: "./img/aire-caro.jpg",
    },
    {
        id: 12,
        nombre: "Filtro de Nafta",
        cantidad: 1,
        desc: "Filtro de nafta ideal para todas las motos",
        precio: 1250,
        img: "./img/filtro-nafta.jpg",
    },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
});
if (formulario) {
    formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
        carrito.length = [];
        mostrarCarrito();
    });
}

if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: "¡Tu carrito está vacio!",
                text: "Compra algo para continuar con la compra",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } else {
            location.href = "compra.html";
        }
    });
}

stockProductos.forEach((prod) => {
    const {
        id,
        nombre,
        precio,
        desc,
        img,
        cantidad
    } = prod;
    if (contenedor) {
        contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">Precio: ${precio}</p>
            <p class="card-text">Descripcion: ${desc}</p>
            <p class="card-text">Cantidad: ${cantidad}</p>
            <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
            </div>
    </div>
    `;
    }
});

const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)

    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === id)
        carrito.push(item)
    }
    mostrarCarrito()

};

const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
        modalBody.innerHTML = "";
        carrito.forEach((prod) => {
            const {
                id,
                nombre,
                precio,
                desc,
                img,
                cantidad
            } = prod;
            console.log(modalBody);
            modalBody.innerHTML += `
        <div class="modal-contenedor">
            <div>
                <img class="img-fluid img-carrito" src="${img}"/>
            </div>
            <div>
                <p>Producto: ${nombre}</p>
                <p>Precio: ${precio}</p>
                <p>Cantidad :${cantidad}</p>
                <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
            </div>
        </div>
        
        `;

        });
    }

    if (carrito.length === 0) {
        modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
    }
    carritoContenedor.textContent = carrito.length;

    if (precioTotal) {
        precioTotal.innerText = carrito.reduce(
            (acc, prod) => acc + prod.cantidad * prod.precio,
            0
        );
    }

    guardarStorage();
};

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
    const juegoId = id;
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    mostrarCarrito();
}

function procesarPedido() {
    carrito.forEach((prod) => {
        const listaCompra = document.querySelector("#lista-compra tbody");
        const {
            id,
            nombre,
            precio,
            img,
            cantidad
        } = prod;
        if (listaCompra) {
            const row = document.createElement("tr");
            row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>${precio * cantidad}</td>
            `;
            listaCompra.appendChild(row);
        }
    });
    totalProceso.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
    );
}

function enviarCompra(e) {
    e.preventDefault()
    const cliente = document.querySelector('#cliente').value
    const email = document.querySelector('#correo').value

    if (email === '' || cliente == '') {
        Swal.fire({
            title: "¡Debes completar tu email y nombre!",
            text: "Rellena el formulario",
            icon: "error",
            confirmButtonText: "Aceptar",
        })
    } else {

        const btn = document.getElementById('button');

        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_qxwi0jn';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Finalizar compra';
                alert('Correo enviado!');
            }, (err) => {
                btn.value = 'Finalizar compra';
                alert(JSON.stringify(err));
            });

        const spinner = document.querySelector('#spinner')
        spinner.classList.add('d-flex')
        spinner.classList.remove('d-none')

        setTimeout(() => {
            spinner.classList.remove('d-flex')
            spinner.classList.add('d-none')
            formulario.reset()

            const alertExito = document.createElement('p')
            alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
            alertExito.textContent = 'Compra realizada correctamente'
            formulario.appendChild(alertExito)

            setTimeout(() => {
                alertExito.remove()
            }, 3000)


        }, 3000)
    }
    localStorage.clear()

}