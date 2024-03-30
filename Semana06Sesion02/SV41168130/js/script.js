console.log("Inicio del Programa")


//creamos la clase Dispositivo
class Dispositivo {
    constructor(iMei, nroSerie) {
        this.iMei = iMei;
        this.nroSerie = nroSerie;
        this.revision = false;
        this.diagnostico = "";
        this.pago = false;
        this.valorReparacion = 0;
        this.autorizacion = true;
        this.repuestos = null;
        this.estado = "";
    }
    toJson() {
        return JSON.stringify({ iMei: this.iMei, nroSerie: this.nroSerie });
    }
    revisarReporteRobo() {
        //retorna aleatoriamente si esta robado o no
        return Math.random() > 0.5 ? true : false;
    }
    iniciarDiagnostico() {
        // si el pago y la autorizacion es correcta procede al diagnostico
        if (this.autorizacion && this.pago) {
            this.diagnostico = prompt("Escribe el Diagnostico");
            this.estado = "En Diagnostico";
        }
        else {
            alert("La autorizacion o el pago no esta realizado")
        }
    }
    recibirPago() {
        // no implementado completo pero pone el pago en true
        this.pago = true;
    }

}

// definimos la clase persona
class Persona {
    constructor(nombre, apellido, nroIdentificacion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nroIdentificacion = nroIdentificacion;
    }
}

// definimos la clase cliente a partir de persona
class Cliente extends Persona {
    constructor(nombre, apellido, nroIdentificacion, nroTelefono, direccion, dispositivo) {
        super(nombre, apellido, nroIdentificacion);
        this.nroTelefono = nroTelefono;
        this.direccion = direccion;

        this.dispositivo = dispositivo;
    }
    toJson() {
        return JSON.stringify({
            nombre: this.nombre,
            apellido: this.apellido,
            nroIdentificacion: this.nroIdentificacion,
            nroTelefono: this.nroTelefono,
            direccion: this.direccion
        })
    }
    // no implementado aun pero confirma la autorizacion del clente para la reparacion
    autorizar(telefono) {
        telefono.autorizacion = confirm("Auroriza la reparacion del Telefono");
    }

}


// definimos la clase tecnico a partir de persona
class Tecnico extends Persona {
    constructor(nombre, apellido, nroIdentificacion, skills) {
        super(nombre, apellido, nroIdentificacion);
        this.skills = skills;
    }
    toJson() {
        return JSON.stringify({
            nombre: this.nombre,
            apellido: this.apellido,
            nroIdentificacion: this.nroIdentificacion,
            skills: this.skills
        })
    }
}

// definimos la clase administrador a partir de persona
class Administrador extends Persona {
    constructor(nombre, apellido, nroIdentificacion, tienda) {
        super(nombre, apellido, nroIdentificacion);
        this.tienda = tienda;
    }
    toJson() {
        return JSON.stringify({
            nombre: this.nombre,
            apellido: this.apellido,
            nroIdentificacion: this.nroIdentificacion,
            tienda: this.tienda
        })
    }
    // recibe el dispositivo y crea al clente
    recibirDispositivo() {
        let imei = prompt("Ingresa el IMEI");
        let nroSerie = prompt("Ingresa el numero de Serie");
        let objDispositivo = new Dispositivo(imei, nroSerie);
        let nombre = prompt("Escribe el nombre del cliente");
        let apellido = prompt("Escribe el apellido del clente");
        let nroIdentificacion = prompt("Escribe el DNI del cliente");
        let nroTelefono = prompt("Escribe el numero de telefono del cliente")
        let direccion = prompt("Escribe la direccion decl cleinte");
        let cliente = new Cliente(nombre, apellido, nroIdentificacion, nroTelefono, direccion, objDispositivo);
        arrCliente.push(cliente);
    }
}

let arrDispositivos = [];
let arrCliente = [];


let admin = new Administrador("Roberto", "Pineda", "CE 001575291", "Principal")

// eventos de los botones
//<<<<<<< HEAD:Semana06Sesion02/d19423/js/script.js
//document.getElementById("recibirDispositivo").addEventListener("click", recibirDispositivo);
//document.getElementById("borrarData").addEventListener("click", borrarData);
//=======
document.getElementById("recibirDispositivo").addEventListener("click", recibirDispositivo);
document.getElementById("testDatabase").addEventListener("click", LoadDatabase);
document.getElementById("borrarData").addEventListener("click", borrarData);
//>>>>>>> fuentes/main:Semana06Sesion02/SV41168130/js/script.js


// callback del evento del boton recibirDispositivo
function recibirDispositivo() {
    admin.recibirDispositivo();
    //guarda la data en el localstorage
    guardarData("cliente", arrCliente);
    console.log(arrCliente)
    arrCliente.forEach(element => {
        arrDispositivos.push(element.dispositivo)
    });
    // cargamos la info en la taba
    $table.bootstrapTable('load', arrDispositivos)
}

function guardarData(nombre, data) {
    //cargar la info en el localstorage
    localStorage.setItem(nombre, JSON.stringify(data));
}

function borrarData() {

    // borramos la data del localstorage
    guardarData("cliente", null);
    arrCliente = [];
    arrDispositivos = [];

    $table.bootstrapTable('load', arrDispositivos)
}

// inicializar los objetos desde la informacion que esta en el localstorage
function init() {
    let jsonCliente = null;
    let localData = localStorage.getItem("cliente");
    console.log(localData);
    if (localData !== null && localData !== "null") {
        jsonCliente = JSON.parse(localData);
    }
    else {
        jsonCliente = [];
    }

    jsonCliente.forEach(element => {
        let arrJsonDispositivo = element.dispositivo;
        console.log(arrJsonDispositivo)
        objDispositivo = new Dispositivo(arrJsonDispositivo.iMei, arrJsonDispositivo.nroSerie)
        arrCliente.push(new Cliente(
            element.nombre,
            element.apellido,
            element.nroIdentificacion,
            element.nroTelefono,
            element.direccion,
            objDispositivo))
    });


    arrCliente.forEach(element => {
        arrDispositivos.push(element.dispositivo)
    });

    $table.bootstrapTable({ data: arrDispositivos })


}

//var $table = $('#tblDispositivos');

// evento cuando se termina de cargar la pagina web
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    init();
});

//evento cuando hacemos click en una fila de la tabla
$table.on('click-row.bs.table', function (row, $element, field) {

    console.log($element);
    if (confirm(`Desea modificar el estado del dispositivo ${$element.iMei}???`)) {

        let objDispositivo = buscarDispositivo($element.iMei);
        if (objDispositivo.revisarReporteRobo()) {
            alert("El dispositivo esta reportado como robado")
        } else {
            console.log("No esta robado")
            objDispositivo.recibirPago();
            objDispositivo.iniciarDiagnostico()

        }
    }
    $table.bootstrapTable('load', arrDispositivos)
})

// busca un dispositivo desde el array

function buscarDispositivo(imei) {

    for (let index = 0; index < arrDispositivos.length; index++) {
        const element = arrDispositivos[index];
        if (element.iMei === imei) {
            return element;
        }

    }
}