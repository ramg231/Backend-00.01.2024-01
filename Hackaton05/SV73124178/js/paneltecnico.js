import { compania } from './compania.js'
import { Ticket } from './ticket.js'
import { obtenerValorLocalStorage, limpiarTodoLocalStorage } from './utilitarios.js'

let accordionFiltro;

const mostrarPanel = (nombrepanel) => {
    const paneles = document.querySelectorAll('.panel');
    paneles.forEach(p => {
        if (!p.classList.contains(nombrepanel)) {
            p.classList.add('visually-hidden');
        } else {
            p.classList.remove('visually-hidden');
        }
    });
}

const limpiarPanelVerificarImei = () => {
    document.querySelector('#lblNroImeiConsultado').textContent = '';
    document.querySelector('#lblMarcaConsultado').textContent = '';
    document.querySelector('#lblModeloConsultado').textContent = '';
    document.querySelector('#lblSOConsultado').textContent = '';
    document.querySelector('#lblReportadoConsultado').textContent = '';
    document.querySelector('#lblIncidenteConsultado').querySelector('ol').innerHTML = '';
    document.querySelector('.pnlverificarimei').querySelector('.datocelular').classList.add('visually-hidden');
    document.querySelector('.btndiagnostico').classList.add('visually-hidden');
    document.querySelector('#txtNroIMEIConsultar').value = '';
}

const limpiarPanelRegistrarDiagnostico = () => {
    document.querySelector('#txtFechaTicketRegistro').value = '';
    document.querySelector('#txtNroImeiRegistro').value = '';
    document.querySelector('#txtNroImeiRegistro').disabled = false;
    document.querySelector('#txtDiagnosticoRegistro').value = '';
}

const limpiarPanelTicketsGenerados = () => {
    document.querySelector('.tblticketsgenerados').querySelector('tbody').innerHTML = '';
    document.querySelector('.tblticketsgenerados').classList.add('visually-hidden');
    document.querySelector('#txtNroImeiFiltro').value = '';
    document.querySelector('#txtFecInicioFiltro').value = '';
    document.querySelector('#txtFecFinFiltro').value = '';
    accordionFiltro.hide();
}

// document.querySelector('.limpieza').addEventListener('click', () => {
//     limpiarPanelTicketsGenerados();
// });

document.addEventListener("DOMContentLoaded", function (event) {
    const tecnicoLogueado = obtenerValorLocalStorage('tecnico_datos');
    const sucursalseleccionada = obtenerValorLocalStorage('sucursal_logueada');
    const nombreSucursal = compania.mostrarNombreSucursal(parseInt(sucursalseleccionada));
    document.querySelector('#lblSucursal').textContent = nombreSucursal;
    document.querySelector('#lblTecnicoLogueado').textContent = `Hola, ${tecnicoLogueado.nombre} ${tecnicoLogueado.apellido}`;
    accordionFiltro = new bootstrap.Collapse(document.querySelector('#collapseOne'));
});

const linkCerrarSession = document.querySelector('#link-logout');
linkCerrarSession.addEventListener('click', (e) => {
    e.preventDefault();
    limpiarTodoLocalStorage();
    window.location.href = '../../index.html';
});

const linkRealizarDiagnostico = document.querySelector('#link-realizardiagnostico');
linkRealizarDiagnostico.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.navbar-toggler').click();
    // document.querySelector('.pnlverificarimei').classList.remove('visually-hidden');
    limpiarPanelVerificarImei();
    mostrarPanel('pnlverificarimei');
});

const linkTicketsGenerados = document.querySelector('#link-ticketsgenerados');
linkTicketsGenerados.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.navbar-toggler').click();
    // document.querySelector('.pnlticketsgenerados').classList.remove('visually-hidden');
    limpiarPanelTicketsGenerados();
    mostrarPanel('pnlticketsgenerados');
});

