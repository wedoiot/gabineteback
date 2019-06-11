'use strict' 
var Gabinete = require('../../models/configuration/gabinetes');

const createGabinete = (params) =>{
    return new Promise((resolve,reject)=> {
        var gabinete= new Gabinete();
        gabinete = validateGabinete(params);
        gabinete.save((err,gabineteStored) => {
            if(err) reject(err)

            resolve(gabineteStored);
        })
    })
}

const validateGabinete = (params) =>{
    // crear gabinete
    var gabinete = new Gabinete();
    gabinete.name = params.name;
    gabinete.location = params.location;
    gabinete.description = params.description;
    gabinete.reboot = params.reboot;
    gabinete.energy = params.energy;
     return gabinete;
}

module.exports = {
    createGabinete,
}



