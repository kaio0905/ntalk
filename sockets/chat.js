module.exports = function (io) {
  var crypto = require("crypto"),
    sockets = io.sockets;
console.log("chat")
  sockets.on("connection", function (client) {
    var session = client.request.session,
      usuario = session.usuario;
    client.data.email = usuario.email;

    sockets.sockets.forEach(function (onlineSocket) {
      client.emit("notify-onlines", onlineSocket.data.email);
      client.broadcast.emit("notify-onlines", onlineSocket.data.email);
    });

    client.on("send-server", function (msg) {
      console.log(msg)
      var mensagem = "<b>" + usuario.nome + ":</b> " + msg + "<br>";
      var sala = client.data.sala;
      var data = { email: usuario.email, sala: sala };
      client.broadcast.emit("new-message", data);
      sockets.in(sala).emit("send-client", mensagem);
    });

    client.on("join", function (sala) {
      if (sala) {
        sala = sala.replace("?", "");
      } else {
        var timestamp = new Date().toString();
        var md5 = crypto.createHash("md5");
        sala = md5.update(timestamp).digest("hex");
      }
      client.data.sala = sala;
      client.join(sala);
    });

    client.on("disconnect", function () {
      var sala = client.data.sala;
      var msg = "<b>" + usuario.nome + ":</b> saiu.<br>";
      client.broadcast.emit("notify-offline", usuario.email);
      sockets.in(sala).emit("send-client", msg);
      client.leave(sala);
    });
  });
};
