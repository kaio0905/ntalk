module.exports = function (app) {
  var autenticar = require("./../middleware/autenticador"),
    contatos = app.controllers.contatos;

  app.get("/contatos", contatos.index);
  app.get("/contato/:id", contatos.show);
  app.post("/contato", contatos.create);
  app.get("/contato/:id/editar", contatos.edit);
  app.put("/contato/:id", contatos.update);
  app.del("/contato/:id", contatos.destroy);
};
