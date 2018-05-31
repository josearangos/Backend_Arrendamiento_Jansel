var admin = require('firebase-admin');

var firebaseKeys = require('../globals/firebaseKeys.json');

admin.initializeApp({
    credential: admin.credential.cert(firebaseKeys),
    databaseURL: "https://yotearriendo-d532f.firebaseio.com"
});

function verifyIdToken(idToken, callback) {

    if (idToken.length == 0) {
        callback(true, "token vacio");
    } else {

        admin.auth().verifyIdToken(idToken, callback)
            .then(function (decodedToken) {
                var uid = decodedToken.uid;
                callback(false, uid);
            }).catch(function (error) {
                callback(true, error);

            });
    }

}

module.exports = {
    verifyIdToken
}


