'use strict'

const Role = require('../../models/security/role');
const Role_Menu = require('../../models/security/role_menu');
const {generateResponse, generateError} = require('../../response');
const {allRoles, getRole, setStateRole, createRoleMenu} = require ('../../core/security/roles');


function registerRoles(req,res) {

    var params = req.body;
    let role = new Role();
    role.name = params.name,
    role.description = params.description;

    role.save((err,saved)=>{
        if (err) return res.status(500).send({message:"Error al registar el role"});

        return res.status(200).send(saved);
    })
}

async function getRoles(req, res){
    try{
        let roles = await allRoles();
        return res.status(200).send(generateResponse(roles, ''));
    }
    catch(error){
        return res.status(500).send(generateError(error));
    }
}

async function getRoleById(req, res){
    var id = req.params.id;
    try{
        let role = await getRole(id);
        return res.status(200).send(generateResponse(role, ''));
    }
    catch(error){
        return res.status(500).send(generateError(error));
    }
}

async function setState(req,res){
    var params = req.body;
    try{
        let role = await setStateRole(params);
        return res.status(200).send(generateResponse(role, ''));
    }
    catch(error){
        return res.status(500).send(generateError(error));
    }
}

async function registerRoleMenu(req,res){
    var params = req.body;
    try{
        var roleMenu = await createRoleMenu(params);
        return res.status(200).send(generateResponse(roleMenu, ''));
    }
    catch(error){
        return res.status(500).send(generateError(error));
    }
}


module.exports = {
    registerRoles,
    getRoles,
    getRoleById,
    setState,
    registerRoleMenu
}