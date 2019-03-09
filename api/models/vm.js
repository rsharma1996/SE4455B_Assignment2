const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let VM = new Schema({
  vm_name: {
    type: String
  },
  vm_RAM: {
    type: String
  },
  vm_File: {
    type: String
  }
},{
    collection: 'vm_type'
});
  

module.exports = mongoose.model('vm', VM);