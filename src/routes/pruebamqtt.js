'use strict'

var express=require('express');

var controllerMqtt = require('../controllers/mqtt/mqtt');

var api=express.Router();

api.post('/mqtt/subscribe', controllerMqtt.subcribe);
api.post('/mqtt/publish', controllerMqtt.publish);

module.exports=api;