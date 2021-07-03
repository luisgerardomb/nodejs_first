# Proyecto BackEnd

## Desarrollado con 

* [NodeJS](https://nodejs.org/es/)
* [ExpressJS](https://expressjs.com/es/)
* [MongoDB](https://www.mongodb.com/)

## Dependencias
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express-validator](https://www.npmjs.com/package/express-validator)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [mongoose](https://mongoosejs.com/)

## Dependencias de desarrollo

* [nodemon](https://www.npmjs.com/package/nodemon)

## Estructura de archivos
```
├── controllers
│   └── userController.js
├── database
│   └── config.js
├── helpers
|   └── jwt.js
├── middlewares
│   ├── fieldValidator.js
│   └── jwtValidator.js
├── models
│   └── userModel.js
├── node_modules
├── public
├── routes
│   └── user.js
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

## Scripts

```
npm run dev  
```
```
npm start 
```

### Instalación

Instalar las dependencias necesarias para el funcionamiento del proyecto
```
npm install
```

El proyecto hace uso de valiables de entorno por lo cual es recomendable hacer una copia del archivo _.env.example_, el cual contiene lo siguente

```
PORT= Puerto en el cual se accede a la aplicación
DB_CNN= Conexión a la base de datos
JWT_SECRET= Secreto para la creación de JWT
```

## Pruebas

Pruebas de rutas realizadas en

* [Postman](https://www.postman.com/)

### Crear usuarios

_Ruta para la creación de usuarios_

```
POST /api/user/create
Body 
{
    "name": String,
    "email": String,
    "phone": Number,
    "password": String,
    "age": Number,
    "gender": String,
    "hobbie": String
}
```

### Obtener todos los usuarios

_Ruta para obtener todos los usuarios_

```
GET /api/user/get/
Query Params
token
```

### Obtener usuarios por nombre y/o hobbie

_Ruta para obtener usuarios por nombre y/o hobbie_

```
GET /api/user/search
Query Params
token
name *opcional
hobbie *opcional
```

### Eliminar usuario de la base por id

_Ruta para eliminar usuario de la base por id_

```
DELETE /api/user/destroy
Query Params
token
uid
```

### Obtener usuarios mayores de 18, genero Femenino, creados en los ultimos tres días

_Ruta para obtener usuarios mayores de 18, genero Femenino, creados en los ultimos tres días_

```
GET /api/user/filterByAgeAndGender
Query Params
token
```
