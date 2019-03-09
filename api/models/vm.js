var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Business
var VM = new Schema({
  vm_name: {
    type: String
  },
  vm_cores:{
    type: Number
  },
  vm_RAM: {
    type: String
  },
  vm_Storage: {
    type: String
  },
  vm_Price:{
    type:Number
  }
},{
    collection: 'vms'
});
  

module.exports = mongoose.model('vm', VM);