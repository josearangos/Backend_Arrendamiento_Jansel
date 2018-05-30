
'use strict' // convencio de EMC6

var models = require('../models/userModel'),
    userModel = models.User,
    userBookings = models.UserBookings


function myBookings(uid, callback) {

    console.log("Entró al método con el uid: " + uid);

    var query = {
        uid:uid
    }
    userModel.find(query,(err, user)=>{      
        if (err) { // en caso de error retorno  1 y el error
            callback(1, err);
        } else{
            callback(0, user);
        } 
    });
}




module.exports = {
    myBookings
}
