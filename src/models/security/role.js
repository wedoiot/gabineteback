'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var RoleSchema=Schema({
	name:{type: String, unique:true, index: true},
    description:String,
},
{timestamps:true});

RoleSchema.plugin(uniqueValidator, {message: 'Ya existe ese rol.'});


module.exports=mongoose.model('role',RoleSchema);