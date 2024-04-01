class Vehiculo {
    constructor(marca, modelo, precioPorDia, disponible) {
        this.marca = marca;
        this.modelo = modelo;
        this.precioPorDia = precioPorDia;
        this.disponible = disponible;
    }
}

const vehiculos = [
    new Vehiculo("Toyota", 2022, 50, true),
    new Vehiculo("Ford", 2023, 60, true),
    new Vehiculo("Chevrolet", 2021, 45, false),
];

// Problema 1: Encontrar el vehículo más caro disponible para alquilar.
let vehiculoMasCaro = vehiculos.filter(v => v.disponible)
    .reduce((max, v) => (v.precioPorDia > max.precioPorDia ? v : max), vehiculos[0]);
console.log("Vehículo más caro disponible:", vehiculoMasCaro);

// Problema 2: Calcular el precio total por día si se alquilan todos los vehículos disponibles.
let precioTotalAlquiler = vehiculos.filter(v => v.disponible)
    .reduce((total, v) => total + v.precioPorDia, 0);
console.log("Precio total por día de todos los vehículos disponibles:", precioTotalAlquiler);

// Problema 3: Encontrar el vehículo más antiguo disponible para alquilar.
let vehiculoMasAntiguo = vehiculos.filter(v => v.disponible)
    .reduce((min, v) => (v.modelo < min.modelo ? v : min), vehiculos[0]);
console.log("Vehículo más antiguo disponible:", vehiculoMasAntiguo);

class Automovil extends Vehiculo {
    constructor(marca, modelo, precioPorDia, disponible, numeroPuertas, tipoCombustible) {
        super(marca, modelo, precioPorDia, disponible);
        this.numeroPuertas = numeroPuertas;
        this.tipoCombustible = tipoCombustible;
    }
}

const automoviles = [
    new Automovil("Toyota", 2022, 50, true, 4, "Gasolina"),
    new Automovil("Ford", 2023, 60, true, 5, "Gasolina"),
    new Automovil("Chevrolet", 2021, 45, false, 2, "Diesel"),
];

// Problema 1: Encontrar el automóvil con más puertas disponible para alquilar.
let automovilMasPuertas = automoviles.filter(a => a.disponible)
    .reduce((max, a) => (a.numeroPuertas > max.numeroPuertas ? a : max), automoviles[0]);
console.log("Automóvil con más puertas disponible:", automovilMasPuertas);

// Problema 2: Filtrar automóviles por tipo de combustible.
let automovilesGasolina = automoviles.filter(a => a.tipoCombustible === "Gasolina");
console.log("Automóviles de gasolina:", automovilesGasolina);

// Problema 3: Calcular el promedio de precio por día de los automóviles disponibles.
let precioPromedioAutomoviles = automoviles.filter(a => a.disponible)
    .reduce((sum, a) => sum + a.precioPorDia, 0) / automoviles.filter(a => a.disponible).length;
console.log("Precio promedio por día de los automóviles disponibles:", precioPromedioAutomoviles);

class Camion extends Vehiculo {
    constructor(marca, modelo, precioPorDia, disponible, capacidadCarga, tipo) {
        super(marca, modelo, precioPorDia, disponible);
        this.capacidadCarga = capacidadCarga;
        this.tipo = tipo;
    }
}

const camiones = [
    new Camion("Volvo", 2020, 80, true, 5000, "Carga Pesada"),
    new Camion("Mercedes-Benz", 2021, 90, true, 7000, "Carga Liviana"),
    new Camion("Scania", 2019, 75, false, 6000, "Carga Media"),
];

// Problema 1: Encontrar el camión con mayor capacidad de carga disponible.
let camionMayorCapacidad = camiones.filter(c => c.disponible)
    .reduce((max, c) => (c.capacidadCarga > max.capacidadCarga ? c : max), camiones[0]);
console.log("Camión con mayor capacidad de carga disponible:", camionMayorCapacidad);

