

function jsonIsEmpty(json){
    if(JSON.stringify(json)=='{}'){ 
        return true;
    }else{
        return false;
    }
}

function paramsValidator(json){
    var params ="";
    
    if(json.city == undefined){
        params=params+" city,";
    }  
    
    if(json.checkIn == undefined){
        params=params+" checkIn,";
    }
    if(json.checkOut == undefined){
        params=params+" checkOut,";
    }
    if(json.type == undefined){
        params=params+" type,";
    }
    return params;  

}

function dateFormatValidation(json){
    var regexNaix = /^(0[1-9]|[1-2]\d|3[01])(\-)(0[1-9]|1[012])\2(\d{4})$/;  
    var validationDate ="";  
        
    if(!regexNaix.test(json.checkIn)){
        validationDate=validationDate+" checkIn,";
    }
    if(!regexNaix.test(json.checkOut)){
        validationDate=validationDate+" checkOut,";
    }  
    return validationDate;
}

function paramsType(json){
    paramsType="";    
    if(typeof (json.city)  != "string"){
        paramsType=paramsType+" city debe ser String,";
    }  
    
    if(typeof (json.checkIn)  != "string"){
        paramsType=paramsType+" checkIn debe ser String,";
    }
    if(typeof (json.checkOut)  != "string"){
        paramsType=paramsType+" checkOut debe ser String,";
    }
    if(typeof (json.type)  != "string"){
        paramsType=paramsType+" type debe ser String,";
    }
    return paramsType;
}







module.exports={
    jsonIsEmpty,
    paramsValidator,
    dateFormatValidation,
    paramsType
   
}


