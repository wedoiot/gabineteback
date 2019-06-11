'use strict'

var express=require('express');

var md_auth=require('../middlewares/authenticated');

var RoleController=require('../../controllers/auth/role');

var api=express.Router();

api.post('/role/create', RoleController.registerRoles);
api.get('/role/getRoles', /*md_auth.ensureAuth,*/ RoleController.getRoles);
api.get('/role/getRole/:id', /*md_auth.ensureAuth,*/ RoleController.getRoleById);
api.post('/role/setState', /*md_auth.ensureAuth,*/ RoleController.setState);

module.exports=api;