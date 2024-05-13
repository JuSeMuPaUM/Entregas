class Profesor {
  constructor(identificacion, nombre, tipo, horas, tieneMaestria) {
      this.identificacion = identificacion;
      this.nombre = nombre;
      this.tipo = tipo;
      this.horas = horas;
      this.tieneMaestria = tieneMaestria;
  }

  get salarioPorHora() {
      switch (this.tipo) {
          case 'planta':
              return valorX; // Utilizamos el valor actualizado de X
          case 'catedrático':
              return valorY; // Utilizamos el valor actualizado de Y
          case 'catedrático asociado':
              return valorY * (1 + (valorM / 100)); // Calculamos el salario con el recargo M
      }
  }

  get salarioTotal() {
      return this.horas * this.salarioPorHora;
  }

  get pagoExtra() {
      let recargo = 0;
      if (this.tieneMaestria) {
          recargo = valorM; // Utilizamos el valor actualizado de M
      }
      return recargo;
  }
}

class Programa {
  constructor(nombre) {
      this.nombre = nombre;
      this.profesores = [];
      this.asignaturas = []; // Array para almacenar las asignaturas del programa
  }

  agregarProfesor(profesor) {
      this.profesores.push(profesor);
  }

  quitarProfesor(identificacion) {
      const index = this.profesores.findIndex(profesor => profesor.identificacion === identificacion);
      if (index !== -1) {
          this.profesores.splice(index, 1);
          return true;
      }
      return false;
  }

  agregarAsignatura(asignatura) {
      this.asignaturas.push(asignatura);
  }

  quitarAsignatura(asignatura) {
      const index = this.asignaturas.indexOf(asignatura);
      if (index !== -1) {
          this.asignaturas.splice(index, 1);
          return true;
      }
      return false;
  }

  get pagoTotal() {
      return this.profesores.reduce((acum, profesor) => acum + profesor.salarioTotal, 0);
  }

  get cantidadProfesoresConMaestria() {
      return this.profesores.filter(profesor => profesor.tieneMaestria).length;
  }
}

class Universidad {
  constructor() {
      this.programas = [];
      this.profesores = [];
  }

  agregarPrograma(programa) {
      this.programas.push(programa);
  }

  agregarProfesor(profesor) {
      this.profesores.push(profesor);
  }

  quitarProfesor(identificacion) {
      const index = this.profesores.findIndex(profesor => profesor.identificacion === identificacion);
      if (index !== -1) {
          this.profesores.splice(index, 1);
          // También quitamos al profesor de los programas en los que participa
          this.programas.forEach(programa => {
              programa.quitarProfesor(identificacion);
          });
          return true;
      }
      return false;
  }

  get costoNominaTotal() {
      return this.profesores.reduce((acum, profesor) => acum + profesor.salarioTotal, 0);
  }

  get promedioCostoProfesoresDia() {
    const profesoresDia = this.profesores.filter(profesor => profesor.horas > 0);
    const totalDia = profesoresDia.reduce((acum, profesor) => acum + profesor.salarioTotal, 0);
    return totalDia / profesoresDia.length;
  }
  
  costoNominaPrograma(programaNombre) {
      const programa = this.programas.find(programa => programa.nombre === programaNombre);
      return programa ? programa.pagoTotal : 0;
  }

  costoTotalPrograma(programaNombre) {
      const programa = this.programas.find(programa => programa.nombre === programaNombre);
      if (!programa) {
          return 'El programa no existe';
      }
      const total = programa.pagoTotal;
      const profesoresConMaestria = programa.cantidadProfesoresConMaestria;
      return `Costo total del programa ${programaNombre}: $${total}, Profesores con maestría: ${profesoresConMaestria}`;
  }

  costoProfesor(identificacionProfesor) {
      const profesor = this.profesores.find(profesor => profesor.identificacion === identificacionProfesor);
      if (!profesor) {
          return 'El profesor no existe';
      }
      const total = profesor.salarioTotal;
      const extraDiurna = profesor.pagoExtra;
      const extraNocturna = extraDiurna + 5;
      return `Total: $${total}, Extra en diurno: ${extraDiurna}%, Extra en nocturno: ${extraNocturna}%`;
  }

  get costoPlanta() {
      return this.profesores.filter(profesor => profesor.tipo === 'planta').reduce((acum, profesor) => acum + profesor.salarioTotal, 0);
  }

  get costoCatedratico() {
      return this.profesores.filter(profesor => profesor.tipo === 'catedrático' || profesor.tipo === 'catedrático asociado').reduce((acum, profesor) => acum + profesor.salarioTotal, 0);
  }

  get cantidadProfesoresMaestria() {
      return this.profesores.filter(profesor => profesor.tieneMaestria).length;
  }
}

// Aquí mantenemos el resto del código igual
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para mostrar el menú
function mostrarMenu() {
    console.log('\n======= Menú =======');
    console.log('1. Cambiar valor de Hora profesor de planta');
    console.log('2. Cambiar valor de Hora profesor catedrático');
    console.log('3. Cambiar valor de recargo por Maestría');
    console.log('4. Agregar profesor');
    console.log('5. Quitar profesor');
    console.log('6. Agregar asignatura a programa');
    console.log('7. Quitar asignatura de programa');
    console.log('8. Consultar costo total de la nómina de la universidad');
    console.log('9. Consultar costo total de la nómina de un programa');
    console.log('10. Consultar promedio de costo de los profesores que dan clases en el día');
    console.log('11. Consultar costo total y extras de un profesor');
    console.log('12. Consultar costo total de los profesores de planta');
    console.log('13. Consultar costo total de los profesores catedráticos');
    console.log('14. Consultar cantidad de profesores con maestría');
    console.log('15. Salir');
}

