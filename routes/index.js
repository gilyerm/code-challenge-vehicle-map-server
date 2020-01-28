var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const inside = require('point-in-polygon');

// Endpoint1 - query all of the vehicle locations
router.get("/",async function(req,res,next){
  console.log(req.query);
  let vehicles = await fetch("https://raw.githubusercontent.com/Autofleet/code-challenge-vehicle-map/master/vehicles-location.json")
      .then(res => res.json());
  vehicles = vehicles.map(vehicle => { return {lat:vehicle.location.lat,lng:vehicle.location.lng}});
  console.log(vehicles);
  res.send(vehicles);
});

// Endpoint 2- get vehicles ids that are inside of the specific polygon
router.get("/query/",async function (req, res, next) {
  const polygon = JSON.parse(req.query.data);
  let vehicles = await fetch("https://raw.githubusercontent.com/Autofleet/code-challenge-vehicle-map/master/vehicles-location.json")
      .then(res => res.json());
  vehicles = vehicles.filter((v)=> inside([v.location.lat,v.location.lng],polygon))
                    .map(vehicle =>  vehicle.id);
  res.send(vehicles);
});
// Endpoint 3- get vehicle by id
router.get("/get/",async function (req, res, next) {
  const id = JSON.parse(req.query.id);
  let vehicles = await fetch("https://raw.githubusercontent.com/Autofleet/code-challenge-vehicle-map/master/vehicles-location.json")
      .then(res => res.json());
  vehicles = vehicles.filter((v)=> v.id === id);
  res.send(vehicles);
});


module.exports = router;
