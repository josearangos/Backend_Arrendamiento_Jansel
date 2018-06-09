
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
            }else if (err == 4) {
                return res.status(404).send(data);
            } else {
                return res.status(200).send(data);
            }
        });
    } else {
    
        return res.status(404).send({ message:generalValidation[1]});
    }
  
});

api.post("/homes/myBooking", function (req, res) {
    // Get token from the post headers
    var idToken = req.get("token");

    //Check if the token is empty
    if (idToken === void 0) {        
        return res.status(401).send({ message: "El parametro token en el header no puede estar vacio"});
    }
    else{
        //Send the token to firebase external method to validate user
        firebase.verifyIdToken(idToken, function(error, uid){
            if (!error) {
                //If the token corresponds to a user
                userCtrl.myBookings(uid, agency, function (err, data) {
                    if (err === 1) {
                        // Return from callback with error 1: Error searching user
                        return res.status(204).send({ message: "Not user found" });
                    }
                    if (err === 2) {
                         // Return from callback with error 2: Error searching bookings of that user
                        return res.status(204).send();
                    }
                    else{
                        // Return data obtained from myBookings
                        return res.status(200).send(data);
                    }
                });
            } else {
                // Firebase token error: prints the error with the var uid
                return res.status(500).send({ message: "error: " + uid});
            }      
        });
    }
});

api.post("/homes/booking", function(req, res){
    let response = {//esta let es la response del servicio "booking"
        "agency": {
            "name": "Arrendamientos Santa Fé",
            "nit": "1123-1233-12313-51414"
        },
        "codigo": 0,//Para que por defecto, diga que hay un error en alguna validación o metodo
        "message": ""
    };
    let failedDates = homesCtrl.dateLogicalValidation(req.body);//establece si el contenido de las fechas esta erroneo
    let failFormatDates = validator.dateFormatValidation(req.body);//establece si las fechas estan en un formato erroneo
    //Para ver que el Json que viene en el require contenga los parametros necesarios
    if(req.body.id == undefined || req.body.checkIn == undefined || req.body.checkOut == undefined){
        response.message = "No contiene los parametros necesarios (checkIn, checkOut, id)";
        return res.status(404).send(response);
    }
    //Para validar que el require contenga algun token
    if(req.headers.token == undefined){
        response.message = "El usuario no esta logeado";
        return res.status(404).send(response);
    }
    //Aplicando lo obtenido anteriormente
    if(failFormatDates){
        response.message = "Fechas con formato incorrecto: " + failFormatDates;
        return res.status(404).send(response);
    }
    //Aplicando lo obtenido anteriormente
    if(!failedDates[0]){
        response.message = "Fechas con formato incorrecto: " + failedDates[1];
        return res.status(404).send(response);
    }
    //validando que el id sea numerico
    if(isNaN(req.body.id)){
        response.message = "El id esta en un formato incorrecto, debe ser numerico";
        return res.status(404).send(response);
    }
    firebase.verifyIdToken(req.headers.token, function(err, data){//verifica que el token este activo
        if (!err) {/*User logged */
            homesCtrl.homeAvailability(req.body, function(err, resAux){//verifica que la home este disponible
                if(err !== 0){//!=0 es que paso un error
                    response.message = resAux;
                    return res.status(500).send(response);
                }
                if(!resAux){//si la casa esta ocupada
                    response.message = "La casa esta ocupada en las fechas indicadas";
                    return res.status(200).send(response);
                }
                //se crea el id de la reserva
                let bookingId = String(req.body.id)+"*"+req.body.checkIn+"*"+req.body.checkOut;
                homesCtrl.newBooking(req.body, bookingId, data, function(err, data2){//metodo que inserta la reserva
                    if(err === 1){//Si ocurrio un error al insertar
                        response.message = data2;
                        return res.status(500).send(response);
                    }
                    response.codigo = 1;
                    response.message = data2;
                    return res.status(200).send(response);
                });
            });
        } else {//en caso de que el token este errado
            response.message = "El token es incorrecto";
            return res.status(404).send(response);
        }      
    });
});

api.delete("/homes/removeBooking", function (req, res) {
    // Get token from the post headers
    var idToken = req.get("token");
    var bookingId = req.body.bookingId;
    //Check if the token is empty
    if (idToken === void 0) {        
        return res.status(401).send({ message: "El parametro token en el header no puede estar vacio"});
    }
    else{
        //Send the token to firebase external method to validate user
        firebase.verifyIdToken(idToken, function(error, uid){
            if (!error) {
                //If the token corresponds to a user
                //Validates the booking ID format                
                var bookingFormat = validator.bookingIdFormat(bookingId);
                if (bookingFormat == ""){                    
                        userCtrl.removeBooking(uid, bookingId, agency, function (err, data) {                            
                        if (err === 1) {
                            // Return from callback with error 1: Error searching user
                            return res.status(204).send({ message: "Not user found" });
                        }
                        if (err === 2) {
                             // Return from callback with error 2: Error searching bookings of that user
                            return res.status(204).send();
                        }
                        if (err === 3) {
                             // Return from callback with error 3: Error searching bookings of that home                                                         
                            return res.status(204).send(data);
                        }
                        else{
                            // Return data obtained from removeBooking
                            return res.status(200).send(data);
                        }
                    });
                }
                else{//Error validating the booking ID format                    
                    return res.status(500).send({ message: "error: " + bookingFormat});
                }                
            } else {
                // Firebase token error: prints the error with the var uid
                return res.status(500).send({ message: "error: " + uid});
            }      
        });
    }
});

module.exports = api;