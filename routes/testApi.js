var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');

router.get("/",async function(req,res,next){
    let json = await fetch("https://raw.githubusercontent.com/Autofleet/code-challenge-vehicle-map/master/vehicles-location.json")
        .then(res => res.json());
    res.send(JSON.stringify(json));
});

module.exports = router;
