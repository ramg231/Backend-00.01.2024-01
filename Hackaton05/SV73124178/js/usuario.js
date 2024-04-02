class Usuario {
    constructor(codigo,nombre,apellido,nrodocumento,clave) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nrodocumento = nrodocumento;
        this.clave = clave;
    }
}

class Tecnico extends Usuario {
    constructor(codigo,nombre,apellido,nrodocumento,clave,especialidad) {
        super(codigo,nombre,apellido,nrodocumento,clave);
        this.especialidad = especialidad;
    }
}

export { Usuario, Tecnico }