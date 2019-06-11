'use strict'

const Role = require('../../models/security/role');

const allRoles = () =>{
    return new Promise ((resolve, reject)=> {
        Role.find().exec((err, roles)=>{
            if(err) {
                for (var field in err.errors) {
                    reject(err.errors[field]);
                }
            }
            resolve(roles);
        })
    })
}

const getRole = (id) =>{
    return new Promise ((resolve, reject)=> {
        Role.findById(id).exec((err, role)=>{
            if(err) {
                for (var field in err.errors) {
                    reject(err.errors[field]);
                }
            }
            resolve(role);
        })
    })
}

const setStateRole = (params) => {
    return new Promise(async(resolve,reject)=>{
        try{
           var role = new Role();
            role = await getRole(params.id);
           if(role){
               role.active = params.active;
               Role.findOneAndUpdate({_id: params.id}, role, {new: true}, (err, newRole) =>{
                if(err) {
                    for (var field in err.errors) {
                        reject(err.errors[field]);
                    }
                }
                resolve(newRole);
               });
           }
        }
        catch(err){
            reject(err);
        }
    })
}

module.exports = {
    allRoles,
    getRole,
    setStateRole
}