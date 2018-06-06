var assert = require('assert');
var userController = require("../controllers/userController");


describe('testUnit userController',function(){
    


    describe('myBookings consulta las casas disponibles en un intervalo de tiempo, segun su id',function(){

        it('Retorna al validar con el id = 1 en las fechas 07-04-2018 / 10-04-2018  --> true ',function(){
            
            userController.myBookings(
                "9Mkgz46wmQX0nNSKqucrtkNaYJp1",
                {
                    "name": "Arriendamientos Jansel",
                    "nit": "1212312121-12121212"
                },  function(err, data){
                    assert.equal(err,2);                    
                    
                })          
        }); 

      
    });



});