const btnBuscarIMEI = document.querySelector('#btnBuscarIMEI');
btnBuscarIMEI.addEventListener('click', () => {
    const nroIMEI = document.querySelector('#txtNroIMEIConsultar').value;
    const celular = compania.buscarCelularXIMEI(nroIMEI);
    if (celular) {
        document.querySelector('.pnlverificarimei').querySelector('.datocelular').classList.remove('visually-hidden');
        const { imei, marca, modelo, so, robado, reporterobado } = celular;
        document.querySelector('#lblNroImeiConsultado').textContent = imei;
        document.querySelector('#lblMarcaConsultado').textContent = marca;
        document.querySelector('#lblModeloConsultado').textContent = modelo;
        document.querySelector('#lblSOConsultado').textContent = so;
        document.querySelector('#lblReportadoConsultado').textContent = robado ? 'SI' : 'NO';
        if (robado) {
            document.querySelector('.btndiagnostico').classList.add('visually-hidden');
            document.querySelector('#lblReportadoConsultado').classList.remove('text-bg-success');
            document.querySelector('#lblReportadoConsultado').classList.add('text-bg-danger');
            document.querySelector('#lblIncidenteConsultado').querySelector('p').classList.add('visually-hidden');
            document.querySelector('#lblIncidenteConsultado').querySelector('ol').classList.remove('visually-hidden');
            const htmlincidentes = reporterobado.map(rr => `<li class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto"><div class="text-start fw-bold">${rr.fecha}</div>${rr.incidente}</div></li>`).join('');
            document.querySelector('#lblIncidenteConsultado').querySelector('ol').innerHTML = htmlincidentes;
        } else {
            document.querySelector('.btndiagnostico').classList.remove('visually-hidden');
            document.querySelector('#lblReportadoConsultado').classList.add('text-bg-success');
            document.querySelector('#lblReportadoConsultado').classList.remove('text-bg-danger');
            document.querySelector('#lblIncidenteConsultado').querySelector('p').classList.remove('visually-hidden');
            document.querySelector('#lblIncidenteConsultado').querySelector('ol').classList.add('visually-hidden');
        }
    }
});

const btnIrADiagnosticar = document.querySelector('#btnIrADiagnosticar');
btnIrADiagnosticar.addEventListener('click', () => {
    document.querySelector('.pnlverificarimei').classList.add('visually-hidden');
    document.querySelector('.pnlregistrardiagnostico').classList.remove('visually-hidden');
    document.querySelector('#txtNroImeiRegistro').value = document.querySelector('#lblNroImeiConsultado').textContent;
    document.querySelector('#txtNroImeiRegistro').disabled = true;
});

const btnFiltrarTickets = document.querySelector('#btnFiltrarTickets');
btnFiltrarTickets.addEventListener('click', () => {
    document.querySelector('.accordion-button').click();
    const datosTickets = compania.listarTickets();
    if (datosTickets.length > 0) {
        document.querySelector('.tblticketsgenerados').classList.remove('visually-hidden');
        const htmldatostickets = datosTickets.map(t => `<tr><td>${t.codigo}</td><td>${t.fecha}</td><td>${t.estado}</td><td><div class="w-100 d-flex justify-content-center gap-1"><button class="btn btn-sm btn-warning"><i class="fa-solid fa-eye"></i></button><button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button></div></td></tr>`).join('');
        document.querySelector('.tblticketsgenerados').querySelector('tbody').innerHTML = htmldatostickets;
    } else {
        document.querySelector('.tblticketsgenerados').classList.add('visually-hidden');
        document.querySelector('.tblticketsgenerados').querySelector('tbody').innerHTML = '';
    }
});

const btnGenerarTicket = document.querySelector('#btnGenerarTicket');
btnGenerarTicket.addEventListener('click', (e) => {
    e.preventDefault();
    const codigogene = Math.floor(100000 + Math.random() * 900000);
    const fecha = document.querySelector('#txtFechaTicketRegistro').value;
    const imei = document.querySelector('#txtNroImeiRegistro').value;
    const diagnostico = document.querySelector('#txtDiagnosticoRegistro').value;
    const estado = 'INGRESADO';
    const codsucursal = obtenerValorLocalStorage('sucursal_logueada');
    const tecnico = obtenerValorLocalStorage('tecnico_datos');
    
    const ticketGenerado = new Ticket(codigogene,fecha,imei,diagnostico,estado,codsucursal,tecnico.codigo);
    compania.tickets.push(ticketGenerado);

    Swal.fire({
        title: "Ticket Registrado!",
        text: "Se registró el ticket correctamente!",
        icon: "success"
    }).then((result) => {
        if (result.isConfirmed) {
            limpiarPanelRegistrarDiagnostico();
            limpiarPanelVerificarImei();
            mostrarPanel('pnlverificarimei');
        }
    });
});