'use strict'
var mongoose= require('mongoose');
const gabinetes = require('./src/models/gabinetes');
var connection = require('./configuration/connectiondb.json');
var app=require('./app');
var port=3800;



//posting to database

app.post('/api/gabinetes', (req, res)=>{
    res.status(200, {message: 'Bien!!'})
    console.log(req.body)

    let datos = new gabinetes()
    datos.ubicacion = req.body.ubicacion
    datos.descripcion = req.body.descripcion
    datos.reboot = req.body.reboot
    datos.energy = req.body.energy
    datos.door = req.body.door
    datos.relay1 = req.body.relay1
    datos.relay2 = req.body.relay2

    datos.save((err, gabineteStored)=>{
        if(err) res.status(500).send({message: "Error al guardar datos"})
        res.status(200).send({datos: gabineteStored})
    })

  
})

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