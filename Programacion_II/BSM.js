const readlineSync = require('readline-sync');

let cantidadDestinos = {};
let pesoTotalMaletas = 0;
let pesoTotalHombres = 0;
let pesoTotalMujeres = 0;
let cantidadHombres = 0;
let cantidadMujeres = 0;
let maletaMayorPeso = { peso: 0 };
let descuentoTotal = 0;

const DESTINOS_PROMO = ['Cali'];

function calcularDescuento(total, destino) {
    if (DESTINOS_PROMO.includes(destino)) {
        return total * 0.15;
    }
    return 0;
}

function calcularCostoMaleta(peso, destino) {
    const costoBase = 20000;
    const pesoBase = 23;
    const costoAdicional = 5000;

    let costoTotal = 0;
    if (peso <= pesoBase) {
        costoTotal = costoBase;
    } else {
        const pesoAdicional = peso - pesoBase;
        const costoAdicionalTotal = pesoAdicional * costoAdicional;
        costoTotal = costoBase + costoAdicionalTotal;
    }

    // Aplicar descuento si el destino tiene promoción
    if (DESTINOS_PROMO.includes(destino)) {
        const descuento = calcularDescuento(costoTotal, destino);
        costoTotal -= descuento;
        descuentoTotal += descuento;
    }

    return costoTotal;
}

function registrarMaleta() {
    const origen = readlineSync.question(`Ingrese el origen de la maleta: `);
    const numeroVuelo = readlineSync.question(`Ingrese el número de vuelo: `);
    const destino = readlineSync.question(`Ingrese el destino de la maleta: `);
    const peso = +readlineSync.question(`Ingrese el peso de la maleta en KG: `);
    const genero = readlineSync.question(`Ingrese el género del dueño de la maleta (femenino o masculino): `);

    pesoTotalMaletas += peso;

    if (genero.toLowerCase() === 'masculino') {
        pesoTotalHombres += peso;
        cantidadHombres++;
    } else if (genero.toLowerCase() === 'femenino') {
        pesoTotalMujeres += peso;
        cantidadMujeres++;
    }

    if (peso > maletaMayorPeso.peso) {
        maletaMayorPeso = { origen, numeroVuelo, destino, peso, genero };
    }

    if (!cantidadDestinos[destino]) {
        cantidadDestinos[destino] = 1;
    } else {
        cantidadDestinos[destino]++;
    }

    const costoMaleta = calcularCostoMaleta(peso, destino);
    console.log(`   - Monto a pagar por esta maleta: ${costoMaleta} pesos`);

    return costoMaleta;
}

let continuar = true;
let totalACobrar = 0;

while (continuar) {
    console.log(`\n--- Registro de Maleta ---`);
    totalACobrar += registrarMaleta();

    const respuesta = readlineSync.question(`\n¿Desea registrar otra maleta? (s/n): `);
    if (respuesta.toLowerCase() !== 's') {
        continuar = false;
    }
}

let destinoMasDespachado = '';
let cantidadMaxima = 0;
for (let destino in cantidadDestinos) {
    if (cantidadDestinos[destino] > cantidadMaxima) {
        cantidadMaxima = cantidadDestinos[destino];
        destinoMasDespachado = destino;
    }
}

console.log('\n--- Resultados ---');
console.log(`1. Destino al que más se despacharon maletas: ${destinoMasDespachado}`);
console.log(`2. Peso total de las maletas en el avión: ${pesoTotalMaletas} KG`);

const promedioPesoHombres = cantidadHombres === 0 ? 0 : pesoTotalHombres / cantidadHombres;
const promedioPesoMujeres = cantidadMujeres === 0 ? 0 : pesoTotalMujeres / cantidadMujeres;
console.log(`3. Promedio del peso de las maletas por género:`);
console.log(`   - Hombres: ${promedioPesoHombres.toFixed(2)} KG`);
console.log(`   - Mujeres: ${promedioPesoMujeres.toFixed(2)} KG`);

console.log(`4. Maleta con mayor peso en el vuelo:`);
console.log(`   - Origen: ${maletaMayorPeso.origen}`);
console.log(`   - Número de vuelo: ${maletaMayorPeso.numeroVuelo}`);
console.log(`   - Destino: ${maletaMayorPeso.destino}`);
console.log(`   - Peso: ${maletaMayorPeso.peso} KG`);
console.log(`   - Género del dueño: ${maletaMayorPeso.genero}`);

console.log(`5. Descuento total por destinos promocionales: ${descuentoTotal} pesos`);
console.log(`   (Descuento del 15% para el destino ${DESTINOS_PROMO.join(', ')})`);
console.log(`   - Total a cobrar por todas las maletas: ${totalACobrar} pesos`);