// Variables para almacenar los valores de X, Y y M
let valorX = 50000;
let valorY = 75000;
let valorM = 5;

// Crear objetos
const universidad = new Universidad();
const programaIngenieria = new Programa('Ingeniería de Sistemas');
const programaPsicologia = new Programa('Psicología');

// Agregar programas a la universidad
universidad.agregarPrograma(programaIngenieria);
universidad.agregarPrograma(programaPsicologia);

function manejarOpcion(opcion) {
    switch (opcion) {
        case '1':
            rl.question('Nuevo valor de Hora profesor de planta: ', (input) => {
                valorX = parseFloat(input);
                console.log('Valor de hora profesor de planta actualizado:', valorX);
                mostrarMenu();
            });
            break;
        case '2':
            rl.question('Nuevo valor de Hora profesor catedrático: ', (input) => {
                valorY = parseFloat(input);
                console.log('Valor de hora profesor catedrático actualizado:', valorY);
                mostrarMenu();
            });
            break;
        case '3':
            rl.question('Nuevo valor del recargo por Maestría: ', (input) => {
                valorM = parseFloat(input);
                console.log('Valor de recargo Maestría actualizado:', valorM);
                mostrarMenu();
            });
            break;
        case '4':
            rl.question('Nombre del profesor: ', (nombre) => {
                rl.question('Identificación del profesor: ', (identificacion) => {
                    rl.question('Tipo de profesor (planta, catedrático, catedrático asociado): ', (tipo) => {
                        rl.question('Horas de trabajo: ', (horas) => {
                            rl.question('Tiene maestría? (true/false): ', (tieneMaestria) => {
                                const nuevoProfesor = new Profesor(identificacion, nombre, tipo, parseFloat(horas), tieneMaestria === 'true');
                                universidad.agregarProfesor(nuevoProfesor);
                                console.log('Profesor agregado correctamente.');
                                mostrarMenu();
                            });
                        });
                    });
                });
            });
            break;
        case '5':
            rl.question('Identificación del profesor a quitar: ', (identificacion) => {
                const profesorQuitado = universidad.quitarProfesor(identificacion);
                if (profesorQuitado) {
                    console.log('Profesor quitado correctamente.');
                } else {
                    console.log('No se encontró un profesor con esa identificación.');
                }
                mostrarMenu();
            });
            break;
        case '6':
            rl.question('Nombre del programa al que agregar la asignatura: ', (programaNombre) => {
                rl.question('Nombre de la asignatura: ', (asignaturaNombre) => {
                    const programa = universidad.programas.find(programa => programa.nombre === programaNombre);
                    if (programa) {
                        programa.agregarAsignatura(asignaturaNombre);
                        console.log('Asignatura agregada correctamente al programa.');
                    } else {
                        console.log('No se encontró un programa con ese nombre.');
                    }
                    mostrarMenu();
                });
            });
            break;
        case '7':
            rl.question('Nombre del programa al que quitar la asignatura: ', (programaNombre) => {
                rl.question('Nombre de la asignatura a quitar: ', (asignaturaNombre) => {
                    const programa = universidad.programas.find(programa => programa.nombre === programaNombre);
                    if (programa) {
                        const asignaturaQuitada = programa.quitarAsignatura(asignaturaNombre);
                        if (asignaturaQuitada) {
                            console.log('Asignatura quitada correctamente del programa.');
                        } else {
                            console.log('No se encontró una asignatura con ese nombre en el programa.');
                        }
                    } else {
                        console.log('No se encontró un programa con ese nombre.');
                    }
                    mostrarMenu();
                });
            });
            break;
        case '8':
            console.log('Costo total de la nómina de la universidad:', universidad.costoNominaTotal);
            mostrarMenu();
            break;
        case '9':
            rl.question('Nombre del programa: ', (input) => {
                console.log(`Costo total de la nómina del programa ${input}:`, universidad.costoNominaPrograma(input));
                mostrarMenu();
            });
            break;
        case '10':
            console.log('Promedio de costo de los profesores que dan clases en el día:', universidad.promedioCostoProfesoresDia);
            mostrarMenu();
            break;
        case '11':
            rl.question('Identificación del profesor: ', (input) => {
                console.log('Información del profesor:', universidad.costoProfesor(input));
                mostrarMenu();
            });
            break;
        case '12':
            console.log('Costo total de los profesores de planta:', universidad.costoPlanta);
            mostrarMenu();
            break;
        case '13':
            console.log('Costo total de los profesores catedráticos:', universidad.costoCatedratico);
            mostrarMenu();
            break;
        case '14':
            console.log('Cantidad de profesores con maestría:', universidad.cantidadProfesoresMaestria);
            mostrarMenu();
            break;
        case '15':
            rl.close();
            break;
        default:
            console.log('Opción no válida. Por favor, seleccione una opción del menú.');
            mostrarMenu();
            break;
    }
}

mostrarMenu();

rl.on('line', (input) => {
  manejarOpcion(input);
});