// Problema 2: Filtrar camiones por tipo.
let camionesCargaPesada = camiones.filter(c => c.tipo === "Carga Pesada");
console.log("Camiones de carga pesada:", camionesCargaPesada);

// Problema 3: Calcular el total de capacidad de carga de todos los camiones disponibles.
let totalCapacidadCarga = camiones.filter(c => c.disponible)
    .reduce((sum, c) => sum + c.capacidadCarga, 0);
console.log("Total de capacidad de carga de todos los camiones disponibles:", totalCapacidadCarga);

class Motocicleta extends Vehiculo {
    constructor(marca, modelo, precioPorDia, disponible, cilindrada, tipoUso) {
        super(marca, modelo, precioPorDia, disponible);
        this.cilindrada = cilindrada;
        this.tipoUso = tipoUso;
    }
}

const motocicletas = [
    new Motocicleta("Honda", 2021, 30, true, 250, "Deportiva"),
    new Motocicleta("Yamaha", 2022, 35, true, 400, "Turismo"),
    new Motocicleta("Kawasaki", 2020, 25, false, 150, "Ciudad"),
];

// Problema 1: Encontrar la motocicleta con mayor cilindrada disponible.
let motocicletaMayorCilindrada = motocicletas.filter(m => m.disponible)
    .reduce((max, m) => (m.cilindrada > max.cilindrada ? m : max), motocicletas[0]);
console.log("Motocicleta con mayor cilindrada disponible:", motocicletaMayorCilindrada);

// Problema 2: Filtrar motocicletas por tipo de uso.
let motocicletasDeportivas = motocicletas.filter(m => m.tipoUso === "Deportiva");
console.log("Motocicletas de uso deportivo:", motocicletasDeportivas);

// Problema 3: Calcular el total de cilindrada de todas las motocicletas disponibles.
let totalCilindrada = motocicletas.filter(m => m.disponible)
    .reduce((sum, m) => sum + m.cilindrada, 0);
console.log("Total de cilindrada de todas las motocicletas disponibles:", totalCilindrada);

class Cliente {
    constructor(nombre, documentoIdentidad, correoElectronico, vehiculosAlquilados) {
        this.nombre = nombre;
        this.documentoIdentidad = documentoIdentidad;
        this.correoElectronico = correoElectronico;
        this.vehiculosAlquilados = vehiculosAlquilados;
    }
}

const clientes = [
    new Cliente("Juan Perez", "123456789", "juan@gmail.com", ["Toyota", "Honda"]),
    new Cliente("Maria Lopez", "987654321", "maria@hotmail.com", ["Ford", "Yamaha"]),
    new Cliente("Carlos Ramirez", "456789123", "carlos@gmail.com", ["Chevrolet", "Kawasaki"]),
];

// Problema 1: Encontrar todos los vehículos alquilados por un cliente específico.
let clienteBuscado = "Juan Perez";
let vehiculosAlquiladosCliente = clientes.find(c => c.nombre === clienteBuscado)?.vehiculosAlquilados || [];
console.log(`Vehículos alquilados por ${clienteBuscado}:`, vehiculosAlquiladosCliente);

// Problema 2: Calcular el total gastado por un cliente en alquileres.
let clienteAGastar = "Maria Lopez";
let totalGastadoCliente = clientes.find(c => c.nombre === clienteAGastar)?.vehiculosAlquilados
    .reduce((total, vehiculo) => {
        let precioVehiculo = vehiculos.find(v => v.marca === vehiculo)?.precioPorDia || 0;
        return total + precioVehiculo;
    }, 0);
console.log(`Total gastado por ${clienteAGastar} en alquileres: $${totalGastadoCliente}`);

// Problema 3: Encontrar el cliente con más vehículos alquilados.
let clienteMasVehiculos = clientes.reduce((max, c) => (c.vehiculosAlquilados.length > max.vehiculosAlquilados.length ? c : max), clientes[0]);
console.log("Cliente con más vehículos alquilados:", clienteMasVehiculos.nombre);
