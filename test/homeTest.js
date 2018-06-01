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

    // describe('getHomes consulta las casas disponibles en un intervalo de tiempo',function(){

    //     it('Retorna al consultar en las fechas "checkIn": "07-06-2018"-"checkOut": "10-06-2018", --> [true, ""]',function(){
    //         assert.equal(homeController.getHomes({
    //             "checkIn": "07-06-2018",
    //             "checkOut": "10-06-2018",
    //             "city": "MED",
    //             "type": "1"
    //             },0), "" );        
    //     }); 
 

    // });


});