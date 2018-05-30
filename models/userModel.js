'use strict'

const mongoose= require('mongoose');
const Schema = mongoose.Schema

var bookingShcema = new Schema({
    bookingId: String
});

var userShchema = new Schema({
    uid: String,
    bookings: [bookingShcema]
});


// para exportar el modelo y que se pueda usar desde cualquier
// parte de la aplicación 

exports.UserBookings = mongoose.model('UserBookings', bookingShcema);
exports.User = mongoose.model('User', userShchema);
