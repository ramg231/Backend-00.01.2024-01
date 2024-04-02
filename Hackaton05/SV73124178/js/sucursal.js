class Sucursal {
    tecnicos = [];

    constructor(codigo,nombre) {
        this.codigo = codigo;
        this.nombre = nombre;
    }

    agregarTecnico(tecnico) {
        this.tecnicos.push(tecnico);
    }
}

export { Sucursal }