'use strict' // convencio de EMC6

const homeModel = require('../models/homeModel');//  importar modelo


var agency ={
    name:"Arriendamientos Jansel",
    nit:"1212312121-12121212"
};

function getHomes(queryHomes, callback){
        
    homeModel.find({},(err, homes)=>{
        if(err){
            callback(1,err);
        }else if(!homes){
            callback(0,null);
        }else{
            var responseHomes = {
                agency:agency,
                homes:homes
            }
            callback(0,responseHomes);
        }        
    });

}






module.exports={
    getHomes
   
}


/*

function getHomes(req, res) {
    // con el {} trae todas las palabras
        Word.find({}, (err, words) => {
            if (err) return res.status(500).send({ message: `Error al buscar ${err}` });
            if (!words) return res.status(404).send({ message: `No hay ` });
            res.status(200).send({ words: words });
        });
}

function getHome(req, res) {
    let wordId = req.params.wordId;
    Word.findById(wordId, (err, word) => {
        if (err) return res.status(500).send({ message: `Error al buscar ${err}` });
        if (!word) return res.status(404).send({ message: `la palabra no existe` });
        res.status(200).send({ word });
    });
}*/
/*
function insertWord(req, res) {
       //console.log(req.body);
    // hay que definir la convencion de que lo que se envia por el parametro como petición
    // sea igual a los atributos del schema ok  ...)
    let word = new Word();
    // llenamos el objeto a insertar con los datos de la petición 
    word.name = req.body.name;
    word.author = req.body.author;
    /* Procemos a guardarlo mediante un metodo que recibe una funcion Callback
   donde en err viene almacenado el error en caso tal de que este
   y en el otro parametro arroja el objeto almacenado el cual cuando se almacena 
   mongodb le va almacenar un Id unico para luego identificarlo y hacer un CRUD
   
    word.save((err, wordStored) => {
        if (err) {
            res.status(500) // los 500 son errores del Servidor
            res.send({ message: `Erro al salvar en la BD ${err}` });
        } else {
            res.status(200);
            res.send({ word: wordStored });
        }
    });

}*/



/*
function updateWord(req,res){
    let wordId=req.params.wordId; // obtenemos el Id del que queremos actualizar
    // obtenemos los datos que se van actualizar, los cuales estan en el body
    let dataToUpdate=req.body;
    // haciendo uso de la siguiente funcion podemos hacer el put
    
    Word.findByIdAndUpdate(wordId,dataToUpdate,(err,wordUpdated)=>{
        if (err) return res.status(500).send({ message: `Error al actualizar la palabra ${err}` });
        res.status(200).send(wordUpdated);        

    });
}

function deleteWord(req,res) {
     // primero busco que la palabra este
     let wordId = req.params.wordId;
     Word.findById(wordId, (err, word) => {
         if (err) return res.status(500).send({ message: `Error al borrar la palabra ${err}` });
         word.remove(err => {
             if (err) return res.status(500).send({ message: `Error al borrar la palabra ${err}` });
             res.status(200).send({message:' La palabra ha sido eliminada con exito'});
         });
     });
 
}
*/
