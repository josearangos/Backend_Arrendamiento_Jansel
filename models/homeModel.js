'use strict'

const mongoose= require('mongoose');
const Schema=mongoose.Schema

const homeShchema= Schema(
       {        
        id: Number,
        name: String,
        description: String,
        location: {
            address: String,
            latitude: String,
            longitude: String
        },
        city: String,
        type: Number,
        rating: Number,
        totalAmount: Number,
        pricePerNight: Number,
        thumbnail:  String
   }
);
// para exportar el modelo y que se pueda usar desde cualquier
// parte de la aplicación 

module.exports=mongoose.model('home',homeShchema);

// para importarlo de hace lo siguiente

/*
    const Palabre= require('./models/Palabra');
*/