const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('sample_mflix');
        const collection = db.collection('movies');

        // Find the first document in the collection
        const first = await collection.findOne();
        console.log(first);
    } finally {
        // Close the database connection when finished or an error occurs
        await client.close();
    }
}
//run().catch(console.error);
async function crud(base, coleccion, accion, filtro = null, data = null) {
    try {
        await client.connect();
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

// let res = crud("sample_mflix", "movies", "leerUno").then((res) => {
//     console.log(res);
// });

// let opciones = { year: 2001 };
// let res2 = crud("sample_mflix", "movies", "leerTodos", opciones).then((res) => {
//     console.log(res)
// });

let strIngresar = `{
    "plot": "In Paris a wild girl becomes possessed by the soul of her twin who died to save her life.",
    "genres": [
      "Drama"
    ],
    "runtime": 82,
    "cast": [
      "Betty Compson",
      "Clive Brook",
      "Henry Victor",
      "A.B. Imeson"
    ],
    "title": "White Shadows",
    "fullplot": "In Paris a wild girl becomes possessed by the soul of her twin who died to save her life.",
    "languages": [
      "English"
    ],
    "released": {
      "$date": {
        "$numberLong": "-1440892800000"
      }
    },
    "directors": [
      "Graham Cutts"
    ],
    "writers": [
      "Alfred Hitchcock",
      "Michael Morton (novel)"
    ],
    "awards": {
      "wins": 1,
      "nominations": 0,
      "text": "1 win."
    },
    "lastupdated": "2015-05-10 00:19:38.277000000",
    "year": 1924,
    "imdb": {
      "rating": 6.5,
      "votes": 156,
      "id": 15493
    },
    "countries": [
      "UK"
    ],
    "type": "movie",
    "tomatoes": {
      "viewer": {
        "rating": 2.8,
        "numReviews": 11
      }
      
    },
    "num_mflix_comments": 0
  }`;

// let objIngreso = JSON.parse(strIngresar);
// console.log(objIngreso)
// res2 =  crud("sample_mflix", "movies", "agregarUno",null,objIngreso).then((res)=>{
//     console.log(res)
// });

let strIngresarMuchos = `[{
    "plot": "In Paris a wild girl becomes possessed by the soul of her twin who died to save her life.",
    "genres": [
      "Drama"
    ],
    "runtime": 82,
    "cast": [
      "Betty Compson",
      "Clive Brook",
      "Henry Victor",
      "A.B. Imeson"
    ],
    "title": "White Shadows",
    "fullplot": "In Paris a wild girl becomes possessed by the soul of her twin who died to save her life.",
    "languages": [
      "English"
    ],
    "released": {
      "$date": {
        "$numberLong": "-1440892800000"
      }
    },
    "directors": [
      "Graham Cutts"
    ],
    "writers": [
      "Alfred Hitchcock",
      "Michael Morton (novel)"
    ],
    "awards": {
      "wins": 1,
      "nominations": 0,
      "text": "1 win."
    },
    "lastupdated": "2015-05-10 00:19:38.277000000",
    "year": 1924,
    "imdb": {
      "rating": 6.5,
      "votes": 156,
      "id": 15493
    },
    "countries": [
      "UK"
    ],
    "type": "movie",
    "tomatoes": {
      "viewer": {
        "rating": 2.8,
        "numReviews": 11
      }
      
    },
    "num_mflix_comments": 0
  },{
    "plot": "In Paris a wild girl becomes possessed by the soul of her twin who died to save her life.",
    "genres": [
      "Drama"
    ],
    "runtime": 82,
    "cast": [
      "Betty Compson",
      "Clive Brook",
      "Henry Victor",
      "A.B. Imeson"
    ],
    "title": "White Shadows",
    "fullplot": "In Paris a wild girl becomes possessed by the soul of her twin who died to save her life.",
    "languages": [
      "English"
    ],
    "released": {
      "$date": {
        "$numberLong": "-1440892800000"
      }
    },
    "directors": [
      "Graham Cutts"
    ],
    "writers": [
      "Alfred Hitchcock",
      "Michael Morton (novel)"
    ],
    "awards": {
      "wins": 1,
      "nominations": 0,
      "text": "1 win."
    },
    "lastupdated": "2015-05-10 00:19:38.277000000",
    "year": 1924,
    "imdb": {
      "rating": 6.5,
      "votes": 156,
      "id": 15493
    },
    "countries": [
      "UK"
    ],
    "type": "movie",
    "tomatoes": {
      "viewer": {
        "rating": 2.8,
        "numReviews": 11
      }
      
    },
    "num_mflix_comments": 0
  }]`;

// let arrInsertar = JSON.parse(strIngresarMuchos);
// crud("sample_mflix", "movies", "agregarVarios", null, arrInsertar).then((res) => {
//     console.log(res)
// });


let filtro = { title: "White Shadows" }
let data = { $set: { year: 1925 } }
// crud("sample_mflix", "movies", "actualizarUno", filtro, data).then((res) => {
//     console.log(res)
// });

// crud("sample_mflix", "movies", "actualizarVarios", filtro, data).then((res) => {
//     console.log(res)
// });

// crud("sample_mflix", "movies", "borrarUno", filtro).then((res) => {
//     console.log(res)
// });

crud("sample_mflix", "movies", "borrarVarios", filtro).then((res) => {
    console.log(res)
});