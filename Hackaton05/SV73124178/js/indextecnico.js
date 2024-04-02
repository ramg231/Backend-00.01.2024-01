import { compania } from './compania.js'
import { guardarLocalStorage } from './utilitarios.js'

const cargarSucursalesCompania = () => {
    const htmlsucursales = compania.sucursales.map(suc => `<option value="${suc.codigo}">${suc.nombre}</option>`).join('');
    return htmlsucursales;
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector('#cboSucursales').innerHTML += cargarSucursalesCompania();
});

const btnLoguearSistema = document.getElementById('btnLoguearSistema');
btnLoguearSistema.addEventListener('click', () => {
    const codigosucursal = document.querySelector('#cboSucursales').value;
    const usuarioTecnico = document.querySelector('#txtUsuario').value;
    const claveTecnico = document.querySelector('#txtPassword').value;
    
    const tecnico = compania.loguearTecnico(codigosucursal,usuarioTecnico,claveTecnico);
    if (!tecnico) {
        alert('Técnico no existe');
        return;
    }
    guardarLocalStorage('tecnico_datos',tecnico);
    guardarLocalStorage('sucursal_logueada',codigosucursal);
    window.location.href = 'paneltecnico.html';
});