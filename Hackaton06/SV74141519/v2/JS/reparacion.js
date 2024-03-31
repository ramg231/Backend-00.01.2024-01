class Phone {
  constructor(imei, marca, modelo) {
    this.imei = imei;
    this.marca = marca;
    this.modelo = modelo;
  }
}
class Client {
  constructor(firstName, lastName, dni) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
  }
}
class Ticket {
  constructor(state, description, phone, payment, paymentPercentage, client) {
    this.state = state;
    this.description = description;
    this.phone = phone;
    this.payment = payment;
    this.paymentPercentage = paymentPercentage;
    this.client = client;
  }
}
class Tecnic {
  constructor(firstName, lastName, dni, skills) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
    this.skills = skills;
  }
}

class Company {
  phoneReported = [];
  tickets = [];
  clients = [];
  phone = [];
  tecnics = [];

  constructor(name) {
    this.name = name;
    this.loadFromStorage();
  }

loadFromStorage() {
    const storedPhonesReported = JSON.parse(localStorage.getItem('phoneReported')) || [];
    this.phoneReported = storedPhonesReported.map(phone => new Phone(phone.imei, phone.marca, phone.modelo));
    const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
    this.clients = storedClients.map(client => new Client(client.firstName, client.lastName, client.dni));
    const storedTecnics = JSON.parse(localStorage.getItem('tecnics')) || [];
    this.tecnics = storedTecnics.map(tecnic => new Tecnic(tecnic.firstName, tecnic.lastName, tecnic.dni, tecnic.skills));
    const storedPhones = JSON.parse(localStorage.getItem('phones')) || [];
    this.phone = storedPhones.map(phone => new Phone(phone.imei, phone.marca, phone.modelo));
    const storedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    this.tickets = storedTickets.map(ticket => new Ticket(ticket.state, ticket.description, new Phone(ticket.phone.imei, ticket.phone.marca, ticket.phone.modelo), ticket.payment, ticket.paymentPercentage, new Client(ticket.client.firstName, ticket.client.lastName, ticket.client.dni)));
    
  }

  addedPhoneReported(phone) {
    let existsPhone = false;
  
    // Revisar si el teléfono ya ha sido reportado
    for (let i = 0; i < this.phoneReported.length; i++) {
      if (this.phoneReported[i].imei === phone.imei) {
        existsPhone = true;
        break; // Si el teléfono ya está reportado, no es necesario seguir buscando
      }
    }
  
    // Si el teléfono no ha sido reportado, añadirlo y actualizar localStorage
    if (!existsPhone) {
      this.phoneReported.push(phone);
      
      // Actualizar la lista de teléfonos reportados en localStorage
      localStorage.setItem('phoneReported', JSON.stringify(this.phoneReported));
    }
  
    return phone;
  }

  findOnePhoneReported(imei) {
    return this.phoneReported.find((e) => e.imei == imei);
  }

  addedClient(firstName, lastName, dni) {
    const result = this.findOneClient(dni);
    if (result) {
      return result;
    }
    const newClient = new Client(firstName, lastName, dni);
  
    this.clients.push(newClient);

    // Guardar en localStorage
    localStorage.setItem('clients', JSON.stringify(this.clients));
    return newClient;
  }

  findOneClient(dni) {
    return this.clients.find((client) => client.dni == dni);
  }

  addedTecnic(firstName, lastName, dni, skills) {
    const result = this.findOneTecnic(dni);
    if (result) {
      return result;
    }
    const newTecnic = new Tecnic(firstName, lastName, dni, skills);

    this.tecnics.push(newTecnic);

    // Guardar en localStorage
    const storedTecnics = JSON.parse(localStorage.getItem('tecnics')) || [];
    const newStoredTecnics = [...storedTecnics, newTecnic];
    localStorage.setItem('tecnics', JSON.stringify(newStoredTecnics));
    return newTecnic;
  }

  findOneTecnic(dni) {
    return this.tecnics.find((tecnic) => tecnic.dni == dni);
  }

  addedPhone(imei, marca, modelo) {
    const result = this.findOnePhone(imei);
    if (result) {
      return result;
    }
    const newPhone = new Phone(imei, marca, modelo);
  
    this.phone.push(newPhone);
    // Guardar en localStorage
    localStorage.setItem('phones', JSON.stringify(this.phone));
    return newPhone;
  }
  
