'use strict'

var express=require('express');

var md_auth=require('../middlewares/authenticated');

var RoleController=require('../../controllers/auth/role');

var api=express.Router();

api.get('/role/create', RoleController.registerRoles);
api.get('/role/getRoles', md_auth.ensureAuth, RoleController.getRoles);

module.exports=api;