
'use strict' // convencio de EMC6
const express = require('express');
var validator = require('../validations/validator');
const config=require('../config');

//controlador
const homesCtrl = require('../controllers/homeController');
const userCtrl = require('../controllers/userController');
const api = express.Router();
const firebase = require ('../externalServices/firebase');
const agency = config.agency;

api.post('/homes/search', function (req, res) {

    var generalValidation = validator.generalValidation(req.body);

    if (generalValidation[0]) {
        var homesQuery = {
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            city: req.body.city,
            type: req.body.type
        }
        homesCtrl.getHomes(homesQuery, function (err, data) {
            if (err == 1) {
                return res.status(500).send({ message: `Error al buscar ${data}` });
            } else if (err == 2 || err == 3) {
                return res.status(200).send(data);
            } else {
                return res.status(200).send(data);
            }
        });
    } else {
        return res.status(404).send({ message:generalValidation[1]});
    }
  
});

api.post('/homes/myBooking', function (req, res) {
    var idToken = req.get('token');
    if (idToken === void 0) {
        return res.status(401).send({ message: "El parametro token en el header no puede estar vacio"});
    }
    else{
        firebase.verifyIdToken(idToken, function(error, uid){
            if (!error) {
                userCtrl.myBookings(uid, agency, function (err, data) {
                    if (err == 1) {
                        return res.status(204).send({ message: "Not user found" });
                    }
                    if (err == 2) {
                        return res.status(204).send();
                    }
                    else{
                        return res.status(200).send(data);
                    }
                });
            } else {
                return res.status(500).send({ message: "error: " + uid});
            }      
        });
    }
});

module.exports = api;