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
});