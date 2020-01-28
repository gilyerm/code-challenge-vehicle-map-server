var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const inside = require('point-in-polygon');

// Endpoint1 - query all of the vehicle locations
router.get("/",async function(req,res,next){
  console.log(req.query);
  let json = await fetch("https://raw.githubusercontent.com/Autofleet/code-challenge-vehicle-map/master/vehicles-location.json")
      .then(res => res.json())
      .then(vehicles => vehicles.map(vehicle => { return {id:vehicle.id , lat:vehicle.location.lat,lng:vehicle.location.lng}}));
  console.log(json);
  res.send(json);
});

// Endpoint 2- get vehicles ids that are inside of the specific polygon
router.get("/query/",async function (req, res, next) {
  const polygon = JSON.parse(req.query.data);
  let json = await fetch("https://raw.githubusercontent.com/Autofleet/code-challenge-vehicle-map/master/vehicles-location.json")
      .then(res => res.json())
      .then(vehicles => vehicles.map(vehicle => { return {id:vehicle.id , lat:vehicle.location.lat,lng:vehicle.location.lng}}));
  json = json.filter((v)=> inside([v.lat,v.lng],polygon));
  res.send(json);
});


module.exports = router;
