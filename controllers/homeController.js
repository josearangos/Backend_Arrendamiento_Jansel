"use strict"; // convencio de EMC6

const homeModel = require("../models/homeModel"); //  importar modelo
const userModel = require("../models/userModel");

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
    case "CO-MDE":
      cityConvert = "Medellín";
      break;
    case "CO-BOG":
      cityConvert = "Bogota";
      break;
    case "CO-CLO":
      cityConvert = "Cali";
      break;
    case "CO-SMR":
      cityConvert = "Santa Marta";
      break;
    case "CO-CTG":
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
  }
  return typeConvert;
}

function dateLogicalValidation(json) {
  var result = [];
  result[0] = false; // indica que todo anda mal
  result[1] = "";
  var days = daysDifference(json.checkIn, json.checkOut);

  var dt = new Date(); // obtengo la fecha actual ya que que no es logíco que alguien quiera reservar en el pasado
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  var year = dt.getFullYear();
  var currentDay = day + "-" + month + "-" + year; // fecha actual en el formato que tenho

  // Obtengo los días de diferencia entre la fecha actual y el checkInt para saber si se esta consultado en el
  // paso ya que no sería logíco esto
  var daysDifferenceCheckinAndCurrentDay = daysDifference(
    currentDay,
    json.checkIn
  );

  if (daysDifferenceCheckinAndCurrentDay < 0) {
    result[1] =
      "Las fecha de salida no puede ser menor a la fecha Actual, ya que no puedes viajar en el pasado, ojalá se pudiera ome :D";
    return result;
  } else if (days < 0) {
    result[1] =
      "Las fecha de llegada no puede ser menor que la fecha de salida";
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
  if (city=="") {
    callback(4, "La ciudad no fue encontrada");

  }
  var type = typeConverter(homesQuery.type); // convierto el tipo de home de numero a su correspondencia
  // Construyo la query de consulta para mongodb, en este caso se buscara todos los homes, con el city y type enviado
  var days = daysDifference(homesQuery.checkIn, homesQuery.checkOut);
  var checkInt = homesQuery.checkIn;
  var checkOut = homesQuery.checkOut;
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
      };
      if (err) { // en caso de error retorno  1 y el error

              callback(1, err);

          } else if (homes.length == 0) { // en caso de que la consulta sea vacia retorno 0 y null el dato

              callback(0, responseHomes);
          } else { // siendo positiva la consulta retorno el array

              var availableHomes = [];
              var available = true;
               // procedemos a calcular el totalAmount e insertarlo en el JSON de respuesta     
              homes.forEach(function (element) {

                  element.totalAmount = days * element.pricePerNight;

                  element.bookings.forEach(function (book) {
                      var betweenright =dateCheckBetween(book.checkIn,book.checkOut,checkInt );
                      var betweenLeft=dateCheckBetween(book.checkIn,book.checkOut,checkOut );
                      var reverseCheckIn= dateCheckBetween(checkInt,checkOut,book.checkIn );
                      if(betweenright ||  betweenLeft  || reverseCheckIn ){
                         available= false;
                      }    


                  });
                  if(available){
                      availableHomes.push(element);
                  }else{

                      available=true;
                  }

              });

              // construimos el JSON de respuesta       
              responseHomes.homes = availableHomes;

              callback(0, responseHomes);
          }
        });
      } else {
        callback(2, { message: dateLogic[1] });
      }
}

function dateCheckBetween(from, to, check) {
  from = from.split("-").join("/");
  to = to.split("-").join("/");
  check = check.split("-").join("/");
  var monthAuxFrom = from.substring(3, 5);
  var dayAuxFrom = from.substring(0, 2);
  var yearAuxFrom = from.substring(6, 10);
  var from2;
  var monthAuxTo = to.substring(3, 5);
  var dayAuxTo = to.substring(0, 2);
  var yearAuxTo = to.substring(6, 10);
  var to2;
  var monthAuxCheck = check.substring(3, 5);
  var dayAuxCheck = check.substring(0, 2);
  var yearAuxCheck = check.substring(6, 10);
  var check2;
  from2 = new Date(yearAuxFrom, monthAuxFrom, dayAuxFrom );
  to2 = new Date(yearAuxTo, monthAuxTo, dayAuxTo);
  check2 = new Date(yearAuxCheck, monthAuxCheck, dayAuxCheck);
  if (check2 >= from2 && check2 <= to2 ) {
    return true;
  }
  return false;
}

function isAvailability(checkIn, checkOut, livingPlace) {
  var arrReservation = livingPlace.bookings;
  for (let index = 0; index < arrReservation.length; index++) {
    var cond1 = dateCheckBetween(checkIn, checkOut, arrReservation[index].checkIn);
    var cond2 = dateCheckBetween(checkIn, checkOut, arrReservation[index].checkOut);
    var cond3 = dateCheckBetween(arrReservation[index].checkIn, arrReservation[index].checkOut, checkIn);
    if (cond1 || cond2 || cond3) {
      return false;
    }
  }
  return true;
}

function newBooking(body, idBooking, idUser, callback) {
  let newBookingInHomeModel = {
    checkIn: body.checkIn,
    checkOut: body.checkOut,
    bookingId: idBooking
  };
  homeModel.update(
    { id: body.id },
    {
      $addToSet: {
        bookings: {
          $each: [newBookingInHomeModel]
        }
      }
    },
    function(err, data) {
      if (err) {
        callback(1, "Error al insertar la reserva en la base de datos home");
      } else {
        userModel.update(
          { uid: idUser },
          {
            $addToSet: {
              bookings: {
                $each: [{ bookingId: idBooking }]
              }
            }
          },
          {
            upsert: true
          },
          function(err, data) {
            if (err) {
              callback(1, "Error al insertar la reserva en la base de datos user");
            } else {
              callback(0, "La reserva se realizo con exito");
            }
          }
        );
      }
    }
  );
}

function homeAvailability(body, callback) {
  let query = {//Json que es utilizado como parametro de busqueda en MLAB
    id: body.id
  };
  homeModel.find(query, (err, homes) => {//Accede a la base de datos de MLAB con la query
    var livingPlace;
    if (err) {//en caso de que se cometa un error en la consulta
      // en caso de error retorno  1 y false
      callback(1, "Ha ocurrido un error");
    } else if (homes.length == 0) {
      // en caso de que la consulta sea vacia retorno 0 y null el dato
      callback(1, "No existe la casa solicitada");
    } else {
      // siendo positiva la consulta retorno el array
      // procedemos a calcular el totalAmount e insertarlo en el JSON de respuesta
      livingPlace = homes[0];
      callback(0, isAvailability(body.checkIn, body.checkOut, livingPlace));
    }
  });
}

module.exports = {
    getHomes,
    dateCheckBetween,
    dateLogicalValidation,
    typeConverter,
    cityConverter,
    homeAvailability,
    newBooking,
    daysDifference,
    isAvailability
};
