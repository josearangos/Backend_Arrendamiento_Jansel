

function jsonIsEmpty(json) {
    if (JSON.stringify(json) == '{}') {
        return true;
    } else {
        return false;
    }
}

function paramsValidator(json) {
    var params = "";

    if (json.city == undefined) {
        params = params + " city,";
    }

    if (json.checkIn == undefined) {
        params = params + " checkIn,";
    }
    if (json.checkOut == undefined) {
        params = params + " checkOut,";
    }
    if (json.type == undefined) {
        params = params + " type,";
    }
    return params;

}

function dateFormatValidation(json) {
    var regexNaix = /^(0[1-9]|[1-2]\d|3[01])(\-)(0[1-9]|1[012])\2(\d{4})$/;
    var validationDate = "";

    if (!regexNaix.test(json.checkIn)) {
        validationDate = validationDate + " checkIn,";
    }
    if (!regexNaix.test(json.checkOut)) {
        validationDate = validationDate + " checkOut,";
    }
    return validationDate;
}

function paramsType(json) {
    paramsTypeS = "";
    if (typeof (json.city) != "string") {
        paramsTypeS = paramsTypeS + " city debe ser String,";
    }

    if (typeof (json.checkIn) != "string") {
        paramsTypeS = paramsTypeS + " checkIn debe ser String,";
    }
    if (typeof (json.checkOut) != "string") {
        paramsTypeS = paramsTypeS + " checkOut debe ser String,";
    }
    if (typeof (json.type) != "string") {
        paramsTypeS = paramsTypeS + " type debe ser String,";
    }
    return paramsTypeS;
}




function generalValidation(json) { // return true si todo anda bien false de lo contrario
    var result = [];
    result[0] = false; // si se presento
    result[1] =""; // los errores que se presenten

    if (json.jsonIsEmpty) {
        result[1] = 'El request esta vacio :/';
        return result;
    } else {
        var failedParams = paramsValidator(json);  // validar que el request tenga todos los campos de

        if (failedParams.length != 0) { 
            result[1] = 'Faltan los siguiete campos en el request:' + failedParams;
            return result;
        } else {

            var failedParamsType = paramsType(json); // validamos que tenga el tipo de dato correcto cada campo 
            
            if (failedParamsType.length != 0) {
                result[1] = 'Campos con tipo de dato incorrecto :' + failedParamsType;
                return result;
            } else {
                
                var failedDates = dateFormatValidation(json);  // validar fechas checkin y checkout
                
                if (failedDates.length != 0) {
                    result[1] = 'Fechas con formato incorrecto:' + failedDates;
                  
                    return result;
                
                } else {
                    result[0] = true;
                }

            }

        }

    }
        return result;
}




module.exports = {
    jsonIsEmpty,
    paramsValidator,
    dateFormatValidation,
    paramsType,
    generalValidation

}


