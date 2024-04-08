# FUNCIONAMIENTO
Hay 3 metodos (get para obtener datos) (post para crear datos)  (delete para borrar datos)

EJEMPLO CON TABLA MASCOTA

## PARA OBTENER
Se coloca en POSTMAN en GET http://localhost:4000/api/mascota para obtener los datos

## PARA CREAR
Se coloca en POSTMAN en POST http://localhost:4000/api/mascota y en el body en formato JSON se coloca toda la información necesaria sin el ID en los casos auto incrementales.
Por ejemplo:

{
        "nombre": "Pancho",
        "fechaNacimiento": "2022-07-01",
        "idEspecie": 1,
        "idRaza": 1,
        "idSexo": 2,
        "idPropietario": 1,
        "activo": 1,
        "usuarioCreacion": 1,
        "fechaCreacion": "2023-11-06T22:11:17.000Z",
        "usuarioModificacion": 1,
        "fechaModificacion": "2024-01-30T21:12:18.000Z"
    }

## PARA BORRAR
Se coloca en POSTMAN en DELETE http://localhost:4000/api/("aqui ira el primary key para identicar el elemento a borrar")

## NOTA
MODIFICAR CON LAS CREDENCIALES PROPIAS EN EL ARCHIVO .env.example, UNA VEZ MODIFICADO CAMBIAR EL NOMBRE DEL ARCHIVO .env.example A .env 
