
'use strict' // convencio de EMC6
const express = require('express');

//controlador
const homesCtrl= require('../controllers/homeController');
const api=express.Router();

api.post('/homes/search',function(req, res){
    var queryHomes= {
        checkIn  : req.body.checkIn,
        checkOut : req.body.checkOut,
        city     : req.body.city,
        type     : req.body.type
    }    
    homesCtrl.getHomes(queryHomes, function(err,data){
            if (err==1) {
                return res.status(500).send({ message: `Error al buscar ${data}` });
            } else if(data==null) {
                return res.status(404).send({ message: `El recurso solicitado no esta disponible` });
            }else{
                return res.status(200).send(data);
            }
    });

});



module.exports=api;