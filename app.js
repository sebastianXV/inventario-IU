const express = require('express');
const { mongoConn } = require('./databases/configuration');
const dotenv = require('dotenv').config();
const cors = require('cors');

mongoConn();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: '*'
}))

// Rutas
const test = require('./routes/test');
const usuario = require('./routes/usuario');
const tipoEquipo = require('./routes/tipoEquipo');
const estadoEquipo = require('./routes/estadoEquipo');
const marca = require('./routes/marca');
const inventario = require('./routes/inventario');
const auth = require('./routes/auth')


app.use('/api/v1/tests', test);
app.use('/api/v1/usuario', usuario);
app.use('/api/v1/tipoEquipo', tipoEquipo);
app.use('/api/v1/marca', marca);
app.use('/api/v1/inventario', inventario); 
app.use('/api/v1/estadoEquipo', estadoEquipo); 
app.use('/api/v1/auth', auth)


module.exports = app;
