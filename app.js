'use strict' // convencio de EMC6
var cors = require('cors')
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const api=require('./routes/routes');
const config=require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.dbMongo, (err, res) => {
    if (err) {
        return //console.log(`Error al conectarse a la base de datos: ${err}`);
    } else {
       // console.log("conexion establecida");
    }
});

app.use(cors())
// Importamos el facilitador de peticiones 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(config.prefixRoutes,api);// para que todas las rutas usen el prefijo previamente definido

module.exports=app; 