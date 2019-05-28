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

module.exports = {
    allRoles,
}