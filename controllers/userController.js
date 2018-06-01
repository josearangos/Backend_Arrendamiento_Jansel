"use strict"; // convención de EMC6

//Importar los modelos a utilizar
const userModel = require("../models/userModel");
const homeModel = require("../models/homeModel");


function myBookings(uid,agency, callback) {
    // JSON init with agency header
    var responseBookings = { agency, homes: [] };

    // mongoose search method to find user with the parameter uid
    userModel.findOne({uid}, function(err, userData){
        if(err)  {
            // If the search fails
            callback(1, "Error searching this user");
        }
        if(userData){
            // If method returns data from user with uid
            // idBookings is an array with the bookingId string values
            var idBookings = (userData.bookings).map((b) => b.bookingId);
            // mongoDb method to find homes that has sub-document booking
            // and in this bookings has any bookingId of the idBookings array
            homeModel.aggregate([
                { "$match": { "bookings.bookingId": { $in: idBookings} },
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
                            cond: { $in: ["$$book.bookingId", idBookings]} 
                        } 
                    }
                }
             }
            ], function (err, result) {
                if (err) {
                    // If method returns any error
                    callback(2, "Error searching bookings from user");
                }

                // Join the data obtained to the response JSON
                responseBookings.homes = result;
                // Send the data
                callback(0, responseBookings);
            });  

        }
    }); 

}

module.exports = {
    myBookings
};
