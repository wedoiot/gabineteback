'use strict'

var mqtt = require('mqtt')
//var servidorMqtt = require('../../configuration/servermqtt.json');
//var client = mqtt.connect(servidorMqtt.server);
//var client = mqtt.connect(servidorMqtt.server,servidorMqtt.options);
//var client = mqtt.connect("mqtt://test.mosquitto.org");
var client = mqtt.connect("mqtt://mosquitto.org");

//console.log("client")
//console.log(client)
ejemplo();

function ejemplo() {
    //console.log(servidorMqtt);
    client.on('connect', function () {

        client.subscribe('presence', function (err) {
            if (!err) {

                client.publish('presence', 'Hello mqtt')
                console.log(`esta conectado cuando se subscribe? ${client.connected}`);

            }
            else{
                console.log("errorr")
                console.log(error)
            }
        })
    })

    client.on('message', function (topic, message) {
        // message is Buffer
        console.log(message.toString())

        client.end()

    })

    client.publish("presence","hola a todos", function(error,packet){
        if(error){
            console.log("error")
            console.log(error)
        }
        else{
            console.log("aquí deberia mostrar la publicacion")
            console.log(packet)
        }
    })

    console.log(`id último mensaje ${client.getLastMessageId()}`)
    //client.removeOutgoingMessage(client.getLastMessageId())
    
    console.log(`esta conectado? ${client.connected}`);
    //console.log(`esta reconectado? ${client.reconnectig}`);


}