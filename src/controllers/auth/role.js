'use strict'

const Role = require('../../models/security/role');
const {generateResponse, generateError} = require('../../response');
const {allRoles} = require ('../../core/security/roles');


//Método solo para registrar roles (no invocar en el cliente)
function registerRoles(req,res) {
    let role = new Role();
    role.name = "USER_ROLE",
    role.description = " ";

    role.save((err,saved)=>{
        if (err) return res.status(500).send({message:"Error al registar el role"});

        return res.status(200).send(saved);
    })
}

//LISTA DE TODOS LOS ROLES

async function getRoles(req, res){
    try{
        let roles = await allRoles();
        return res.status(200).send(generateResponse(roles, ''));
    }
    catch(error){
        return res.status(500).send(generateError(error));
    }
}




module.exports = {
    registerRoles,
    getRoles,
}