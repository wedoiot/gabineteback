'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var jwt = require('jsonwebtoken');
var secret = require('../../../configuration/keySecret.json').secret;
var moment = require('moment');
var crypto = require('crypto');
const { b64DecodeUnicode } = require('../../utils')

var UserSchema=Schema({
	name:String,
    surname:String,
	username:{type: String, lowercase: true, unique:true, required: [true, "Nombre de usuario no puede estar vacio"], match: [/^[a-zA-Z0-9]+$/, "Carácteres no permitidos en Nombre de usuario"], index: true},
	email:{type: String, lowercase: true, unique:true, required: [true, "Email no puede estar vacio"], match: [/\S+@\S+\.\S+/, 'Carácteres no permitidos en el email'], index: true},
	salt:String,
    hash: String,
	role:[{type: Schema.Types.ObjectId, ref: 'role'}],
	//active: { type: Boolean, default: true }
},
{timestamps:true});

UserSchema.plugin(uniqueValidator, {message: 'Ya existe un usuario registrado con ese nick o ese email.'});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(b64DecodeUnicode(password), this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(b64DecodeUnicode(password), this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    var payload={
		sub: this._id,
		name: this.name,
		surname: this.surname,
		username: this.username,
		email:this.email,
		role:this.role,
		iat: Date.now(),
		//exp: 60000
	};
	let expires= {expiresIn: 28800000} //60000}
    return jwt.sign(payload,secret,expires);
};

UserSchema.methods.decodeJWT = function(token) {
	return jwt.decode(token);
}

module.exports=mongoose.model('user',UserSchema);