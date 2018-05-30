
'use strict' // convencio de EMC6

const homeModel = require('../models/homeModel');//  importar modelo

var agency = {
    name: "Arriendamientos Jansel",
    nit: "1212312121-12121212"
};

function daysDifference(checkIn, checkOut) {
    checkIn = checkIn.split("-");
    checkOut = checkOut.split("-");
    var dateFrom = new Date(checkIn[2], checkIn[1] - 1, checkIn[0]).getTime();
    var dateTo = new Date(checkOut[2], checkOut[1] - 1, checkOut[0]).getTime();

    var days = dateTo - dateFrom;
    var diff = days / (1000 * 60 * 60 * 24);
    return diff;

}

// convierte de BOG --> Bogota, ya que la solicitud viene con el prefijo BOG
function cityConverter(codeCity) {
    var cityConvert = "";
    switch (codeCity) {
        case 'CO-MDE':
            cityConvert = "Medellín";
            break;
        case 'CO-BOG':
            cityConvert = "Bogota";
            break;
        case 'CO-CLO':
            cityConvert = "Cali";
            break;
        case 'CO-SMR':
            cityConvert = "Santa Marta";
            break;
        case 'CO-CTG':
            cityConvert = "Cartagena";
            break;


    }
    return cityConvert;
}

// convierte de type 1 --> Apartamento o 2 --> Casa
function typeConverter(codeType) {
    var typeConvert = "";
    switch (codeType) {
        case "1":
            typeConvert = "Apartamento";
            break;

        case "2":
            typeConvert = "Casa";
            break;

        case "3":
            typeConvert = "Luxury";
            break;

    }return typeConvert;
}

function dateLogicalValidation(json) {

    var result = [];
    result[0] = false;  // indica que todo anda mal 
    result[1] = "";
    var days = daysDifference(json.checkIn, json.checkOut);

    var dt = new Date(); // obtengo la fecha actual ya que que no es logíco que alguien quiera reservar en el pasado
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var year = dt.getFullYear();
    var currentDay = day + "-" + month + "-" + year; // fecha actual en el formato que tenho

    // Obtengo los días de diferencia entre la fecha actual y el checkInt para saber si se esta consultado en el
    // paso ya que no sería logíco esto
    var daysDifferenceCheckinAndCurrentDay = daysDifference(currentDay, json.checkIn);

    if (daysDifferenceCheckinAndCurrentDay < 0) {

        result[1] = "Las fecha de salida no puede ser menor a la fecha Actual, ya que no puedes viajar en el pasado, ojalá se pudiera ome :D";
        return result;

    } else if (days < 0) {
        result[1] = "Las fecha se llegada No puede ser menor que la fecha de salida";
        return result;

    } else if (days == 0) {
        result[1] = "Las fechas NO pueden ser iguales";
        return result;

    } else {
        result[0] = true;
    }

    return result;

}






function getHomes(homesQuery, callback) {

    var city = cityConverter(homesQuery.city); // convierto la ciudad del prefijo a el nombre completo
    var type = typeConverter(homesQuery.type); // convierto el tipo de home de numero a su correspondencia
    // Construyo la query de consulta para mongodb, en este caso se buscara todos los homes, con el city y type enviado
    var days = daysDifference(homesQuery.checkIn, homesQuery.checkOut);
    
    var query = {
        city: city,
        type: type
    }

    var dateLogic = dateLogicalValidation(homesQuery); // valido  la logica de las fechas
    // que la checkin no sea mayor a checkout , no sean iguals y que checkin no sea meno a la fecha actual

    if (dateLogic[0]) {

        // busco en mongodb
        homeModel.find(query, (err, homes) => {
            var responseHomes = {
                agency: agency,
                homes: []
            }

            if (err) { // en caso de error retorno  1 y el error

                callback(1, err);

            } else if (homes.length == 0) { // en caso de que la consulta sea vacia retorno 0 y null el dato
                
                callback(0, responseHomes);
            } else { // siendo positiva la consulta retorno el array
                // procedemos a calcular el totalAmount e insertarlo en el JSON de respuesta                
                homes.forEach(function (element) {
                    element.totalAmount = days * element.pricePerNight;
                });
                // construimos el JSON de respuesta       
                responseHomes.homes = homes;

                callback(0, responseHomes);
            }
        });

    } else {
        callback(2, { message: dateLogic[1] });
    }
}

function isAvailability(home, checkin, checkOut){

}

function homeAvailability(body, callback){
    let query = {
        id: body.id
    };
    homeModel.find(query, (err, homes) => {
        let home;
        if (err) { // en caso de error retorno  1 y false
            callback(1, "Ha ocurrido un error");
        } else if (homes.length == 0) { // en caso de que la consulta sea vacia retorno 0 y null el dato
            callback(1, "La existe la casa solicitada");
        } else { // siendo positiva la consulta retorno el array
            // procedemos a calcular el totalAmount e insertarlo en el JSON de respuesta                
            homes.forEach(function (element) {
                home = element;
            });
            callback(0, isAvailability(home, body.checkin, body.checkOut));
        }
    });
}


module.exports = {
    getHomes,
    homeAvailability

}


/*

function getHomes(req, res) {
    // con el {} trae todas las palabras
        Word.find({}, (err, words) => {
            if (err) return res.status(500).send({ message: `Error al buscar ${err}` });
            if (!words) return res.status(404).send({ message: `No hay ` });
            res.status(200).send({ words: words });
        });
}

function getHome(req, res) {
    let wordId = req.params.wordId;
    Word.findById(wordId, (err, word) => {
        if (err) return res.status(500).send({ message: `Error al buscar ${err}` });
        if (!word) return res.status(404).send({ message: `la palabra no existe` });
        res.status(200).send({ word });
    });
}*/
/*
function insertWord(req, res) {
       //console.log(req.body);
    // hay que definir la convencion de que lo que se envia por el parametro como petición
    // sea igual a los atributos del schema ok  ...)
    let word = new Word();
    // llenamos el objeto a insertar con los datos de la petición 
    word.name = req.body.name;
    word.author = req.body.author;
    /* Procemos a guardarlo mediante un metodo que recibe una funcion Callback
   donde en err viene almacenado el error en caso tal de que este
   y en el otro parametro arroja el objeto almacenado el cual cuando se almacena 
   mongodb le va almacenar un Id unico para luego identificarlo y hacer un CRUD
   
    word.save((err, wordStored) => {
        if (err) {
            res.status(500) // los 500 son errores del Servidor
            res.send({ message: `Erro al salvar en la BD ${err}` });
        } else {
            res.status(200);
            res.send({ word: wordStored });
        }
    });

}*/



/*
function updateWord(req,res){
    let wordId=req.params.wordId; // obtenemos el Id del que queremos actualizar
    // obtenemos los datos que se van actualizar, los cuales estan en el body
    let dataToUpdate=req.body;
    // haciendo uso de la siguiente funcion podemos hacer el put
    
    Word.findByIdAndUpdate(wordId,dataToUpdate,(err,wordUpdated)=>{
        if (err) return res.status(500).send({ message: `Error al actualizar la palabra ${err}` });
        res.status(200).send(wordUpdated);        

    });
}

function deleteWord(req,res) {
     // primero busco que la palabra este
     let wordId = req.params.wordId;
     Word.findById(wordId, (err, word) => {
         if (err) return res.status(500).send({ message: `Error al borrar la palabra ${err}` });
         word.remove(err => {
             if (err) return res.status(500).send({ message: `Error al borrar la palabra ${err}` });
             res.status(200).send({message:' La palabra ha sido eliminada con exito'});
         });
     });
 
}
*/
