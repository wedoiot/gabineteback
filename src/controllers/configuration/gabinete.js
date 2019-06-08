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

async function getById(req,res){
    //var id = req.body.id

}

async function getAll(req,res){

}

async function update(req,res){
    var params = req.body;
}

module.exports = {
    prueba,
    create
}