var assert = require('assert');
var homeController = require("../controllers/homeController");
var routes = require('../routes/routes');
var chaiHttp = require('chai-http');

var app = require('./../app');
var chai = require('chai');
var should = chai.should();
chai.use(chaiHttp);
var expect = chai.expect;
var userController = require("../controllers/userController");
var validator = require('../validations/validator');

describe('Pruebas de servicio', function () {


    // it('Prueba de mybookings', (done) => {
    //         chai.request(app)
    //         .post('/v1/homes/myBooking')         
    //         .set('token',"eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1ZjUyYTRhNGE5Y2MzNmZjOGEyNWZmMmQ0NzY4NmE0OGM2YjcxZWQifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20veW90ZWFycmllbmRvLWQ1MzJmIiwibmFtZSI6IlNFQkFTVEnDgU4gT1NPUk5PIFpBUEFUQSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLWc4QjhPaE04dDFFL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL3cwRmdZSklzbXJZL3Bob3RvLmpwZyIsImF1ZCI6InlvdGVhcnJpZW5kby1kNTMyZiIsImF1dGhfdGltZSI6MTUyODU1MDQyOCwidXNlcl9pZCI6InZDMzJpWHlyT0NkVDV5ZDE4MVo1V200Y1dEajIiLCJzdWIiOiJ2QzMyaVh5ck9DZFQ1eWQxODFaNVdtNGNXRGoyIiwiaWF0IjoxNTI4NTUwNDI4LCJleHAiOjE1Mjg1NTQwMjgsImVtYWlsIjoic2ViYXN0aWFuLm9zb3Jub0B1ZGVhLmVkdS5jbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEwMjA3MDUyNDUxNzIzNjIzNDk1Il0sImVtYWlsIjpbInNlYmFzdGlhbi5vc29ybm9AdWRlYS5lZHUuY28iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.i--I9D5ZbpmGwjn-gF4d0DgDDCSiGZpkeKZE00EMbj8VZq5Y_yOdOf5bUUCXDaTYD34TQypdlH4nv2rORZJJ0_zGR__T50YaefMeJ-LiTBiEgu6TKNXC7ZDBxL9-2K9i3_vUSvN5iDo7ZyApmeY2a3pKpAya08zrYUKETKuyTVXID6RX6pHnkgDomqY0HgUJkPrICS4UWqVwHZmq8g6n2ZpWb3MF7JnYB9H-D1k0mKJVK3xr35cbTUrL6hSSoT9ekBAmfcziCYgn7ZGE0Uy-WMsDZcgHOzNneeJdCfahOdlayFczZDb0NvYsjVvnhnx-QpfAeQPDauWrpvQHo4bpyw")
    //         .send()
    //         .end( function(err,res){             
    //             expect(res).to.have.status(200);
    //             done();
    //         });
    // });

    it('Prueba de mybookings', (done) => {
        chai.request(app)
            .post('/v1/homes/myBooking')
            .set('token', "eyJhbSUzI1NiIsImtpZCI6IjE1ZjUyYTRhNGE5Y2MzNmZjOGEyNWZmMmQ0NzY4NmE0OGM2YjcxZWQifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20veW90ZWFycmllbmRvLWQ1MzJmIiwibmFtZSI6IkdUQSBDb2RlIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWGRVSXFkTWtDV0EvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvNDI1MnJzY2J2NU0vcGhvdG8uanBnIiwiYXVkIjoieW90ZWFycmllbmRvLWQ1MzJmIiwiYXV0aF90aW1lIjoxNTI4NTA1OTAzLCJ1c2VyX2lkIjoicmNHNHpKcEszSWFGNjl1enk3SVhjSUlMalJpMSIsInN1YiI6InJjRzR6SnBLM0lhRjY5dXp5N0lYY0lJTGpSaTEiLCJpYXQiOjE1Mjg1MDU5MDMsImV4cCI6MTUyODUwOTUwMywiZW1haWwiOiJndGFjb2Rld2ViQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA4MTg4NDA0NzY5MTQzNTU2MTQwIl0sImVtYWlsIjpbImd0YWNvZGV3ZWJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.YK9jpDSi_O0dH0MuSx6Fo-EXtWlUwHTXia0Fn21sP_aPcZ_VwaSIPOWUgL_UIf60b7Q4eULu43bKUFXImrgSz_LTy_16I5QcFwvQDLAkdswW6_MpDTUB5p6lAS2N5gPLYzsG7XHf3wG6RvhB_q4WVOmZqTjkHZdhtOO5PYMWUFLhGTsx9wZ5qci7TBY5otNnZw6I-dTCE59f2vWlujXyW2_GzWcWf0PI2V6Z7zkP8P0GhYuTFlRYEZCGpgmzikN5rg6Zx03VHha8P-xU7tHEVoMbnrGPOcJXC5p9H_EW8lKN9iT3wA1pBoto0tU1GMI3VYMnvf7ZBB72_UoM_UjUbQ")
            .send()
            .end(function (err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });


    it('Prueba de booking', (done) => {
        chai.request(app)
            .post('/v1/homes/booking')
            .set('token', "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1ZjUyYTRhNGE5Y2MzNmZjOGEyNWZmMmQ0NzY4NmE0OGM2YjcxZWQifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20veW90ZWFycmllbmRvLWQ1MzJmIiwibmFtZSI6IkdUQSBDb2RlIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWGRVSXFkTWtDV0EvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvNDI1MnJzY2J2NU0vcGhvdG8uanBnIiwiYXVkIjoieW90ZWFycmllbmRvLWQ1MzJmIiwiYXV0aF90aW1lIjoxNTI4NTAyMTI2LCJ1c2VyX2lkIjoicmNHNHpKcEszSWFGNjl1enk3SVhjSUlMalJpMSIsInN1YiI6InJjRzR6SnBLM0lhRjY5dXp5N0lYY0lJTGpSaTEiLCJpYXQiOjE1Mjg1MDIxMjYsImV4cCI6MTUyODUwNTcyNiwiZW1haWwiOiJndGFjb2Rld2ViQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA4MTg4NDA0NzY5MTQzNTU2MTQwIl0sImVtYWlsIjpbImd0YWNvZGV3ZWJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.PQO6quWkXsfGoY6Yk_1rcdft9HBNvvYBBv2aCsnj9B_7cEbi7F6ehWZDQl9rM_7XdWV-FgXL41OXhG3h8IYUh8CdU4Vz0Hrc5uH1__L-jHwUu9Evs43Za3zoK-CoddN7Hs3IW0M3M6Y5bBKx9l0H5KC_42YI54Xem5oMFc-kovQ7F-2jnJhK18acobRzDsi-Dbw7N27ZB_8ESzWJJkh8N-73iYTT1o1cI9MP8IjrMpjVCijtiw7X36Zkb0hIwmOhaY_6g05sjR4knW6irMeKo13fxnjKgX6ahAIpaCdGxrhoXe7En4jQY5xZ8URtFfVo8qlYEwauv1qONxY3ZdcOow")
            .send({

                "checkIn": "17-07-2018",
                "checkOut": "20-07-2018"
            })
            .end(function (err, res) {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('Prueba de booking', (done) => {
        chai.request(app)
            .post('/v1/homes/booking')
            .set('token', "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1ZjUyYTRhNGE5Y2MzNmZjOGEyNWZmMmQ0NzY4NmE0OGM2YjcxZWQifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20veW90ZWFycmllbmRvLWQ1MzJmIiwibmFtZSI6IlNFQkFTVEnDgU4gT1NPUk5PIFpBUEFUQSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLWc4QjhPaE04dDFFL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL3cwRmdZSklzbXJZL3Bob3RvLmpwZyIsImF1ZCI6InlvdGVhcnJpZW5kby1kNTMyZiIsImF1dGhfdGltZSI6MTUyODU1MDQyOCwidXNlcl9pZCI6InZDMzJpWHlyT0NkVDV5ZDE4MVo1V200Y1dEajIiLCJzdWIiOiJ2QzMyaVh5ck9DZFQ1eWQxODFaNVdtNGNXRGoyIiwiaWF0IjoxNTI4NTUwNDI4LCJleHAiOjE1Mjg1NTQwMjgsImVtYWlsIjoic2ViYXN0aWFuLm9zb3Jub0B1ZGVhLmVkdS5jbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEwMjA3MDUyNDUxNzIzNjIzNDk1Il0sImVtYWlsIjpbInNlYmFzdGlhbi5vc29ybm9AdWRlYS5lZHUuY28iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.i--I9D5ZbpmGwjn-gF4d0DgDDCSiGZpkeKZE00EMbj8VZq5Y_yOdOf5bUUCXDaTYD34TQypdlH4nv2rORZJJ0_zGR__T50YaefMeJ-LiTBiEgu6TKNXC7ZDBxL9-2K9i3_vUSvN5iDo7ZyApmeY2a3pKpAya08zrYUKETKuyTVXID6RX6pHnkgDomqY0HgUJkPrICS4UWqVwHZmq8g6n2ZpWb3MF7JnYB9H-D1k0mKJVK3xr35cbTUrL6hSSoT9ekBAmfcziCYgn7ZGE0Uy-WMsDZcgHOzNneeJdCfahOdlayFczZDb0NvYsjVvnhnx-QpfAeQPDauWrpvQHo4bpyw")
            .send({
                'id': '1',
                "checkIn": "17-07-2018",
                "checkOut": "20-07-2018"
            })
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should insert a sdfgsd', (done) => {
        chai.request(app)
            .post('/v1/homes/search/')
            .send(
                {
                    checkIn: "07-07-2018",
                    checkOut: "10-10-2018",
                    city: "CO-MDE",
                    type: "1"
                })
            .end(function (err, res) {

                expect(res).to.have.status(200);
                done();
            });
    });

    // it('should insert a sdfgsd', (done) => {
    //     chai.request(app)
    //         .post('/v1/homes/search/')
    //         .send( 
    //             {checkIn: "07-07-2018",
    //             checkOut: "10-10-2018",
    //             city: "CO-MED",
    //             type: "1"})
    //         .end( function(err,res){

    //             expect(res).to.have.status(404);
    //             done();
    //         });
    // });

    it('delete', (done) => {
        chai.request(app)
            .delete('/v1/homes/removeBooking/')
            .set('token', "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1ZjUyYTRhNGE5Y2MzNmZjOGEyNWZmMmQ0NzY4NmE0OGM2YjcxZWQifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20veW90ZWFycmllbmRvLWQ1MzJmIiwibmFtZSI6IkdUQSBDb2RlIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWGRVSXFkTWtDV0EvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvNDI1MnJzY2J2NU0vcGhvdG8uanBnIiwiYXVkIjoieW90ZWFycmllbmRvLWQ1MzJmIiwiYXV0aF90aW1lIjoxNTI4NTAyMTI2LCJ1c2VyX2lkIjoicmNHNHpKcEszSWFGNjl1enk3SVhjSUlMalJpMSIsInN1YiI6InJjRzR6SnBLM0lhRjY5dXp5N0lYY0lJTGpSaTEiLCJpYXQiOjE1Mjg1MDIxMjYsImV4cCI6MTUyODUwNTcyNiwiZW1haWwiOiJndGFjb2Rld2ViQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA4MTg4NDA0NzY5MTQzNTU2MTQwIl0sImVtYWlsIjpbImd0YWNvZGV3ZWJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.PQO6quWkXsfGoY6Yk_1rcdft9HBNvvYBBv2aCsnj9B_7cEbi7F6ehWZDQl9rM_7XdWV-FgXL41OXhG3h8IYUh8CdU4Vz0Hrc5uH1__L-jHwUu9Evs43Za3zoK-CoddN7Hs3IW0M3M6Y5bBKx9l0H5KC_42YI54Xem5oMFc-kovQ7F-2jnJhK18acobRzDsi-Dbw7N27ZB_8ESzWJJkh8N-73iYTT1o1cI9MP8IjrMpjVCijtiw7X36Zkb0hIwmOhaY_6g05sjR4knW6irMeKo13fxnjKgX6ahAIpaCdGxrhoXe7En4jQY5xZ8URtFfVo8qlYEwauv1qONxY3ZdcOow")
            .send(
                {
                    checkIn: "07-07-2018",
                    checkOut: "10-10-2018",
                    city: "CO-MED",
                    type: "1"
                })
            .end(function (err, res) {

                expect(res).to.have.status(500);
                done();
            });
    });

});

describe('testUnit validators', function () {

    describe('jsonIsEmpty valida que el Json ingresado no sea vacio', function () {
        it('valida el Json {id:1} --> false', function () {

            assert.equal(validator.jsonIsEmpty(
                { 'id': '1' }), false);
        });

        it('valida el Json { } --> false', function () {

            assert.equal(validator.jsonIsEmpty(
                {}), true);
        });

        it('valida el Json del request que este correcto --> [true, ""]', function () {

            assert.deepEqual(validator.generalValidation(
                {
                    "checkIn": "07-04-2018",
                    "checkOut": "10-04-2018",
                    "city": "MED",
                    "type": "1"
                }), [true, ""]);
        });

        it('valida el Json del request que este correcto --> [false, ""]', function () {

            assert.deepEqual(validator.generalValidation(
                {
                    "checkIn": "07-04-2018",
                    "checkOut": "10-044-2018",
                    "city": "MED",
                    "type": "1"
                }), [false, "Fechas con formato incorrecto: checkOut,"]);
        });

        it('valida el Json del request que este correcto --> [false, ""]', function () {

            assert.deepEqual(validator.generalValidation(
                {
                    "checkIn": "07-04-2018",
                    "checkOut": "10-04-2018",

                    "type": "1"
                }), [false, "Faltan los siguiete campos en el request: city,"]);
        });

        it('valida el Json del request que este correcto --> [false, ""]', function () {

            assert.deepEqual(validator.dateFormatValidation(
                {
                    "checkIn": "07-04-2018",
                    "checkOut": "10-044-2018",
                    "city": "MED",
                    "type": "1"
                }
            ), " checkOut,");
        });

        it('valida el Json del request que este correcto --> [false, ""]', function () {

            assert.deepEqual(validator.paramsType(
                {
                    "checkIn": 23,
                    "checkOut": "10-044-2018",
                    "city": "MED",
                    "type": 2
                }
            ), " checkIn debe ser String, type debe ser String,");
        });

        it('valida el ', function () {

            assert.equal(validator.bookingIdFormat(

                "1*07-04-20148*10-04-2018"


            ), "Fechas con formato incorrecto: checkIn,");
        });
    });




});


describe('testUnit HomeController', function () {

    describe('cityConverter codigo en la ciudad', function () {
        it('converts CO-CLO en cali', function () {
            assert.equal(homeController.cityConverter('CO-CLO'), "Cali");
        });

        it('converts CO-SMR  to Santa Marta', function () {
            assert.equal(homeController.cityConverter('CO-SMR'), "Santa Marta");
        });

        it('converts CO-CTG to Cartagena', function () {
            assert.equal(homeController.cityConverter('CO-CTG'), "Cartagena");
        });

        it('converts CO-MDE to Medellín', function () {
            assert.equal(homeController.cityConverter('CO-MDE'), "Medellín");
        });

    });

    describe('typeConverter codigo del tipo de casa', function () {
        it('convierte de type 1 --> Apartamento ', function () {
            assert.equal(homeController.typeConverter('1'), "Apartamento");
        });

        it('convierte de type 2 --> Casa', function () {
            assert.equal(homeController.typeConverter('2'), "Casa");
        });

        it('convierte de type 3 --> Luxury', function () {
            assert.equal(homeController.typeConverter('3'), "Luxury");
        });

    });

    describe('daysDifference intervalo de fechas a numero de dias', function () {
        it('convierte de 15-03-2015 / 30-03-2015--> 15 ', function () {
            assert.equal(homeController.daysDifference('15-03-2015', '30-03-2015'), "15");
        });

        it('convierte de 05-04-2015 / 30-05-2015--> 55 ', function () {
            assert.equal(homeController.daysDifference('05-04-2015', '30-05-2015'), "55");
        });

        it('convierte de 15-03-2017 / 15-03-2018--> 3655 ', function () {
            assert.equal(homeController.daysDifference('15-03-2017', '15-03-2018'), "365");
        });

    });

    describe('dateLogicalValidation valida que las fechas sean adecuadas', function () {
        it('Retorna al comparar fechas "checkIn": "07-06-2018"-"checkOut": "10-06-2018", --> [true, ""]', function () {
            assert.deepEqual(homeController.dateLogicalValidation({
                "checkIn": "17-06-2018",
                "checkOut": "20-06-2018",
                "city": "MED",
                "type": "1"
            }), [true, ""]);
        });

        it('Retorna al comparar fechas "checkIn": "10-06-2018"-"checkOut": "10-06-2018" --> [false, "Las fechas NO pueden ser iguales"]  ', function () {
            assert.deepEqual(homeController.dateLogicalValidation({
                "checkIn": "10-06-2018",
                "checkOut": "10-06-2018",
                "city": "MED",
                "type": "1"
            }), [false, "Las fechas NO pueden ser iguales"]);
        });

        it('Retorna al comparar fechas "checkIn": "10-06-2018"-"checkOut": "1-06-2018" --> [false, "Las fecha de llegada No puede ser menor que la fecha de salida"]  ', function () {
            assert.deepEqual(homeController.dateLogicalValidation({
                "checkIn": "10-06-2018",
                "checkOut": "1-06-2018",
                "city": "MED",
                "type": "1"
            }), [false, "Las fecha de llegada No puede ser menor que la fecha de salida"]);
        });

    });

    describe('getHomes consulta las casas disponibles en un intervalo de tiempo', function () {

        it('Retorna al consultar con la ciudad MDE, en ves de CO-MDE --> [4, Mensaje de error]', function () {

            homeController.getHomes(
                {
                    "checkIn": "17-06-2018",
                    "checkOut": "20-06-2018",
                    "city": "MDE",
                    "type": "1"
                }, function (err, data) {
                    assert.equal(err, 4);
                })
        });





    });

  









});






describe('testUnit userController', function () {



   

    describe('removeBooking consulta y cancela una reserva de un usuario segun su iud y bookingId ', function () {

        

        it('Retorna al consultar en las fechas "checkIn": "07-06-2018"-"checkOut": "10-06-2018", --> [0, Mensaje OK]', function () {

            homeController.getHomes(
                {
                    "checkIn": "17-06-2018",
                    "checkOut": "20-06-2018",
                    "city": "CO-MDE",
                    "type": "1"
                }, function (err, data) {
                    assert.equal(err, 0);

                })
        });


        describe('homeAvailability consulta las casas disponibles en un intervalo de tiempo, segun su id', function () {

            it('Retorna al validar con el id = 1 en las fechas 07-04-2018 / 10-04-2018  --> true ', function () {

                homeController.homeAvailability(
                    {
                        "id": 1,
                        "name": "Torre davivienda",
                        "checkIn": "07-04-2018",
                        "checkOut": "10-04-2018"
                    }, function (err, resAux) {
                        assert.equal(err, true);

                    })
            });



        });

        it('Retorna al validar con el id = 30 en las fechas 07-04-2018 / 10-04-2018  --> false', function () {

            homeController.homeAvailability(
                {
                    "id": 30,
                    "name": "Torre davivienda",
                    "checkIn": "07-04-2018",
                    "checkOut": "10-04-2018"
                }, function (err, resAux) {
                    assert.equal(err, false);

                })
        });


    });


});



describe('newBooking Realiza una nueva reserva', function () {

    it('Retorna al validar una nueva reserva --> 1 ', function () {

        homeController.newBooking(
            {
                "id": 1,
                "name": "Torre davivienda",
                "checkIn": "07-04-2018",
                "checkOut": "10-04-2018"
            },
            "1*07-04-2018*10-04-2018",
            "9Mkgz46wmQX0nNSKqucrtkNaYJp1",
            function (err, resAux) {
                assert.equal(err, 1);
            }
        )
    });




});

describe('isAvailability Valida la disponibilidad de las home, segun las fechas solicitadas y ru arreglo de reservas', function () {


    it('valida a "12-06-2017" / "16-06-2019" respecto a 15-03-2018/30-03-2018 --> false ', function () {
        assert.equal(homeController.isAvailability('15-03-2018', '30-03-2018',
            {
                "bookings":
                    [{
                        "checkIn": "12-06-2017",
                        "checkOut": "16-06-2019",
                        "bookingId": "1*12-06-2018*16-06-2018"
                    }]
            }
        ), false);
    });

}); 

describe('isAvailability Valida la disponibilidad de las home, segun las fechas solicitadas y ru arreglo de reservas', function () {

    it('valida a "12-06-2018" / "16-06-2018" respecto a 15-03-2015/30-03-2015 --> true ', function () {
        assert.equal(homeController.isAvailability('15-03-2015', '30-03-2015',
            {
                "bookings":
                    [{
                        "checkIn": "12-06-2018",
                        "checkOut": "16-06-2018",
                        "bookingId": "1*12-06-2018*16-06-2018"
                    }]
            }
        ), true);
    });





});


describe('myBookings consulta las reservas de cada usuario segun su iud', function () {

    it('Retorna al validar con el uid = 9Mkgz46wmQX0nNSKqucrtkNaYJp1, no valido --> 1 ', function () {

        userController.myBookings(
            {
                "uid": "9Mkgz46wmQX0nNSKqucrtkNaYJp1"
            },
            {
                "agency":
                    {
                        "name": "Arrendamientos Santa Fé",
                        "nit": "1123-1233-12313-51414"
                    }
            }, function (err, data) {
                assert.equal(err, 1);
            })

    });

  


});


describe('myBookings consulta las reservas de cada usuario segun su iud', function () {

        

    it('Retorna al validar con el uid = 9Mkgz46wmQX0nNSKqucrtkNaYJp1, no valido --> 1 ', function () {

        userController.myBookings(
            {
                "uid": "9Mkgz46wmQX0nNSKqucrtkNaYJp1"
            },
            {
                "agency":
                    {
                        "name": "Arrendamientos Santa Fé",
                        "nit": "1123-1233-12313-51414"
                    }
            }, function (err, data) {
                assert.equal(err, 1);
            })

    });


});


describe('removeBooking consulta y cancela una reserva de un usuario segun su iud y bookingId ', function () {
    it('Retorna al validar con el uid (no valido) y bookingId cualquiera --> 1 ', function () {

        userController.removeBooking(
            {
                "uid": "9Mkgz46wmQX0nNSKqucrtkNaYJp1"
            },

            "1*07-04-2018*10-04-2018"

            ,
            {
                "agency":
                    {
                        "name": "Arrendamientos Santa Fé",
                        "nit": "1123-1233-12313-51414"
                    }
            }, function (err, data) {
                assert.equal(err, 1);
            })

    });



});

describe('removeBooking consulta y cancela una reserva de un usuario segun su iud y bookingId ', function () {
    it('Retorna al validar con el uid (no valido) y bookingId cualquiera --> 1 ', function () {

        userController.removeBooking(
            {
                "uid": "9Mkgz46wmQX0nNSKqucrtkNaYJp1"
            },

            "1*07-04-2018*10-04-2018"

            ,
            {
                "agency":
                    {
                        "name": "Arrendamientos Santa Fé",
                        "nit": "1123-1233-12313-51414"
                    }
            }, function (err, data) {
                assert.equal(err, 1);
            })

    });





});