const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    VM = require('./models/vm.js');
    config = require('./db');

    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    const app = express();
    //const routes=require("./routes/vmroute.js");

    app.use(bodyParser.json());
    app.use(cors());
    const port = 8081;

var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//base route
router.get('/', function(req, res) {
    res.json({ message: 'base route' });   
});

// the vms routes

router.route('/vms')

    // create a vm at http://localhost:8081/api/vms)
    .post(function(req, res) {
        console.log("POST request received");
        console.log(req.body);
        // console.log(req.body.name);
        // console.log(req.body.cores);
        // console.log(req.body.ram);
        var newVM = new VM();   
        //add all of the VM fields to be stored
        newVM.vm_name = req.body.vm_name;
        newVM.vm_cores = req.body.vm_cores;
        newVM.vm_RAM = req.body.vm_RAM;
        newVM.vm_Storage = req.body.vm_Storage;
        newVM.vm_Price = req.body.vm_Price;
        newVM.vm_Cost = req.body.vm_Cost
        newVM.vm_Status = req.body.vm_Status;
        newVM.t1 = 0;
        newVM.t2 = 0;

        // save the new VM
        newVM.save(function(err) {
            if (err){
                res.send(err);
            }
            console.log("created new VM");

            res.json({ msg: 'vm created!' });
        });

    })
    // get all the VMS (accessed at GET http://localhost:8081/api/vms)
    .get(function(req, res) {
        console.log("GET request received");
        VM.find(function(err, vms) {
            if (err){
                res.send(err);
            }
        

            res.json(vms);
        });
    });
    
    //routes for manipulating a vm by id
    router.route('/vms/:_id')

    
    // delete the vm 
    .delete(function(req, res) {
        VM.remove({
            _id: req.params._id
        }, function(err, vm) {
            if (err){
                res.send(err);
            }
            res.json({ msg: 'Successfully deleted vm' });
        });
    });

// all of the routes will be prefixed with /api
app.use('/api', router);


    //app.use('/api', routes);
    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });