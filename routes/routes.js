
'use strict' // convencio de EMC6
const express = require("express");
var validator = require("../validations/validator");
const config=require("../config");

//controlador
const homesCtrl = require("../controllers/homeController");
const userCtrl = require("../controllers/userController");
const api = express.Router();
const firebase = require ("../externalServices/firebase");
const agency = config.agency;

api.post("/homes/search", function (req, res) {

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

api.post("/homes/myBooking", function (req, res) {
    var idToken = req.get("token");
    if (idToken === void 0) {
        return res.status(401).send({ message: "El parametro token en el header no puede estar vacio"});
    }
    else{
        firebase.verifyIdToken(idToken, function(error, uid){
            if (!error) {
                userCtrl.myBookings(uid, agency, function (err, data) {
                    if (err === 1) {
                        return res.status(204).send({ message: "Not user found" });
                    }
                    if (err === 2) {
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

api.post("/homes/booking", function(req, res){
    let response = {
        "agency": {
            "name": "Arrendamientos Santa Fé",
            "nit": "1123-1233-12313-51414"
        },
        "codigo": 0,
        "message": ""
    };
    let failedDates = homesCtrl.dateLogicalValidation(req.body);
    let failFormatDates = validator.dateFormatValidation(req.body);
    if(req.body.id == undefined || req.body.checkIn == undefined || req.body.checkOut == undefined){
        response.message = "No contiene los parametros necesarios (checkIn, checkOut, id)";
        return res.status(404).send(response);
    }
    if(req.headers.token == undefined){
        response.message = "El usuario no esta logeado";
        return res.status(404).send(response);
    }
    if(failFormatDates){
        response.message = "Fechas con formato incorrecto: " + failFormatDates;
        return res.status(404).send(response);
    }
    if(!failedDates[0]){
        response.message = "Fechas con formato incorrecto: " + failedDates[1];
        return res.status(404).send(response);
    }
    if(isNaN(req.body.id)){
        response.message = "El id esta en un formato incorrecto, debe ser numerico";
        return res.status(404).send(response);
    }
    firebase.verifyIdToken(req.headers.token, function(err, data){
        if (!err) {/*User logged */
            homesCtrl.homeAvailability(req.body, function(err, resAux){
                if(err != 0){
                    response.message = resAux;
                    return res.status(500).send(response);
                }
                if(!resAux){
                    response.message = "La casa esta ocupada en las fechas indicadas";
                    return res.status(200).send(response);
                }
                let bookingId = String(req.body.id)+"*"+req.body.checkIn+"*"+req.body.checkOut;
                homesCtrl.newBooking(req.body, bookingId, data, function(err, data2){
                    if(err == 1){
                        response.message = data2;
                        return res.status(500).send(response);
                    }
                    response.codigo = 1;
                    response.message = data2;
                    return res.status(200).send(response);
                });
            });
        } else {
            response.message = "El token es incorrecto";
            return res.status(404).send(response);
        }      
    });
});

module.exports = api;