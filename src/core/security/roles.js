'use strict'

const Role = require('../../models/security/role');
const RoleMenu = require('../../models/security/role_menu');

const allRoles = () => {
    return new Promise((resolve, reject) => {
        Role.find().exec((err, roles) => {
            if (err) {
                for (var field in err.errors) {
                    reject(err.errors[field]);
                }
            }
            resolve(roles);
        })
    })
}

const getRole = (id) => {
    return new Promise((resolve, reject) => {
        Role.findById(id).exec((err, role) => {
            if (err) {
                for (var field in err.errors) {
                    reject(err.errors[field]);
                }
            }
            resolve(role);
        })
    })
}

const setStateRole = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            var role = new Role();
            role = await getRole(params.id);
            if (role) {
                role.active = params.active;
                Role.findOneAndUpdate({ _id: params.id }, role, { new: true }, (err, newRole) => {
                    if (err) {
                        for (var field in err.errors) {
                            reject(err.errors[field]);
                        }
                    }
                    resolve(newRole);
                });
            }
        }
        catch (err) {
            reject(err);
        }
    })
}

const createRoleMenu = (params) => {
    return new Promise(async (resolve, reject) => {
        var roleMenu = new RoleMenu();
        roleMenu = setRoleMenu(params);
        try {
            var existRMenu = await existRolMenu(roleMenu)
            if (existRMenu.exist) {
                //switchea hacia modelo 2. o modelo simple update
                // para no almacenar un array. sino ingresar dentro de array
                var roleMenu = setSingleRoleMenu(params);
                if (isNewMenu(existRMenu.obj, roleMenu)) {
                    existRMenu.obj.menu.push(roleMenu.menu);
                    try{
                        resolve(await updateRoleMenu(existRMenu.obj));
                    }
                    catch(err){
                        reject(err)
                    }
                }
                else{
                    if (isNewSubMenu(existRMenu.obj,roleMenu)) {  
                        existRMenu.obj.menu[0].submenu.push(roleMenu.menu.submenu)
                        await updateRoleMenu(existRMenu.obj)
                        try{
                            resolve(await updateRoleMenu(existRMenu.obj));
                        }
                        catch(err){
                            reject(err)
                        }
                    }
                    else{
                        resolve("Los menú no se alteraron. probablemente ya tenia los permisos")
                    }
                }
            }
            else {
                roleMenu.save((err, roleMenuStored) => {
                    if (err) reject(err);
                    resolve(roleMenuStored);
                })
            }
        }
        catch (error) {
            reject(error)
        }

    });
}

const existRolMenu = (roleMenu) => {
    return new Promise((resolve, reject) => {
        RoleMenu.findOne({ role: roleMenu.role }).exec((err, rolemenu) => {
            if (err) reject(err);
            if (rolemenu != null || rolemenu != undefined) {
                var res = {
                    exist: true,
                    obj: rolemenu
                }
                resolve(res)
            }
            else {
                var res = {
                    exist: false
                }
                resolve(res)
            }
        })
    })

}

function setRoleMenu(params) {
    var roleMenu = new RoleMenu();
    if (params.role && params.menu) {
        roleMenu.role = params.role;
        roleMenu.menu = params.menu;
    }
    return roleMenu;
}

function setSingleRoleMenu(params) {
    if (params.role && params.menu) {
        var modelo = {
            role: params.role,
            menu: {
                _id: params.menu[0]._id,
                name: params.menu[0].name,
                link: params.menu[0].link,
                submenu: {
                    _id: params.menu[0].submenu[0]._id,
                    name: params.menu[0].submenu[0].name,
                    link: params.menu[0].submenu[0].link
                }
            }
        }
        return modelo;
    }
    return null;
}

function isNewMenu(listMenus,menu){
    var items = [];
    for(var i = 0; i < listMenus.menu.length; ++i){
        if(new String(listMenus.menu[i]._id).valueOf() == new String(menu.menu._id).valueOf()){
            items.push(listMenus.menu[i]._id)
        }
    }
    return (items.length>0)?false:true;
}

function isNewSubMenu(listMenus,menu){
    var items = [];
    for(var i = 0; i < listMenus.menu.length; ++i){
        if(new String(listMenus.menu[i]._id).valueOf() == new String(menu.menu._id).valueOf()){
            for(var j = 0; j < listMenus.menu[i].submenu.length; ++j){
                if(new String(listMenus.menu[i].submenu[j]._id).valueOf() == new String(menu.menu.submenu._id).valueOf()){
                    items.push(listMenus.menu[i].submenu[j]._id)
                }
            }
            
        }
    }
    return (items.length>0)?false:true;
}

const updateRoleMenu = (listRoleMenu) =>{
    return new Promise((resolve,reject)=>{
        RoleMenu.findOneAndUpdate({_id:listRoleMenu._id}, listRoleMenu,{new: true}, (err,roleMenuUpdated)=>{
            if (err) {
                for (var field in err.errors) {
                    reject(err.errors[field]);
                }
            }
            resolve(roleMenuUpdated);
        })
    })
}
module.exports = {
    allRoles,
    getRole,
    setStateRole,
    createRoleMenu
}