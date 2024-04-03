const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try 
    {
        
        await client.connect();
        const db = client.db('SV72733562');
        const collection = db.collection('Produccion');

        const first = await collection.findOne();
        console.log(first);
    } 
    
    finally 
    {
        
        await client.close();
    }
}

run().catch(console.error);

async function crud(base, coleccion, accion, filtro = null, data = null) {
    try {
        await client.connect();
        const db = client.db(base);
        const collection = db.collection(coleccion);
        let respuesta = null;
        switch (accion) {
            case "buscarUno":
                if (filtro !== null) {
                    respuesta = await collection.findOne(filtro);
                } else {
                    respuesta = await collection.findOne();
                }
                break;
            case "buscarVarios":
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

                case "agregarVarios":
                    if (data !== null) {
                        respuesta = await collection.insertMany(data);
                    } else {
                        respuesta = "no se puede agregar"
                    }
                    break;
                
            case "actualizarUno":
                if (filtro !== null && data !== null) {
                    respuesta = await collection.updateOne(filtro, data);
                } else {
                    respuesta = "no se puede actualizar"
                }
                break;
            case "actualizarVarios":
                if (filtro !== null && data !== null) {
                    respuesta = await collection.updateMany(filtro, data);
                } else {
                    respuesta = "no se puede actualizar"
                }
                break;
            case "borrarUno":
                if (filtro !== null) {
                    respuesta = await collection.deleteOne(filtro);
                } else {
                    respuesta = "no se puede borrar"
                }
                break;
            case "borrarVarios":
                if (filtro !== null) {
                    respuesta = await collection.deleteMany(filtro);
                } else {
                    respuesta = "no se puede borrar"
                }
                break;
            default:
                break;
        }
        return respuesta;
    } finally {
        await client.close();
    }

}


/*

let ejemploBuscarUno = crud("SV72733562", "Proveedores", "buscarUno").then((resultado) => {
console.log(resultado);
});



let buscarV_Filtro = { cargo: "Trabajador" };
let ejemploBuscarVarios = crud("SV72733562", "gestionPersonal", "buscarVarios", buscarV_Filtro).then((resultado) => {
console.log(resultado)
});



let actualizar_Filtro = { _id: "ObjectId('66087d32d34a2174b29c12ef')" }
let data = { $set: { edad: 30 } }

crud("SV72733562", "gestionPersonal", "actualizarUno", actualizar_Filtro, data).then((resultado) => {
console.log(resultado)
});




borrar_Filtro = 99 //profe aca ingrese algun dato porque no quiero borrar mis datos xd

crud("SV72733562", "compraInsumos_Materia", "borrarUno", borrar_Filtro).then((res) => {
console.log(res)
});


*/

let agregarDato = 
   `{
        "nombreProveedor": "Willyrex",
        "calleProveedor": "calle777",
        "telefonoProveedor": "115900000",
        "emailProveedor": "willyrex@gmail.com"
    }`;


let objIngreso = JSON.parse(agregarDato);
console.log(objIngreso)
res2 =  crud("SV72733562", "Proveedores", "agregarUno",null,objIngreso).then((res)=>{
console.log(res)
});
