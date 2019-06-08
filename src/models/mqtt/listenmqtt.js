const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MqttSchema = Schema({
  topic:String,
  message: String
},
{timestamps:true});

module.exports=mongoose.model('mqtts',MqttSchema);