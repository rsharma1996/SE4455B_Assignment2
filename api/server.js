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
    const port = process.env.PORT || 8081;
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

router.route('/vms')

    // create a vm (accessed at POST http://localhost:8081/api/vms)
    .post(function(req, res) {
        console.log("POST request received");
        console.log(req.body);
        // console.log(req.body.name);
        // console.log(req.body.cores);
        // console.log(req.body.ram);
        var newVM = new VM();   
        //add all of the VM fields to be stored
        newVM.vm_name = req.body.name;
        newVM.vm_cores = req.body.cores;
        newVM.vm_RAM = req.body.ram;
        newVM.vm_Storage = req.body.storage;
        newVM.vm_Price = req.body.price;

        // save the bear and check for errors
        newVM.save(function(err) {
            if (err){
                res.send(err);
            }
            console.log("created new VM");

            res.json({ message: 'vm created!' });
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
    
    //CODE FOR MANIPULATION BY ID
    // router.route('/bears/:bear_id')

    // // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    // .get(function(req, res) {
    //     Bear.findById(req.params.bear_id, function(err, bear) {
    //         if (err){
    //             res.send(err);
    //         }
    //         res.json(bear);
    //     });
    // })
    // .put(function(req, res) {

    //     // use our bear model to find the bear we want
    //     Bear.findById(req.params.bear_id, function(err, bear) {

    //         if (err){
    //             res.send(err);
    //         }

    //         bear.name = req.body.name;  // update the bears info

    //         // save the bear
    //         bear.save(function(err) {
    //             if (err){
    //                 res.send(err);
    //             }

    //             res.json({ message: 'Bear updated!' });
    //         });

    //     });
    // })
    // // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    // .delete(function(req, res) {
    //     Bear.remove({
    //         _id: req.params.bear_id
    //     }, function(err, bear) {
    //         if (err){
    //             res.send(err);
    //         }
    //         res.json({ message: 'Successfully deleted' });
    //     });
    // });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     app.get('/', (req, res) => {
//         console.log("did this work?");
//   return res.send('Received a GET HTTP method');
// });

    //app.use('/api', routes);
    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });