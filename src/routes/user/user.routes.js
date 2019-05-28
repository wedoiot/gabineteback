'use strict'

var express=require('express');
var UserController=require('../../controllers/user/user');
//middleware authentication
var md_auth=require('../middlewares/authenticated');

// subir datos 
//var multipart=require('connect-multiparty');
//var md_upload=multipart({uploadDir:'./uploads/users'});

//tener acceso a los metodos get, post, delete
var api=express.Router();

//api.get('/home',UserController.home);
api.get('/user/prueba',UserController.prueba);
api.get('/user', UserController.prueba);
api.get('/user/pruebasauth',md_auth.ensureAuth,UserController.prueba);
api.post('/user/register', UserController.register);
api.put('/user/modify', md_auth.ensureAuth, UserController.modify);
api.get('/user/getUserByToken', md_auth.ensureAuth, UserController.getUserByToken);
api.get('/user/getAllUsers', md_auth.ensureAuth, UserController.getAllUsers);

module.exports=api;