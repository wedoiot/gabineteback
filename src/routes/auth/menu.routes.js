'use strict'

var express=require('express');

var md_auth=require('../middlewares/authenticated');

var MenuController=require('../../controllers/auth/menu');

var api=express.Router();

api.post('/menu/create', MenuController.create);
api.get('/menu/getAll', MenuController.getAll);

module.exports=api;