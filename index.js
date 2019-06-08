'use strict'
var mongoose= require('mongoose');
const gabinetes = require('./src/models/configuration/gabinetes');
var connection = require('./configuration/connectiondb.json');
var app=require('./app');
var port=3800;


//Conexion Database
mongoose.Promise=global.Promise;

mongoose.connect(`${connection.server}`,{ useNewUrlParser: true })
    .then(()=>{
        console.log("La conexion a la base de datos ha sido exitosa")
    
        // Crear servidor
        app.listen(process.env.PORT || port,()=>{
            console.log("Servidor corriendo en http://localhost:3800 ");
        });
    
    })
    .catch(err => console.log(err));

   // Crear servidor
   /*app.listen(process.env.PORT || port,()=>{
    console.log("Servidor corriendo en http://localhost:3800 ");
});*/