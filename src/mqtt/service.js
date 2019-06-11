'use strict'
var Mqtt = require('../models/mqtt/listenmqtt');

const insertMqtt = (params) =>{
    return new Promise((resolve, reject) => {
        var mqtt = new Mqtt();
        mqtt = validateMqtt(params);

        mqtt.save((err, mqttStored)=> {
            if(err) reject(err);

            resolve(mqttStored);
        })
    })
    
}

const validateMqtt = (params) =>{
    var mqtt = new Mqtt();
    mqtt.topic = params.topic;
    mqtt.message = params.message;
    
    return mqtt;
}

module.exports = {
    insertMqtt,
}