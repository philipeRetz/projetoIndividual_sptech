let quizModel = require("../models/quizModel");

// Devolve as perguntas do quiz para o front-end.
function listarPerguntas(req, res) {
    res.status(200).json(quizModel.listarPerguntas());
}

// Calcula a pontuacao, salva o resultado e devolve o pensador encontrado.
function responder(req, res) {
    let idUsuario = req.body.idUsuario;
    let respostas = req.body.respostas;
    let perguntas = quizModel.listarPerguntas();

    if (idUsuario == undefined) {
        res.status(400).send("O id do usuario esta undefined!");
        return;
    }

    if (respostas == undefined || respostas.length == undefined) {
        res.status(400).send("As respostas estao em formato invalido.");
        return;
    }

    // O quiz só é válido se todas as perguntas foram respondidas.
    if (respostas.length != perguntas.length) {
        res.status(400).send("Responda todas as perguntas do quiz.");
        return;
    }

    let resultado = quizModel.calcularResultado(respostas);

    if (resultado == null) {
        res.status(400).send("Respostas invalidas. Revise o quiz e tente novamente.");
        return;
    }

    // Salva o resultado e, depois, busca ele pronto no banco.
    quizModel.salvarResultado(idUsuario, resultado.idPensador, resultado.similaridade)
        .then(function () {
            return quizModel.buscarResultado(idUsuario);
        })
        .then(function (resultadoSalvo) {
            res.status(200).json({
                idPensador: resultadoSalvo[0].idPensador,
                pensador: resultadoSalvo[0].pensador,
                descricao: resultadoSalvo[0].descricao,
                similaridade: resultadoSalvo[0].similaridade,
                pontuacao: resultado.pontuacao
            });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao responder o quiz: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// Busca o resultado ja salvo do usuario.
function buscarResultado(req, res) {
    let idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O id do usuario esta undefined!");
        return;
    }

    quizModel.buscarResultado(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum resultado encontrado.");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o resultado: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarPerguntas,
    responder,
    buscarResultado
};
