'use strict'

const Menu = require('../../models/security/menu');

const createMenu = (params) =>{
    return new Promise((resolve,reject)=>{
        var menu = new Menu();
        menu = setMenu(params);
        menu.save((err,menuSaved)=>{
            if(err) reject(err);
            resolve(menuSaved);
        })
    });
}

const getMenus = () => {
    return new Promise((resolve,reject)=>{
        Menu.find().exec((err,menus)=>{
            if(err) reject(err);
            resolve(menus);
        })
    });
}

function setMenu(params){
    var menu = new Menu();
    menu.name = params.name;
    menu.link = params.link;
    menu.submenu = params.submenu.map(x=> {
        return {name:x.name, link:x.link}
    });
    return menu;
}

module.exports = {
    createMenu,
    getMenus
}