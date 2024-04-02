import { compania } from './compania.js'
import { obtenerValorLocalStorage, limpiarTodoLocalStorage } from './utilitarios.js'

let usuarioLogueado = null;

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

document.addEventListener("DOMContentLoaded", function (event) {
    usuarioLogueado = obtenerValorLocalStorage('usuario_datos');
    document.querySelector('#lblCompania').textContent = compania.nombre;
    document.querySelector('#lblUsuarioLogueado').textContent = `Hola, ${usuarioLogueado.nombre} ${usuarioLogueado.apellido}`;
});

const linkCerrarSession = document.querySelector('#link-logout');
linkCerrarSession.addEventListener('click', (e) => {
    e.preventDefault();
    limpiarTodoLocalStorage();
    window.location.href = '../../index.html';
});

const linkMisTickets = document.querySelector('#link-mistickets');
linkMisTickets.addEventListener('click', (e) => {
    e.preventDefault();
    const mistickets = compania.consultarMisTickets(usuarioLogueado.codigo);
    const htmldatostickets = mistickets.map(t => `<tr><td>${t.codigo}</td><td>${t.fecha}</td><td>${t.estado}</td><td><div class="w-100 d-flex justify-content-center gap-1"><button class="btn btn-sm btn-warning"><i class="fa-solid fa-eye"></i></button><button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button></div></td></tr>`).join('');
        document.querySelector('.tblmistickets').querySelector('tbody').innerHTML = htmldatostickets;
    document.querySelector('.navbar-toggler').click();
    mostrarPanel('pnlmistickets');
});