class DatosReparacion {
  constructor(
    nombreCliente,
    modelo,
    numeroSerieEquipo,
    imei,
    fechaHora,
    autorizacion,
    abono50,
    diagnostico,
    estado
  ) {
    this.nombreCliente = nombreCliente;
    this.modelo = modelo;
    this.numeroSerieEquipo = numeroSerieEquipo;
    this.imei = imei;
    this.fechaHora = fechaHora;
    this.autorizacion = autorizacion;
    this.abono50 = abono50;
    this.diagnostico = diagnostico;
    this.estado = estado;
  }
}

const listaEquipos = [];
function generarNumeroSerie() {
  const numeroSerieGenerado =
    Math.floor(Math.random() * 90000000000000) + 10000000000000;

  document.getElementById("numeroSerieEquipo").value = numeroSerieGenerado;
}

function generarImei() {
  const imeiGenerado =
    Math.floor(Math.random() * 90000000000000) + 10000000000000;
  document.getElementById("imei").value = imeiGenerado;
}

function consultarIMEIRobado(imei) {
  return Math.random() < 0.1;
}

function validar() {
  const nombreCliente = document.getElementById("nombreCliente").value;
  const modelo = document.getElementById("Modelo").value;
  const numeroSerieEquipo = document.getElementById("numeroSerieEquipo").value;
  const imei = document.getElementById("imei").value;

  const datosReparacion = new DatosReparacion(
    nombreCliente,
    modelo,
    numeroSerieEquipo
  );

  const estaReportado = consultarIMEIRobado(imei);

  if (estaReportado) {
    alert("¡Alerta! Este IMEI está reportado como robado.");
    document.getElementById("nombreCliente").value = "";
    document.getElementById("Modelo").value = "";
    document.getElementById("numeroSerieEquipo").value = "";
    document.getElementById("imei").value = "";
  } else {
    alert(
      "El IMEI no está reportado como robado. Puede proceder con la validación."
    );
    agregarCliente();
  }
}

function cancelar() {
  document.getElementById("formularioReparacion").reset();
}

function agregarCliente() {
  const listaClientes = [];
  const nombre = document.getElementById("nombreCliente").value;
  const modelo = document.getElementById("Modelo").value;
  const numeroSerie = document.getElementById("numeroSerieEquipo").value;
  const imei = document.getElementById("imei").value;
  const fechaHora = new Date().toLocaleString();
  const autorizacion = prompt("Ingrese la autorización:");
  const abono50 = prompt("¿Abonó el 50%? (Sí/No):");
  const diagnostico = prompt("Ingrese el diagnóstico:");
  const estado = prompt("Ingrese el estado:");

  const tabla = document.getElementById("registros");
  const fila = tabla.insertRow();

  const celdas = [
    nombre,
    modelo,
    numeroSerie,
    imei,
    fechaHora,
    autorizacion,
    abono50,
    diagnostico,
    estado,
    tecnicos(),
  ];

  celdas.forEach((valor) => {
    const celda = fila.insertCell();
    celda.innerHTML = valor;
    celda.onclick = function () {
      if (celda.cellIndex === 7 || celda.cellIndex === 8) {
        editarCampo(celda);
      }
    };
  });

  const datosReparacion = new DatosReparacion(
    nombre,
    modelo,
    numeroSerie,
    imei,
    fechaHora,
    autorizacion,
    abono50,
    diagnostico,
    estado
  );

  listaClientes.push(datosReparacion);

  sessionStorage.setItem("listaClientes", JSON.stringify(listaClientes));
}

function editarCampo(celda) {
  const valorActual = celda.innerHTML;
  const nuevoValor = prompt("Editar:", valorActual);

  if (nuevoValor !== null) {
    celda.innerHTML = nuevoValor;
  }
}
function tecnicos() {
  const select = document.createElement("select");
  const opciones = ["Juan Apaza", "Dario Mendoza", "Julian Alvarez"];

  opciones.forEach((opcion) => {
    const option = document.createElement("option");
    option.value = opcion;
    option.text = opcion;
    select.add(option);
  });

  return select.outerHTML;
}

function loadSessionStorage() {
  const tabla = document.getElementById("registros");
  const fila = tabla.insertRow();
  const datosAlmacenados = sessionStorage.getItem("listaClientes");

  if (datosAlmacenados) {
    const datosParseados = JSON.parse(datosAlmacenados);
    datosParseados.forEach((datos) => {
      const celdas = [
        datos.nombreCliente,
        datos.modelo,
        datos.numeroSerieEquipo,
        datos.imei,
        datos.fechaHora,
        datos.autorizacion,
        datos.abono50,
        datos.diagnostico,
        datos.estado,
        tecnicos(),
      ];

      celdas.forEach((valor) => {
        const celda = fila.insertCell();
        celda.innerHTML = valor;
        celda.onclick = function () {
          if (celda.cellIndex === 7 || celda.cellIndex === 8) {
            editarCampo(celda);
          }
        };
      });
    });
  }
}

loadSessionStorage();
