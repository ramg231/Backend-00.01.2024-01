import { Sucursal } from './sucursal.js'
import { Usuario, Tecnico } from './usuario.js'
import { Celular } from './celular.js'
import { Ticket } from './ticket.js'
import { Estado } from './estado.js'

class Compania {
    sucursales = [];
    celulares = [];
    tickets = [];
    usuarios = [];

    constructor(codigo,nombre,nroruc) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.nroruc = nroruc;
    }

    agregarSucursales() {
        const sucursal_1 = new Sucursal(1,'Chorrillos');
        this.sucursales.push(sucursal_1);
        sucursal_1.tecnicos.push(new Tecnico(1,'Roberto','Ramirez','87546598',1111,'ANDROID'));
        sucursal_1.tecnicos.push(new Tecnico(2,'Gabriel','Melendez','65986532',1111,'IOS'));
        const sucursal_2 = new Sucursal(2,'Miraflores');
        this.sucursales.push(sucursal_2);
        sucursal_2.tecnicos.push(new Tecnico(3,'Melissa','Lopez','87659821',1111,'ANDROID'));
        sucursal_2.tecnicos.push(new Tecnico(4,'Manuel','Segura','74142536',1111,'IOS'));
    }

    agregarCelulares() {
        this.celulares.push(new Celular('sz45dxvc54','Motorola','G8 Power','ANDROID',true,[
            {fecha: '2024-02-12', incidente: 'Celular fue hurtado en transporte público.'}
        ],3));
        this.celulares.push(new Celular('5sa4dv6s4d','Samsung','S4 Lite','ANDROID',false,[],1));
        this.celulares.push(new Celular('5s64db46vs','Iphone','12 pro max','IOS',false,[],2));
    }

    agregarTickets() {
        this.tickets.push(new Ticket(256658,'2023-12-25','5sa4dv6s4d','Celular en buen estado.','INGRESADO',2,3,1));
    }

    agregarUsuarios() {
        this.usuarios.push(new Usuario(1,'Marco','Alarcón','73124178',1234));
        this.usuarios.push(new Usuario(2,'Irma','Serrano','09491713',1234));
        this.usuarios.push(new Usuario(3,'Roberto','Gomez','09828856',1234));
    }

    buscarCelularXIMEI(codigoimei) {
        const celular = this.celulares.find(cr => cr.imei == codigoimei);
        return celular;
    }

    buscarSucursal(codigosucursal) {
        const sucursal = this.sucursales.find(suc => suc.codigo == codigosucursal);
        return sucursal;
    }

    mostrarNombreSucursal(codigosucursal) {
        const sucursal = this.buscarSucursal(codigosucursal);
        return `${this.nombre} - ${sucursal.nombre}`;
    }

    loguearTecnico(codigosucursal,nrodocumento,clavetecnico) {
        const sucursal = this.buscarSucursal(codigosucursal);
        const tecnico = sucursal.tecnicos.find(tec => tec.nrodocumento == nrodocumento && tec.clave == clavetecnico);
        return tecnico;
    }

    loguearUsuario(nrodocumento,claveusuario) {
        const usuario = this.usuarios.find(usu => usu.nrodocumento == nrodocumento && usu.clave == claveusuario);
        return usuario;
    }

    consultarMisTickets(codcliente) {
        const tickets = this.tickets.filter(t => t.codcliente == codcliente);
        return tickets;
    }

    listarSucursales() {
        return this.sucursales;
    }

    listarTickets() {
        return this.tickets;
    }
}

const compania = new Compania(1,'TelefoniaSAC',20108599687);
compania.agregarSucursales();
compania.agregarCelulares();
compania.agregarTickets();
compania.agregarUsuarios();

export { compania }