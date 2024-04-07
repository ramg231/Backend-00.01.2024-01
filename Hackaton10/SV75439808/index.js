const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://u18310128:Is5FsYXeClIUqJwV@cluster0.l8ehbli.mongodb.net/";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    // Encuentra el primer documento de la colección.
    const first = await collection.findOne();
    console.log(first);
  } finally {
    // Cerrar la conexión de la base de datos cuando termine o se produzca un error
    await client.close();
  }
}
run().catch(console.error);
