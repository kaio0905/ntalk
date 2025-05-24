var moongose = require('mongoose')
module.exports = function(app) {
    var Schema = moongose.Schema
    
    var contato = Schema({
        nome: String,
        email: String
    });
    var usuario = Schema({
        nome: {type: String, required: true},
        email: {type: String, required: true,
            index: {unique: true}},
            contatos: [contato]
    });
    return moongose.model('usuarios', usuario);
};