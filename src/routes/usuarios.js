let express = require("express");
let router = express.Router();

// Importa o controller responsável pelas regras de usuário.
let usuarioController = require("../controllers/usuarioController");

// Rota para criar uma nova conta.
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

// Rota para entrar no site.
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;
