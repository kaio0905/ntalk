module.exports = function (app) {
    var banco = app.models.usuario
    var HomeController = {
        index: function (req, res) {
            res.render('home/index')
        },
        login: function (req, res) {
            var req_usuario = {
                email: req.body.email,
                nome: req.body.nome
            }
            var query = { email: req_usuario.email };
            banco.findOne(query)
                .select('_id email')
                .then(function (usuario) {
                    if (usuario) {
                        req.session.usuario = usuario;
                        res.redirect('/contatos');
                    } else {
                        banco.create(req_usuario).then(function (new_usuario) {
                            req.session.usuario = new_usuario;
                            res.redirect('/contatos')
                            if (!new_usuario) {
                                res.redirect('/');
                                console.log(erro)
                            }
                        });
                    }
                })
        },
        /*var email = req.body.email
        , nome = req.body.nome
        ,   usuario = req.body;
        if (email && nome) {
            //var usuario = req.bodyusuario;
            usuario ['contatos'] = [];
            req.session.usuario = usuario;
            res.redirect('/contatos');
        } else {
            res.redirect('/')
        }
    },*/
        logout: function (req, res) {
            req.session.destroy();
            res.redirect('/');
        }
    };
    return HomeController;
};