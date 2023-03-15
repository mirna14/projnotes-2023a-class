import express from 'express';
const { Router } = express;

const router = Router();

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
export default router;