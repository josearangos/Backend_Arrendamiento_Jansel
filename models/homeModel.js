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
        type: String,
        rating: Number,
        totalAmount: { type: Number, default: 0 },
        pricePerNight: Number,
        thumbnail:  String,
        bookings: {type: Array, default: []}
   }
);
// para exportar el modelo y que se pueda usar desde cualquier
// parte de la aplicación 

module.exports=mongoose.model('home',homeShchema);