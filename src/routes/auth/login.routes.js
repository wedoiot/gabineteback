'use strict'

var express=require('express');
var LoginController=require('../../controllers/auth/login');

var api=express.Router();

api.post('/auth/login',LoginController.login);

module.exports=api;