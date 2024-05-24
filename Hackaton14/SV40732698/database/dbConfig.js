const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017'; 
const dbName = 'chat'; 

async function connectToDatabase() {
  try {

    await mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexión establecida correctamente a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = connectToDatabase;

