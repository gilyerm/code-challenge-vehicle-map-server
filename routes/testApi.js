const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const inside = require('point-in-polygon');


router.get("/",async function(req,res,next){
    console.log(req.query);

    let json = await fetch("https://raw.githubusercontent.com/Autofleet/code-challenge-vehicle-map/master/vehicles-location.json")
        .then(res => res.json());
    res.send(json);
});

router.get("/query/",async function (req, res, next) {
   // console.log(req.query);
   const polygon = JSON.parse(req.query.data);
   // console.log(JSON.parse(req.query.data));

    let json = await fetch("https://raw.githubusercontent.com/Autofleet/code-challenge-vehicle-map/master/vehicles-location.json")
        .then(res => res.json());
    json = json.filter((v)=> inside([v.location.lat,v.location.lng],polygon));
    // console.log(json);
    res.send(json);
});


module.exports = router;
