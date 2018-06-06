var assert = require('assert');
var homeController = require("../controllers/homeController");


describe('testUnit HomeController',function(){

    describe('cityConverter codigo en la ciudad',function(){
        it('converts CO-CLO en cali',function(){
            assert.equal(homeController.cityConverter('CO-CLO'),"Cali");        
        });   
     
        it('converts CO-SMR  to Santa Marta',function(){
            assert.equal(homeController.cityConverter('CO-SMR'),"Santa Marta");          
         });

        it('converts CO-CTG to Cartagena',function(){
            assert.equal(homeController.cityConverter('CO-CTG'),"Cartagena");          
        });

        it('converts CO-MDE to Medellín',function(){
            assert.equal(homeController.cityConverter('CO-MDE'),"Medellín");          
        });
        
    });

    describe('typeConverter codigo del tipo de casa',function(){
        it('convierte de type 1 --> Apartamento ',function(){
            assert.equal(homeController.typeConverter('1'),"Apartamento");        
        });   
     
        it('convierte de type 2 --> Casa',function(){
            assert.equal(homeController.typeConverter('2'),"Casa");          
        });

        it('convierte de type 3 --> Luxury',function(){
            assert.equal(homeController.typeConverter('3'),"Luxury");          
        });

    });

    describe('daysDifference intervalo de fechas a numero de dias',function(){
        it('convierte de 15-03-2015 / 30-03-2015--> 15 ',function(){
            assert.equal(homeController.daysDifference('15-03-2015','30-03-2015'),"15");        
        });   

        it('convierte de 05-04-2015 / 30-05-2015--> 55 ',function(){
            assert.equal(homeController.daysDifference('05-04-2015','30-05-2015'),"55");        
        });   
        
        it('convierte de 15-03-2017 / 15-03-2018--> 3655 ',function(){
            assert.equal(homeController.daysDifference('15-03-2017','15-03-2018'),"365");        
        });      

    });

    describe('dateLogicalValidation valida que las fechas sean adecuadas',function(){
        it('Retorna al comparar fechas "checkIn": "07-06-2018"-"checkOut": "10-06-2018", --> [true, ""]',function(){
            assert.deepEqual(homeController.dateLogicalValidation({
                "checkIn": "07-06-2018",
                "checkOut": "10-06-2018",
                "city": "MED",
                "type": "1"
                }), [true, ""] );        
        }); 

        it('Retorna al comparar fechas "checkIn": "10-06-2018"-"checkOut": "10-06-2018" --> [false, "Las fechas NO pueden ser iguales"]  ',function(){
            assert.deepEqual(homeController.dateLogicalValidation({
                "checkIn": "10-06-2018",
                "checkOut": "10-06-2018",
                "city": "MED",
                "type": "1"
                }), [false, "Las fechas NO pueden ser iguales"] );        
        });  

        it('Retorna al comparar fechas "checkIn": "10-06-2018"-"checkOut": "1-06-2018" --> [false, "Las fecha de llegada No puede ser menor que la fecha de salida"]  ',function(){
            assert.deepEqual(homeController.dateLogicalValidation({
                "checkIn": "10-06-2018",
                "checkOut": "1-06-2018",
                "city": "MED",
                "type": "1"
                }), [false, "Las fecha de llegada No puede ser menor que la fecha de salida"] );        
        });  

    });

    describe('getHomes consulta las casas disponibles en un intervalo de tiempo',function(){

        it('Retorna al consultar con la ciudad MDE, en ves de CO-MDE --> [4, Mensaje de error]',function(){
            
            homeController.getHomes(
                {
                "checkIn": "07-06-2018",
                "checkOut": "10-06-2018",
                "city": "MDE",
                "type": "1"
                }, function(err,data){
                    assert.equal(err,4);                    
                    
                })          
        }); 

        it('Retorna al consultar en las fechas "checkIn": "07-06-2018"-"checkOut": "10-06-2018", --> [0, Mensaje OK]',function(){
            
            homeController.getHomes(
                {
                "checkIn": "07-06-2018",
                "checkOut": "10-06-2018",
                "city": "CO-MDE",
                "type": "1"
                }, function(err,data){
                    assert.equal(err,0);                    
                   
                })          
        }); 
        
        

    });

    describe('isAvailability Valida la disponibilidad de las home, segun las fechas solicitadas y ru arreglo de reservas',function(){
        
        it('valida a "12-06-2018" / "16-06-2018" respecto a 15-03-2015/30-03-2015 --> true ',function(){
            assert.equal(homeController.isAvailability('15-03-2015','30-03-2015',
            {"bookings":
                [{
                "checkIn": "12-06-2018",
                "checkOut": "16-06-2018",
                "bookingId": "1*12-06-2018*16-06-2018"
                }]
            }
        ),true);        
        }); 
        
        it('valida a "12-06-2017" / "16-06-2019" respecto a 15-03-2018/30-03-2018 --> false ',function(){
            assert.equal(homeController.isAvailability('15-03-2018','30-03-2018',
            {"bookings":
                [{
                "checkIn": "12-06-2017",
                "checkOut": "16-06-2019",
                "bookingId": "1*12-06-2018*16-06-2018"
                }]
            }
        ),false);        
        }); 

           

    });


    describe('homeAvailability consulta las casas disponibles en un intervalo de tiempo, segun su id',function(){

        it('Retorna al validar con el id = 1 en las fechas 07-04-2018 / 10-04-2018  --> true ',function(){
            
            homeController.homeAvailability(
                {   
                    "id": 1,
                    "name": "Torre davivienda",
                    "checkIn": "07-04-2018",
                    "checkOut": "10-04-2018"
                },  function(err, resAux){
                    assert.equal(err,true);                    
                    
                })          
        }); 

        it('Retorna al validar con el id = 30 en las fechas 07-04-2018 / 10-04-2018  --> false',function(){
            
            homeController.homeAvailability(
                {   
                    "id": 30,
                    "name": "Torre davivienda",
                    "checkIn": "07-04-2018",
                    "checkOut": "10-04-2018"
                },  function(err, resAux){
                    assert.equal(err,false);                    
                    
                })          
        });

    });

    describe('newBooking Realiza una nueva reserva',function(){

        it('Retorna al validar una nueva reserva --> 1 ',function(){
            
            homeController.newBooking(
                {   
                    "checkIn": "07-04-2018",
                    "checkOut": "10-04-2018",
                    "id": 1
                }, "1*12-06-2018*16-06-2018", "9Mkgz46wmQX0nNSKqucrtkNaYJp1", 
                function(err, data){
                    assert.deepEqual(err,"4");                    
                })          
        }); 

    });
           

       


});