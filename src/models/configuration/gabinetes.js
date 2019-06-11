const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const GabineteSchema = Schema({
  name:{type: String, lowercase: true, unique:true, required: [true, "Nombre del gabinete es requerido"], index: true},
  location: String,
  description: String,
  reboot: String,
  energy: String,
  door: {type: Boolean,default: false},             
  relay1: {type: Boolean,default: false},
  relay2: {type: Boolean,default: false}
},
{timestamps:true});
GabineteSchema.plugin(uniqueValidator, {message: 'Ya existe un gabinete registrado con ese nombre.'});

module.exports = mongoose.model('gabinetes', GabineteSchema);