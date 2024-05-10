##Crear usuario
POST http://localhost:3001/api/users/

{
    "name": "Omar",
    "email":"omar@gmail.com",
    "password": "1234"
}

##Modifica usuario
PATCH http://localhost:3001/api/users/66345e65121fa00bd0cb8ac6

{
    "name": "Omar_Lobo",
    "email":"omar@gmail.com",
    "password": "1234"
}

#Elimina usuario
DELETE http://localhost:3001/api/users/66345e65121fa00bd0cb8ac6



##Crear Curso
POST http://localhost:3001/api/course

{
    "name": "JAVA",
    "description": "Curso de JAVA",
    "image": "image.jpg",
    "frontPage": "frontPage.jpg",
    "price": 100
}

## Crear Cupon
POST http://localhost:3001/api/coupon

{
    "code": "123",
     "discount": 10
}

## Crear Orden
POST http://localhost:3001/api/order

{
    "user": "66345e65121fa00bd0cb8ac6",
    "details": [
        {
            "course": "663460bb02a6ae12142d8391"
        }
            ],
    "price": 200
}