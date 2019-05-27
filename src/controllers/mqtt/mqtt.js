'use strict'
var mqtt = require('mqtt')
var client = mqtt.connect("mqtt://mosquitto.org");


client.on('connect', () => {
    if (client.connected) {
        console.log("estamos ON!");
    }
    else {
        console.log("debemos reconectar ....")
    }
})

client.on('message', function (topico, message) {
    // message is Buffer
    console.log("estamos en ON MESSAGE!!!")
    console.log(`el topico que recibe la publicacion es: ${topico} `)
    console.log(`el mensaje que recibe el topico es: ${message.toString()}`)

    //client.end()

})

function close() {
    client.end();
}

function subcribe(req, res) {
    let params = req.body;
    if (client.connected) {
        client.subscribe(params.topico, (error) => {
            if (!error) {
                return res.status(200).send({ message: "melo" });
            }
            else {
                return res.status(404).send({ message: "no tan melos" })
            }
        })
    }
    else {
        //reconectar.....
        return res.status(500).send({ message: "paila" })
    }
}

function publish(req, res) {
    let params = req.body;
    if (client.connected) {
        client.subscribe(params.topico, function (err) {
            if(!err){
                client.publish(params.topico, params.message)
                return res.status(200).send({ message: "melo" })
            }
        })
    }
    else{
        //reconectar.....
        return res.status(500).send({ message: "paila" })
    }

}

module.exports = {
    subcribe,
    publish
}