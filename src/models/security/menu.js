'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var MenuSchema=Schema({
    name: {type:String, unique:true},
    link: {type:String, unique:true},
    submenu:[
        {
            name:String,
            link:String,
        }
    ]
},
{timestamps:true});


module.exports=mongoose.model('menus',MenuSchema);