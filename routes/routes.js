
'use strict' // convencio de EMC6
const express = require('express');
var validator = require('../validations/validator');
const firebase = require ('../externalServices/firebase');
//controlador
const homesCtrl = require('../controllers/homeController');
const api = express.Router();


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

api.post('/homes/booking', function(req, res){
    let response = {
        "agency": {
            "name": "Arrendamientos Santa Fé",
            "nit": "1123-1233-12313-51414"
        },
        "codigo": 0,
        "message": ""
    };
    let failedDates = validator.dateFormatValidation(req.body);
    if(req.body.id == undefined || req.body.checkIn == undefined || req.body.checkOut == undefined){
        response.message = "No contiene los parametros necesarios (checkIn, checkOut, id)";
        return res.status(404).send(response);
    }
    if(failedDates){/*Si está vacio es true (no hay error)*/
        response.message = "Fechas con formato incorrecto:" + failedDates;
        return res.status(404).send(response);
    }
    if(isNaN(req.body.id)){
        response.message = "El id esta en un formato incorrecto, debe ser numerico";
        return res.status(404).send(response);
    }
    firebase.verifyIdToken(req.headers.token, function(err, data){
        if (!err) {/*User logged */
            homesCtrl.homeAvailability(req.body, function(err, res){
                if(err == 0){
                    response.message = res;
                    return res.status(500).send(response);
                }
                if(!res){
                    response.message = "La casa esta ocupada en las fechas indicadas";
                    return res.status(200).send(response);
                }
                let bookingId = String(req.body.id)+req.body.checkIn+"*"+req.body.checkOut;
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