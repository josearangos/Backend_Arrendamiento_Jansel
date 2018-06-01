
'use strict' // convencio de EMC6
// importar mongoose
const mongoose = require('mongoose');
const app=require('../app'); // importamos toda la logica del servidor
const config=require('../config');


var server = require('http').Server(app); //crear el servidor http usando la libreria express

mongoose.connect(config.dbMongo, (err, res) => {

    if (err) {
        return console.log(`Error al conectarse a la base de datos: ${err}`);
    } else {
        console.log("conecion establecida");
    }
    app.listen(config.port, () => {
        console.log(`API corriendo por el puerto: ${config.port}`);
    })
});




