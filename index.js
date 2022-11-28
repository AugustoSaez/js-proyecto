alert("Bienvenidos a Concesionaria Kawasaki Mza!")
nombre = prompt("Como te llamas?");
let fecha = parseInt(prompt("Bienvenido seas " + nombre + " por favor anota en que año naciste"));

let currentTime = new Date()
let edades = currentTime.getFullYear()
menu = "";
let sumaNumeros = edades - fecha;

Moto300cc = "Ninja300";
Moto600cc = "ZX6R";
Moto1000cc = "ZX10R";


const CostoMoto300cc = 5000;
const CostoMoto600cc = 10000;
const CostoMoto1000cc = 15000;

function ivaA(peso) {
    let impuesto = ((CostoMoto300cc * .21) + CostoMoto300cc);
    return impuesto;
}

function ivaB(peso) {
    let impuesto = ((CostoMoto600cc * .21) + CostoMoto600cc);
    return impuesto;
}

function ivaC(peso) {
    let impuesto = ((CostoMoto1000cc * .21) + CostoMoto1000cc);
    return impuesto;
}


if (sumaNumeros >= 18) {
    alert("Tienes " + sumaNumeros + " años y es la edad perfecta para comprar una moto!");
    let menu = prompt("Gracias " + nombre + " elige por favor la cilindrada que te gustaria.\n 1. 300cc\n 2. 600cc\n 3. 1000cc\n Presiona S para salir.");

    while (menu != "S") {
        switch (menu) {
            case "1":
                alert("Elegiste la " + Moto300cc + ". Tiene un costo de $" + CostoMoto300cc);
                let compraA = prompt("Escribe C para comprar " + Moto300cc);
                if (compraA === "C") {
                    let totalA = ivaA(CostoMoto300cc);
                    alert("Precio total más iva es de $" + totalA);
                } else {
                    compraA = alert("Si la quieres comprar? Escribe C")
                }
                break;
            case "2":
                alert("Elegiste la " + Moto600cc + ". Tiene un costo de $" + CostoMoto600cc);
                let compraB = prompt("Escribe C para comprar " + Moto600cc);
                if (compraB === "C") {
                    let totalB = ivaB(CostoMoto600cc);
                    alert("Precio total más iva es de $" + totalB);
                } else {
                    compraB = alert("Si la quieres comprar? Escribe C")
                }
                break;
            case "3":
                alert("Elegiste la " + Moto1000cc + ". Tiene un costo de $" + CostoMoto1000cc);
                let compraC = prompt("Escribe C para comprar " + Moto1000cc);
                if (compraC === "C") {
                    let totalC = ivaC(CostoMoto1000cc);
                    alert("Precio total más iva es de $" + totalC);
                } else {
                    compraB = alert("Si la quieres comprar? Escribe C")
                }
                break;
            default:
                alert("Número inválido. elige por favor la cilindrada que te gustaria.\n 1. 300cc\n 2. 600cc\n 3. 1000cc\n Presiona S para salir.");
                break;
        }
        menu = prompt("Gracias " + nombre + " disfruta de tu compra! \n Presiona S para salir.");
    }

} else {
    alert("No eres mayor de edad. En unos años podras comprar tu moto, tiempo al tiempo.");

}