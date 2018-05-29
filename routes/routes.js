
'use strict' // convencio de EMC6
const express = require('express');
var validator = require('../validations/validator');

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
    let failedDates = validator.dateFormatValidation(req.body);
    if(req.body.id == undefined || req.body.checkIn == undefined || req.body.checkOut == undefined){
        return res.status(404).send({ message: 'No contiene los parametros, formato = (checkIn, checkOut, id)' + failedDates });
    }
    if(failedDates){/*Si está vacio es true (no hay error)*/
        return res.status(404).send({ message: 'Fechas con formato incorrecto:' + failedDates });
    }
    if(isNaN(req.body.id)){
        return res.status(404).send({ message: 'El id esta en un formato incorrecto, debe ser numerico' });
    }
    return res.status(200).send({message: 'funciona'});
});

module.exports = api;