'use strict'

var jwt=require('jsonwebtoken');
var moment=require('moment');
var secret=require('../../../configuration/keySecret.json').secret;
const { generateErrorMessage, generateResponse} = require('../../response');

exports.ensureAuth=function(req,res,next){
	if(!req.headers.authorization){
		return res.status(403).send(generateErrorMessage(false,'La petición no tiene la cabecera de autenticación'));
	}
	var token=req.headers.authorization.replace(/['"]+/g,'');
		jwt.verify(token, secret, function(err, user){
			if (err){
				return res.status(404).send(generateErrorMessage(false,'El token no es valido'));
			}
			else {
				if(user.exp <= Date.now()){
					return res.status(401).send(generateErrorMessage(false,'El token se ha vencido'))
				}
				else {
					req.user = user;
					next();
				}
			}
		});
}
