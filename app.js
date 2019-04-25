'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var app = express();

app.use(helmet())

//cargar rutas
const user_routes = require('./src/routes/user/user.routes');
const auth_routes = require('./src/routes/auth/login.routes')

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
// lo que reciva lo vuelve json
app.use(bodyParser.json());
//cors --> configurar las cabeceras http

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

//rutas
app.use('/api',user_routes);
app.use('/api',auth_routes);

// exportar
module.exports =app;