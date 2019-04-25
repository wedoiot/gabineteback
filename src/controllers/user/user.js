'use strict'
const { generateError, generateResponse} = require('../../response');

const { verifyUser } = require('../../core/security/user');

function prueba(req, res) {
    return res.status(200).send({ message: "Hola mundo" });
}

async function register(req, res) {
    var params = req.body;

    try{
       var user =await verifyUser(params);
       return res.status(200).send(generateResponse(user,''));  
    }
    catch(error){
        return res.status(500).send(generateError(error));  
    }
     
}

module.exports = {
    prueba,
    register
}