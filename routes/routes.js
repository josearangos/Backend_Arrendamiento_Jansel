
'use strict' // convencio de EMC6
const express = require('express');
var validator = require('../validations/validator');

//controlador
const homesCtrl = require('../controllers/homeController');
const api = express.Router();




api.post('/homes/search', function (req, res) {

    if (!validator.jsonIsEmpty(req.body)) {  // validar que el request no sea vacio

        var failedParams = validator.paramsValidator(req.body);  // validar que el request tenga todos los campos de
        var failedDates = validator.dateFormatValidation(req.body); // validar fechas checkin y checkout
        var failedParamsType = validator.paramsType(req.body);

        if (failedParams.length == 0) { // validar que tenga todos los campo

            if (failedParamsType.length == 0) { // validamos que tenga el tipo de dato correcto cada campo 

                if (failedDates.length == 0) { // validamos el formato de las fechas

                    var homesQuery = {
                        checkIn: req.body.checkIn,
                        checkOut: req.body.checkOut,
                        city: req.body.city,
                        type: req.body.type
                    }
                    homesCtrl.getHomes(homesQuery, function (err, data) {
                        if (err == 1) {
                            return res.status(500).send({ message: `Error al buscar ${data}` });
                        } else if (data == null) {
                            return res.status(200).send({});
                        } else if (err == 2 || err == 3) {
                            return res.status(200).send(data);
                        } else {
                            return res.status(200).send(data);
                        }
                    });
                } else {
                    return res.status(404).send({ message: 'Fechas con formato incorrecto:' + failedDates });
                }
            } else {
                return res.status(404).send({ message: 'Campos con tipo de dato incorrecto :' + failedParamsType });
            }
        } else {
            return res.status(404).send({ message: 'Faltan los siguiete campos en el request:' + failedParams });
        }

    } else {
        return res.status(404).send({ message: 'El request esta vacio :/' });
    }

});



module.exports = api;