let pensadorModel = require("../models/pensadorModel");

// Devolve a lista de pensadores para o front-end.
function listar(req, res) {
    pensadorModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum pensador encontrado.");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os pensadores: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar
};
