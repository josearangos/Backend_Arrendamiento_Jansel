
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

            console.log(idBookings);
            homeModel.aggregate([
                { "$match": { 'bookings.bookingId': { $in: idBookings} },
                },{ $project: { 
                    id : "$id",
                    name: "$name",
                    description: "$description",
                    location: "$location", 
                    city: "$city",
                    type: "$type",
                    rating: "$rating",
                    totalAmount: "$totalAmount",
                    pricePerNight: "$pricePerNight",
                    thumbnail:  "$thumbnail" ,
                    bookings: { 
                        $filter: { 
                            input: "$bookings", 
                            as: "book", 
                            cond: { $in: ['$$book.bookingId', idBookings]} 
                        } 
                    }
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
