
// const routes = require('../routes/routes');
// var assert = require('assert');
// let chaiHttp = require('chai-http');

// const app=require('./../app');
// let chai = require('chai');
// var should = chai.should();
// chai.use(chaiHttp);
// var expect = chai.expect;


// describe('Pruebas de servicio', function() {


//         // describe('POST', function(){
//         //     it('Should return OK', function(done){
//         //         let req = {
                    
//         //                 "checkIn": "07-04-2018",
//         //                 "checkOut": "10-04-2018",
//         //                 "city": "CO-MED",
//         //                 "type": "1"
//         //         }
//         //         chai.request(api)
//         //             .post('/homes/search')
//         //             .send(req)
//         //             .end(function(err,res){
//         //                 res.should.have.status(404);
//         //                 assert.equal(res.text, 'La ciudad no fue encontrada');
//         //                 done();
//         //             })
//         //     })
//         // });

//         it('Prueba de mybookings', (done) => {
//             chai.request(app)
//                 .post('/v1/homes/myBooking')         
//                 .set('token',"eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1ZjUyYTRhNGE5Y2MzNmZjOGEyNWZmMmQ0NzY4NmE0OGM2YjcxZWQifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20veW90ZWFycmllbmRvLWQ1MzJmIiwibmFtZSI6IkdUQSBDb2RlIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWGRVSXFkTWtDV0EvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvNDI1MnJzY2J2NU0vcGhvdG8uanBnIiwiYXVkIjoieW90ZWFycmllbmRvLWQ1MzJmIiwiYXV0aF90aW1lIjoxNTI4NTAyMTI2LCJ1c2VyX2lkIjoicmNHNHpKcEszSWFGNjl1enk3SVhjSUlMalJpMSIsInN1YiI6InJjRzR6SnBLM0lhRjY5dXp5N0lYY0lJTGpSaTEiLCJpYXQiOjE1Mjg1MDIxMjYsImV4cCI6MTUyODUwNTcyNiwiZW1haWwiOiJndGFjb2Rld2ViQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA4MTg4NDA0NzY5MTQzNTU2MTQwIl0sImVtYWlsIjpbImd0YWNvZGV3ZWJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.PQO6quWkXsfGoY6Yk_1rcdft9HBNvvYBBv2aCsnj9B_7cEbi7F6ehWZDQl9rM_7XdWV-FgXL41OXhG3h8IYUh8CdU4Vz0Hrc5uH1__L-jHwUu9Evs43Za3zoK-CoddN7Hs3IW0M3M6Y5bBKx9l0H5KC_42YI54Xem5oMFc-kovQ7F-2jnJhK18acobRzDsi-Dbw7N27ZB_8ESzWJJkh8N-73iYTT1o1cI9MP8IjrMpjVCijtiw7X36Zkb0hIwmOhaY_6g05sjR4knW6irMeKo13fxnjKgX6ahAIpaCdGxrhoXe7En4jQY5xZ8URtFfVo8qlYEwauv1qONxY3ZdcOow")
//                 .send()
//                 .end( function(err,res){             
//                     expect(res).to.have.status(200);
//                     done();
//                 });
//         });

//         it('Prueba de booking', (done) => {
//             chai.request(app)
//                 .post('/v1/homes/booking')         
//                 .set('token',"eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1ZjUyYTRhNGE5Y2MzNmZjOGEyNWZmMmQ0NzY4NmE0OGM2YjcxZWQifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20veW90ZWFycmllbmRvLWQ1MzJmIiwibmFtZSI6IkdUQSBDb2RlIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWGRVSXFkTWtDV0EvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvNDI1MnJzY2J2NU0vcGhvdG8uanBnIiwiYXVkIjoieW90ZWFycmllbmRvLWQ1MzJmIiwiYXV0aF90aW1lIjoxNTI4NTAyMTI2LCJ1c2VyX2lkIjoicmNHNHpKcEszSWFGNjl1enk3SVhjSUlMalJpMSIsInN1YiI6InJjRzR6SnBLM0lhRjY5dXp5N0lYY0lJTGpSaTEiLCJpYXQiOjE1Mjg1MDIxMjYsImV4cCI6MTUyODUwNTcyNiwiZW1haWwiOiJndGFjb2Rld2ViQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA4MTg4NDA0NzY5MTQzNTU2MTQwIl0sImVtYWlsIjpbImd0YWNvZGV3ZWJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.PQO6quWkXsfGoY6Yk_1rcdft9HBNvvYBBv2aCsnj9B_7cEbi7F6ehWZDQl9rM_7XdWV-FgXL41OXhG3h8IYUh8CdU4Vz0Hrc5uH1__L-jHwUu9Evs43Za3zoK-CoddN7Hs3IW0M3M6Y5bBKx9l0H5KC_42YI54Xem5oMFc-kovQ7F-2jnJhK18acobRzDsi-Dbw7N27ZB_8ESzWJJkh8N-73iYTT1o1cI9MP8IjrMpjVCijtiw7X36Zkb0hIwmOhaY_6g05sjR4knW6irMeKo13fxnjKgX6ahAIpaCdGxrhoXe7En4jQY5xZ8URtFfVo8qlYEwauv1qONxY3ZdcOow")
//                 .send({
//                     "id" : "1",
//                     "checkIn": "17-07-2018",
//                     "checkOut": "20-07-2018"
//                 })
//                 .end( function(err,res){                    
//                     expect(res).to.have.status(200);
//                     done();
//                 });
//         });

//         /*it('should insert a sdfgsd', (done) => {
//             chai.request(app)
//                 .post('/v1/homes/search/')
//                 .send( 
//                     {checkIn: "07-07-2018",
//                     checkOut: "10-10-2018",
//                     city: "CO-MDE",
//                     type: "1"})
//                 .end( function(err,res){
//                     console.log(res);
//                     expect(res).to.have.status(200);
//                     done();
//                 });
//         });
//         */
//   });