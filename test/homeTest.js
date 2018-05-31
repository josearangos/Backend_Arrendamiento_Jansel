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
        
    });

});