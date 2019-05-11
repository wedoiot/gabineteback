'use strict'

var express=require('express');

var md_auth=require('../middlewares/authenticated');

var LoginController=require('../../controllers/auth/login');

var api=express.Router();

api.post('/auth/login', LoginController.login);
api.get('/auth/isTokenValid', md_auth.ensureAuth , LoginController.isTokenValid)

module.exports=api;