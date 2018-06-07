var assert = require('assert');
var userController = require("../controllers/userController");


describe('testUnit userController',function(){
    


    describe('myBookings consulta las reservas de cada usuario segun su iud',function(){

        it('Retorna al validar con el uid = 9Mkgz46wmQX0nNSKqucrtkNaYJp1, no valido --> 1 ',function(){
            
            userController.myBookings(
                {
                    "uid": "9Mkgz46wmQX0nNSKqucrtkNaYJp1"
                },
                {  "agency": 
                    { 
                        "name": "Arrendamientos Santa Fé",
                        "nit": "1123-1233-12313-51414"
                    }
                },  function(err, data){
                    assert.equal(err,1);                    
                }) 

        });
        
        it('Retorna al validar con el uid = 9Mkgz46wmQX0nNSKqucrtkNaYJp1, no valido --> 1 ',function(){
            
            userController.myBookings(
                {
                    "uid": "9Mkgz46wmQX0nNSKqucrtkNaYJp1"
                },
                {  "agency": 
                    { 
                        "name": "Arrendamientos Santa Fé",
                        "nit": "1123-1233-12313-51414"
                    }
                },  function(err, data){
                    assert.equal(err,1);                    
                }) 

        });

      
    });

    describe('removeBooking consulta y cancela una reserva de un usuario segun su iud y bookingId ',function(){

        it('Retorna al validar con el uid (no valido) y bookingId cualquiera --> 1 ',function(){
            
            userController.removeBooking(
                {
                    "uid": "9Mkgz46wmQX0nNSKqucrtkNaYJp1"
                },
                
                     "1*07-04-2018*10-04-2018"
                
                ,
                {  "agency": 
                    { 
                        "name": "Arrendamientos Santa Fé",
                        "nit": "1123-1233-12313-51414"
                    }
                },  function(err, data){
                    assert.equal(err,1);                    
                }) 

        });

        it('Retorna al validar con el uid (no valido) y bookingId cualquiera --> 1 ',function(){
            
            userController.removeBooking(
                {
                    "uid": "9Mkgz46wmQX0nNSKqucrtkNaYJp1"
                },
                
                     "1*07-04-2018*10-04-2018"
                
                ,
                {  "agency": 
                    { 
                        "name": "Arrendamientos Santa Fé",
                        "nit": "1123-1233-12313-51414"
                    }
                },  function(err, data){
                    assert.equal(err,1);                    
                }) 

        });
        
        
      

      
    });


});