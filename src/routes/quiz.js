let express = require("express");
let router = express.Router();

let quizController = require("../controllers/quizController");

// Devolve as perguntas do quiz.
router.get("/perguntas", function (req, res) {
    quizController.listarPerguntas(req, res);
});

// Recebe as respostas e calcula o resultado.
router.post("/responder", function (req, res) {
    quizController.responder(req, res);
});

// Busca o resultado já salvo de um usuário.
router.get("/resultado/:idUsuario", function (req, res) {
    quizController.buscarResultado(req, res);
});

module.exports = router;
