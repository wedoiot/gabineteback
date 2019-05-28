'use strict'
var mongoose= require('mongoose');
var connection = require('./configuration/connectiondb.json');
var app=require('./app');
var port=3800;

//Conexion Database
/*mongoose.Promise=global.Promise;

mongoose.connect(`${connection.server}`,{ useNewUrlParser: true })
    .then(()=>{
        console.log("La conexion a la base de datos ha sido exitosa")
    
        // Crear servidor
        app.listen(process.env.PORT || port,()=>{
            console.log("Servidor corriendo en http://localhost:3800 ");
        });
    
    })
    .catch(err => console.log(err));*/
    /*
    agregar a white list de mongo atlas la ip donde se va a alojar el api (en este caso heroku)
    */
   // Crear servidor
   app.listen(process.env.PORT || port,()=>{
    console.log("Servidor corriendo en http://localhost:3800 ");
});