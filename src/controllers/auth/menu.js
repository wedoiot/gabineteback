'use strict'

const Menu = require('../../models/security/menu');
const {generateResponse, generateError} = require('../../response');
const {createMenu,getMenus} = require ('../../core/security/menu');


async function create(req, res){
    var params = req.body;
    try{
        let menu = await createMenu(params);
        return res.status(200).send(generateResponse(menu, ''));
    }
    catch(error){
        return res.status(500).send(generateError(error));
    }
}

async function getAll(req, res){
    var params = req.body;
    try{
        let menus = await getMenus();
        return res.status(200).send(generateResponse(menus, ''));
    }
    catch(error){
        return res.status(500).send(generateError(error));
    }
}


module.exports = {
    create,
    getAll
}