module.exports = function (app) {
  var banco = app.models.usuario
  var ContatoController = {
    index: function (req, res) {
      var id = req.session.usuario._id;
      console.log(id)
      banco.findById(id).then(function(usuario) {
        console.log(usuario)
        var contatos = usuario.contatos;
        var resultado = {contatos: contatos};
        res.render('contatos/index', resultado); 
      });
      /* var usuario = req.session.usuario,
        contatos = usuario.contatos,
        params = { usuario: usuario, contatos: contatos };
      res.render("contatos/index", params); */
    },

    create: function (req, res) {
      var _id = req.session.usuario._id;
      banco.findById(_id).then(function(erro, usuario) {
        var contato = req.body.contato;
        var contatos = usuario.contatos;
        contatos.push(contato);
        usuario.save(function() {
          res.redirect('/contatos')
        });
      });
      /* var contato = req.body.contato,
        usuario = req.session.usuario;
      usuario.contatos.push(contato);
      res.redirect("/contatos"); */
    },

    show: function (req, res) {
      var _id = req.session.usuario._id;
      banco.findById(_id).then(function(erro, usuario) {
        var contatoID = req.params.id
        var contato = usuario.contatos.id(contatoID);
        var resultado = {contato: contato};
        res.render('contatos/show', resultado);
      });
      /* var id = req.params.id,
        contato = req.session.usuario.contatos[id],
        params = { contato: contato, id: id };
      res.render('contatos/show', params); */
    },

    edit: function (req, res) {
      var _id = req.session.usuario._id;
      banco.findById(_id).then(function(req, usuario) {
        var contatoID = req.params.id;
        var contato = usuario.contatos.id(contatoID);
        var resultado = {contato: contato};
        res.render('contatos/edit', resultado)
      });
      /* var id = req.params.id,
        usuario = req.session.usuario,
        contato = usuario.contatos[id],
        params = { usuario: usuario, contato: contato, id: id };
      res.render("contatos/edit", params); */
    },

    update: function (req, res) {
      var _id = req.session.usuario._id;
      banco.findById(_id).then(function(erro, usuario) {
        var contatoID = req.params.id;
        var contato = usuario.contatos.id(contatoID);
        contato.nome = req.body.contato.nome;
        contato.email = req.body.contato.email;
        usuario.save(function() {
          res.redirect('/contatos');
        });
      });
      /* var contato = req.body.contato,
        usuario = req.session.usuario;
      usuario.contatos[req.params.id] = contato;
      res.redirect("/contatos"); */
    },
    destroy: function (req, res) {
      var _id = req.session.usuario._id;
      banco.findById(_id).then(function(erro, usuario) {
        var contatoID = req.params.id;
        usuario.contatos.id(contatoID).remove();
        usuario.save(function() {
          res.redirect('/contatos');
        });
      });
      /* var usuario = req.session.usuario,
        id = req.params.id;
      usuario.contatos.splice(id, 1);
      res.redirect("/contatos"); */
    },
  };
  return ContatoController;
};
