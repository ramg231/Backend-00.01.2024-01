import { compania } from './compania.js'
import { guardarLocalStorage } from './utilitarios.js'

const btnLoguearSistema = document.getElementById('btnLoguearSistema');
btnLoguearSistema.addEventListener('click', () => {
    const usuario = document.querySelector('#txtUsuario').value;
    const clave = document.querySelector('#txtPassword').value;

    const usuariologueado = compania.loguearUsuario(usuario,clave);
    if (!usuariologueado) {
        alert('Usuario no existe');
        return;
    }

    guardarLocalStorage('usuario_datos',usuariologueado);
    window.location.href = 'panelcliente.html';
});