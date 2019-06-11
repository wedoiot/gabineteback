'use strict'

var express=require('express');
var GabineteController=require('../../controllers/configuration/gabinete');
//middleware authentication
var md_auth=require('../middlewares/authenticated');

//tener acceso a los metodos get, post, delete
var api=express.Router();

//api.get('/home',UserController.home);
api.get('/gabinete/prueba',GabineteController.prueba);
api.post('/gabinete/create',GabineteController.create);


module.exports=api;