'use strict'
const { generateError, generateResponse } = require('../../response');

const { 
    verifyUser, 
    modifyUser, 
    getAUserByToken, 
    getUserList
} = require('../../core/security/user');

function prueba(req, res) {
    return res.status(200).send({ message: "Hola mundo" });
}

async function register(req, res) {
    var params = req.body;
    try {
        var user = await verifyUser(params);
        return res.status(200).send(generateResponse(user, ''));
    }
    catch (error) {
        return res.status(500).send(generateError(error));
    }
}

async function modify(req,res) {
    var params = req.body;

    try{
        var userModify = await modifyUser(params);
        return res.status(200).send(generateResponse(userModify, `Los datos de ${params.username} han sido actualizados.`));

    }
    catch (error) {
        return res.status(500).send(generateError(error));
    }
}

async function getUserByToken(req,res) {
    var headers = req.headers;
    var token = headers.authorization;
    
    try {
        var user = await getAUserByToken(token);
        return res.status(200).send(generateResponse(user, ''));

    }
    catch (error) {
        return res.status(500).send(generateError(error));
    }
}

async function getAllUsers(req,res) {
    try {
        var users = await getUserList();
        return res.status(200).send(generateResponse(users, 'Listado de todos los usuarios'));
    }
    catch(error) {
        return res.status(500).send(generateError(error));
    }
}

module.exports = {
    prueba,
    register,
    modify,
    getUserByToken,
    getAllUsers,
}