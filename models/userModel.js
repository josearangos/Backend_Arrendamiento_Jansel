'use strict'

const mongoose= require('mongoose');
const Schema=mongoose.Schema

const userShchema= Schema(
    {        
        uid: Number,
        bookings: {type: Array, default: [] }
    }
);

module.exports=mongoose.model('user', userShchema);
