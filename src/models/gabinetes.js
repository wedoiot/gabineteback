const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  ubicacion: String,
  descripcion: String,
  reboot: String,
  energy: String,
  door: {
      type: Boolean,
      default: true
  },             
  relay1: {
    type: Boolean,
    default: true
  },
  relay2: {
    type: Boolean,
    default: true
  }
  
});

module.exports = mongoose.model('gabinetes', TaskSchema);