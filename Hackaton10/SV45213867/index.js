const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function conectar() {
    try {
        await client.connect();
        console.log("Conexión establecida con éxito a la base de datos.");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

// Llamamos a la función para conectar antes de ejecutar cualquier operación CRUD
conectar();

async function crud(base, coleccion, accion, filtro = null, data = null) {
    try {
        // Comprobamos si la conexión está establecida antes de realizar la operación CRUD
        if (!client.isConnected()) {
            console.error("La conexión a la base de datos no está establecida.");
            return;
        }

        const db = client.db(base);
        const collection = db.collection(coleccion);
        let respuesta = null;
        switch (accion) {
            case "leerUno":
                if (filtro !== null) {
                    respuesta = await collection.findOne(filtro);
                } else {
                    respuesta = await collection.findOne();
                }
                break;
            case "leerTodos":
                if (filtro !== null) {
                    respuesta = await collection.find(filtro).toArray();
                } else {
                    respuesta = await collection.find().toArray();
                }
                break;
            case "agregarUno":
                if (data !== null) {
                    respuesta = await collection.insertOne(data);
                } else {
                    respuesta = "no se puede agregar"
                }
                break;
            default:
                respuesta = "Acción no válida";
                break;
        }
        return respuesta;
    } catch (error) {
        console.error("Error en operación CRUD:", error);
    }
}

// Ejemplo de uso del CRUD
async function ejemploCRUD() {
    // Insertar compra de materia prima
    const compraMateriaPrima = {
        material: "Madera",
        cantidad: 1000,
        fecha_compra: new Date(),
        proveedor: "Proveedor A",
        precio_unitario: 15.75
    };
    const resultadoInsertarMateriaPrima = await crud("SV45213867", "compra_materia_prima", "agregarUno", null, compraMateriaPrima);
    console.log("Resultado de insertar compra de materia prima:", resultadoInsertarMateriaPrima);

    // Insertar compra de insumos
    const compraInsumos = {
        insumo: "Tornillos",
        cantidad: 500,
        fecha_compra: new Date(),
        proveedor: "Proveedor B",
        precio_unitario: 2.50
    };
    const resultadoInsertarInsumos = await crud("SV45213867", "compra_insumos", "agregarUno", null, compraInsumos);
    console.log("Resultado de insertar compra de insumos:", resultadoInsertarInsumos);

    // Insertar gestión de personal
    const gestionPersonal = {
        nombre: "Juan Perez",
        puesto: "Operario",
        salario: 2000,
        fecha_contratacion: new Date()
    };
    const resultadoInsertarGestionPersonal = await crud("SV45213867", "gestion_personal", "agregarUno", null, gestionPersonal);
    console.log("Resultado de insertar gestión de personal:", resultadoInsertarGestionPersonal);

    // Insertar producción
    const produccion = {
        producto: "Armario de madera",
        cantidad_producida: 20,
        fecha_produccion: new Date(),
        responsable: "Juan Perez"
    };
    const resultadoInsertarProduccion = await crud("SV45213867", "produccion", "agregarUno", null, produccion);
    console.log("Resultado de insertar producción:", resultadoInsertarProduccion);
}

