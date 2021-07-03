const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Crear servidor de express
const app = express();

// Conexión base de datos
dbConnection();

// Directorio público
app.use( express.static('public') );

// Lectura y paseo del body
app.use( express.json() );

// Rutas
app.use('/api/user', require('./routes/user'));

app.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`);
});
