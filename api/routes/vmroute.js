const express = require('express');
const app = express();
const vmRoutes = express.Router();

// Require Business model in our routes module
let VM = require('../models/vm');

// Defined store route
vmRoutes.route('/add').post(function (req, res) {
  let vm = new VM(req.body);
  vm.save()
    .then(vm => {
      res.status(200).json({'vm': 'vm added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
vmRoutes.route('/').get(function (req, res) {
    VM.find(function (err, vms){
    if(err){
      console.log(err);
    }
    else {
      res.json(vms);
    }
  });
});

// Defined edit route
vmRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  VM.findById(id, function (err, vm){
      res.json(vm);
  });
});

//  Defined update route
vmRoutes.route('/update/:id').post(function (req, res) {
    VM.findById(req.params.id, function(err, next, vm) {
    if (!vm)
      return next(new Error('Could not load Document'));
    else {
        vm.vm_name = req.body.vm_name;
        vm.vm_cores=req.body.vm_cores;
        vm.vm_RAM = req.body.vm_RAM;
        vm.vm_Storage = req.body.vm_Storage;
        vm.vm_Price=req.body.vm_Price;

        vm.save().then(vm => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
vmRoutes.route('/delete/:id').get(function (req, res) {
    VM.findByIdAndRemove({_id: req.params.id}, function(err, vm){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = vmRoutes;