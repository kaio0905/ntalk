const secret = "ntalk";
const key = "ntalk";

var express = require("express"),
  app = express(),
load = require("express-load"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  cookie = cookieParser(secret),
  expressSection = require("express-session"),
  store = new expressSection.MemoryStore(),
  error = require("./middleware/error"),
  server = require("http").createServer(app),
  methodOverride = require("method-override"),
  io = require("socket.io")(server),
  mongoose = require("mongoose");
  //routes = require('./routes/home');

  global.db = mongoose.connect('mongodb://localhost/Ntalk')
  mongoose.connection.on('erro', (erro)=>{
    console.loh(erro)
  })
  mongoose.Promise = global.Promise;


app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(cookie);
app.use(
  expressSection({
    secret: secret,
    name: key,
    resave: true,
    saveUninitialized: true,
    store: store,
  })
);
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
//app.use(app.router);

//app.get('/', routes.index);
//app.get('/usuarios', routes.user.index);

io.use("authorization", function (data, accept) {
  cookie(data, {}, function (err) {
    var sessionID = data.signedCookies[KEY];
    store.get(sessionID, function (err, session) {
      if (err || !session) {
        accept(null, false);
      } else {
        data.session = session;
        accept(null, true);
      }
    });
  });
});

load("models").then("controllers").then("routes").into(app);
load("sockets").into(io);

app.use(error.notFound);
app.use(error.serverError);

server.listen(3000, function () {
  console.log("Ntalk no ar.");
});
