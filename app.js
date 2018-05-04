'use strict' // convencio de EMC6
var cors = require('cors')
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const api=require('./routes/routes');
const config=require('./config');


app.use(cors())
// Importamos el facilitador de peticiones 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(config.prefixRoutes,api);// para que todas las rutas usen el prefijo previamente definido

module.exports=app; 