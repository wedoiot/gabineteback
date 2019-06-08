'use strict'
const { generateError, generateResponse } = require('../../response');
var { createGabinete} = require('../../core/configuration/gabinete');

function prueba (req,res){
    res.status(200).send({message:"ok"});
}

async function create(req, res){
    var params = req.body;
    try{
        var response = await createGabinete(params);
        return res.status(200).send(generateResponse(response,'Se creo el gabinete correctamente! '))
    }
    catch(err){
        return res.status(500).send(generateError(err));
    }
}

module.exports = {
    prueba,
    create
}