'use strict'

const mongoose= require('mongoose');//importando mongoose
const Schema=mongoose.Schema;//obteniendo Schema

const userSchema= Schema(
    {        
        uid: String,
        bookings: {type: Array, default: [] }
    }
);

module.exports=mongoose.model('user', userSchema);
