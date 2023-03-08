// importing Express library
var express = require('express');
//creating a Router Instance 
var router = express.Router();

// Creating the route
router.get('/author', (req, res) =>{
// Responding to the client using res object
    res.json ({
        "name": "Mirna",
        "lastname": "Diaz",
        "twitter": "@mirna",
        "job": "ITGAM"
    });
}); // function(req, res){}

//exporting the router
module.exports = router;