  findOnePhone(imei) {
    return this.phone.find((phone) => phone.imei == imei);
  }

  generateDiagnosis(client, phone, description) {
    const existsPhoneReported = this.findOnePhoneReported(phone.imei); 
    if (existsPhoneReported) {
      console.log("El dispositivo se encuentra REPORTADO");
      return 1;
    }

    const existsClient = this.findOneClient(client.dni);
    if (!existsClient) {
      this.addedClient(client.firstName, client.lastName, client.dni); 
    }

    const existsPhone = this.findOnePhone(phone.imei);
    if (!existsPhone) {
      this.addedPhone(phone.imei, phone.marca, phone.modelo);
    } else {
      alert("El dispositivo ya esta ingresado.");
      return;
    }

    const data = {
      client: client,
      phone: phone,
      description: description,
      state: "Ingresado",
      payment: 0,
      paymentPercentage: 0,
    };

    const newTicket = new Ticket(
      data.state,
      data.description,
      data.phone,
      data.payment,
      data.paymentPercentage,
      data.client
    );

    this.tickets.push(newTicket);
    //localStorage.setItem('tickets', JSON.stringify(this.tickets));
    const storedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const newStoredTickets = [...storedTickets, newTicket];
    localStorage.setItem('tickets', JSON.stringify(newStoredTickets));
  }
}


let btnLlenardatos = document.getElementById("btnLlenarDatos");
btnLlenardatos.disabled = true;
let txtNombre = document.getElementById("nombreR");
txtNombre.disabled = true;
let txtApellido = document.getElementById("apellidoR");
txtApellido.disabled = true;
let btnRegistrarCliente = document.getElementById("btnRegistrarCliente");
btnRegistrarCliente.disabled = true;
let txtMarcaRt = document.getElementById("marcaRt");
txtMarcaRt.disabled = true;
let txtModeloRt = document.getElementById("modeloRt");
txtModeloRt.disabled = true;
let txtDniRt = document.getElementById("dniRT");
txtDniRt.disabled = true;
let txtNombreRt = document.getElementById("nombreRT");
txtNombreRt.disabled = true;
let txtApellidoRt = document.getElementById("apellidoRT");
txtApellidoRt.disabled = true;
let txtDiagnosticoRt = document.getElementById("diagnosticoRT");
txtDiagnosticoRt.disabled = true;
let txtImeiRt = document.getElementById("imeiRt");
let btnVerificarClienteRt = document.getElementById("btnVerificarClienteRt");
btnVerificarClienteRt.disabled = true;


const company = new Company("techNew");

function verificarReparacionTelefono() {
  let imei = txtImeiRt.value;
  const existsPhone = company.findOnePhone(imei);
  if (existsPhone) {
    alert("El dispositivo ya esta ingresado");
    const ticket = company.tickets.find((ticket) => ticket.phone.imei === imei);
    if (ticket) {
      txtDniRt.value = ticket.client.dni;
      txtNombreRt.value = ticket.client.firstName;
      txtApellidoRt.value = ticket.client.lastName;
      txtMarcaRt.value = ticket.phone.marca;
      txtModeloRt.value = ticket.phone.modelo;
      txtDiagnosticoRt.value = ticket.description;
      txtDniRt.disabled = true;
      txtNombreRt.disabled = true;
      txtApellidoRt.disabled = true;
      txtMarcaRt.disabled = true;
      txtModeloRt.disabled = true;
      txtDiagnosticoRt.disabled = true;
      btnLlenardatos.disabled = true;
      btnVerificarClienteRt.disabled = true;
      return;
    }
  } else {
    alert(
      "El dispositivo NO esta ingresado, complete la información para ingresarlo."
    );
    txtDniRt.value = "";
    txtNombreRt.value = "";
    txtApellidoRt.value = "";
    txtMarcaRt.value = "";
    txtModeloRt.value = "";
    txtDiagnosticoRt.value = "";
    txtDniRt.disabled = false;
    txtNombreRt.disabled = false;
    txtApellidoRt.disabled = false;
    txtMarcaRt.disabled = false;
    txtModeloRt.disabled = false;
    txtDiagnosticoRt.disabled = false;
    btnLlenardatos.disabled = false;
    btnVerificarClienteRt.disabled = false;
  }
}

function ingresarTelefono(){
  let imei = txtImeiRt.value;
  let marca = txtMarcaRt.value;
  let modelo = txtModeloRt.value;
  let dni = txtDniRt.value;
  let nombre = txtNombreRt.value;
  let apellido = txtApellidoRt.value;
  let diagnostico = txtDiagnosticoRt.value;

  const existsPhone = company.findOnePhone(imei);
  if (existsPhone) {
    alert("El dispositivo ya está ingresado");
    txtDniRt.value = "";
    txtNombreRt.value = "";
    txtApellidoRt.value = "";
    txtMarcaRt.value = "";
    txtModeloRt.value = "";
    txtDiagnosticoRt.value = "";
    txtDniRt.disabled = false;
    txtNombreRt.disabled = false;
    txtApellidoRt.disabled = false;
    txtMarcaRt.disabled = false;
    txtModeloRt.disabled = false;
    txtDiagnosticoRt.disabled = false;
    btnLlenardatos.disabled = false;
    btnVerificarClienteRt.disabled = false;
    return;
  }
  
  const newClient = new Client(nombre, apellido, dni);
  const newPhone = new Phone(imei, marca, modelo);
  company.generateDiagnosis(newClient, newPhone, diagnostico);
  location.reload();
}

function mostrarLlenarDatos() {
  const storedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
  let tabla = document.getElementById("tableLlenarDatos");
  
  storedTickets.forEach(ticket => {
      let fila = tabla.insertRow();  
      let celdaIMEI = fila.insertCell();
      celdaIMEI.innerHTML = ticket.phone.imei;
      let celdaMarca = fila.insertCell();
      celdaMarca.innerHTML = ticket.phone.marca;
      let celdaModelo = fila.insertCell();
      celdaModelo.innerHTML = ticket.phone.modelo;
      let celdaDNI = fila.insertCell();
      celdaDNI.innerHTML = ticket.client.dni;
      let celdaNombre = fila.insertCell();
      celdaNombre.innerHTML = ticket.client.firstName;
      let celdaApellido = fila.insertCell();
      celdaApellido.innerHTML = ticket.client.lastName;
      let celdaDiagnostico = fila.insertCell();
      celdaDiagnostico.innerHTML = ticket.description;
      let celdaState = fila.insertCell();
      celdaState.innerHTML = ticket.state;

      fila.onclick = function() {
        modificarEstadoDeFilaSeleccionada(fila);
      }
  }
  );
}

function modificarEstadoDeFilaSeleccionada(fila) {
  const celdaIMEI = fila.cells[0]; // La primera celda es la celda del IMEI (el índice es 0-based)
  const imei = celdaIMEI.innerHTML;
  console.log("IMEI de la fila seleccionada:", imei);

  // Abrir un cuadro de diálogo para que el usuario ingrese el nuevo estado
  const nuevoEstado = prompt("Ingrese el nuevo estado para el ticket:", "");

  if (nuevoEstado !== null && nuevoEstado !== "") {
    // Actualizar el estado del ticket en la tabla
    const celdaEstado = fila.cells[7]; // La séptima celda es la celda del estado (el índice es 0-based)
    celdaEstado.innerHTML = nuevoEstado;

    // Actualizar el estado del ticket en el almacenamiento local
    const storedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const ticketIndex = storedTickets.findIndex(t => t.phone.imei === imei);
    if (ticketIndex !== -1) {
      storedTickets[ticketIndex].state = nuevoEstado;
      localStorage.setItem('tickets', JSON.stringify(storedTickets));
    }
  }
}

function verificarEstadoImei() {
  let imeiV = txtImeiRt.value;
  console.log(imeiV)
  const existsPhoneReportedV = company.findOnePhoneReported(imeiV); 
  if (existsPhoneReportedV) {
    alert("El dispositivo se encuentra REPORTADO");
    txtMarcaRt.value = existsPhoneReportedV.marca;
    txtModeloRt.value = existsPhoneReportedV.modelo;
    txtMarcaRt.disabled = true;
    txtModeloRt.disabled = true;
    txtDniRt.disabled = true;
    txtNombreRt.disabled = true;
    txtApellidoRt.disabled = true;
    txtDiagnosticoRt.disabled = true;
  } else {
    verificarReparacionTelefono();
  }
}

function llenarDatosTelefonoReported() {
  let imeiR = document.getElementById("imeiR").value;
  let marcaR = document.getElementById("marcaR").value;
  let modeloR = document.getElementById("modeloR").value;

  const newPhoneReported = new Phone(imeiR, marcaR, modeloR);
  company.addedPhoneReported(newPhoneReported);
  company.phoneReported.push(newPhoneReported);

  document.getElementById("imeiR").value = "";
  document.getElementById("marcaR").value = "";
  document.getElementById("modeloR").value = "";
  location.reload();
}

function showDataPhoneReported() {
  const storedPhonesReported = JSON.parse(localStorage.getItem('phoneReported')) || [];
  let tabla = document.getElementById("tablePhoneReported");
  
  storedPhonesReported.forEach(phone => {
    let fila = tabla.insertRow();
    let celdaImei = fila.insertCell();
    celdaImei.innerHTML = phone.imei;
    let celdaMarca = fila.insertCell();
    celdaMarca.innerHTML = phone.marca;
    let celdaModelo = fila.insertCell();
    celdaModelo.innerHTML = phone.modelo;
  }
  );
  
}

function verificarClienteRegistrado(txtDniVar, txtNombreVar, txtApellidoVar) {
  const existsClient = company.findOneClient(txtDniVar.value);

  if (existsClient) {
    
    txtNombreVar.value = existsClient.firstName;
    txtApellidoVar.value = existsClient.lastName;
    alert("El cliente ya se encuentra registrado");
  } else {
    
    btnVerificarClienteRt.disabled = false;
    btnRegistrarCliente.disabled = false;
    txtNombreVar.disabled = false;
    txtApellidoVar.disabled = false;
    txtNombreVar.value = "";
    txtApellidoVar.value = "";
    alert(
      "El cliente NO se encuentra registrado, completar los campos para registrarlo."
    );
    //if (txtNombreVar.value != "") {
     // registrarCliente();
    //}
  }
}

/*
function registrarCliente() {
  let nombreR = document.getElementById("nombreR").value;
  let apellidoR = document.getElementById("apellidoR").value;
  let dniR = document.getElementById("dniR").value;

  const newClient = new Client(nombreR, apellidoR, dniR);
  company.addedClient(newClient);
  company.clients.push(newClient);
  
  document.getElementById("nombreR").value = "";
  document.getElementById("apellidoR").value = "";
  document.getElementById("dniR").value = "";

  btnRegistrarCliente.disabled = true;
  //btnRegistrarClienteRt.disabled = true;
  //btnVerificarClienteRt.disabled = true;
}
*/

function showDataClient() {
  const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
  let tabla = document.getElementById("tableClient");
  
  storedClients.forEach(client => {
    const fila = tabla.insertRow();
    let celdaDNI = fila.insertCell();
    let celdaNombre = fila.insertCell();
    let celdaApellido = fila.insertCell();
  
    celdaDNI.innerHTML = client.dni;
    celdaNombre.innerHTML = client.firstName;
    celdaApellido.innerHTML = client.lastName;
  });
}

function registrarTecnico() {
  // Obtener los valores de los campos de entrada
  let nombre = document.getElementById("nombreTecnico").value;
  let apellido = document.getElementById("apellidoTecnico").value;
  let dni = document.getElementById("dniTecnico").value;
  let skills = document.getElementById("skillsTecnico").value.split(",");

  const existTecnic = company.findOneTecnic(dni);
  if (existTecnic) {
    alert("El técnico ya está registrado");
    document.getElementById("formTecnico").reset();
    return;
  }
  
  const newTecnic = company.addedTecnic(nombre, apellido, dni, skills);
  console.log(newTecnic);
  document.getElementById("formTecnico").reset();
  location.reload();
}


function showDataTecnic() {
  const storedTecnics = JSON.parse(localStorage.getItem('tecnics')) || [];
  let tabla = document.getElementById("tableTecnic");
  
  storedTecnics.forEach(tecnic => {
    let fila = tabla.insertRow();

    let celdaDNI = fila.insertCell();
    celdaDNI.innerHTML = tecnic.dni;
    let celdaNombre = fila.insertCell();
    celdaNombre.innerHTML = tecnic.firstName;
    let celdaApellido = fila.insertCell();
    celdaApellido.innerHTML = tecnic.lastName;
    let celdaSkills = fila.insertCell();
    celdaSkills.innerHTML = tecnic.skills;
  });
}

showDataClient();
showDataPhoneReported();
mostrarLlenarDatos();
showDataTecnic();
