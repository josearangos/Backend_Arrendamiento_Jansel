
'use strict' // convencio de EMC6


const userModel = require('../models/userModel');
const homeModel = require('../models/homeModel');//  importar modelo


function myBookings(uid,agency, callback) {
    var responseBookings = {
        agency: agency,
        homes: []
    }

    userModel.findOne({'uid': uid}, function(err, userData){
        if(err)  callback(1, "Error buscando usuario");
        if(userData){
            var idBookings = userData.bookings.map(b => b.bookingId);

            homeModel.aggregate([
                { $unwind: "$bookings" },
                {
                    $match: {
                        'bookings.bookingId': { $in: idBookings}
                    }
                }
            ], function (err, result) {
                if (err) {
                    callback(2, "Error buscando homes del usuario");
                }
                responseBookings.homes = result;
                callback(0, responseBookings);
            });    

        }
    })  

}

module.exports = {
    myBookings
}
