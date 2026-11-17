let dashboardModel = require("../models/dashboardModel");

// Calcula o percentual de cada pensador na distribuicao.
function montarDistribuicao(itens, totalRespostas) {
    let distribuicao = [];

    for (let i = 0; i < itens.length; i++) {
        let item = itens[i];
        let quantidade = Number(item.quantidade);
        let percentual = 0;

        // Evita divisão por zero quando ninguém respondeu o quiz ainda.
        if (totalRespostas > 0) {
            percentual = Math.round((quantidade / totalRespostas) * 100);
        }

        distribuicao.push({
            idPensador: item.idPensador,
            pensador: item.pensador,
            quantidade: quantidade,
            percentual: percentual
        });
    }

    return distribuicao;
}

// Monta o resultado do usuario ou null quando ele ainda nao respondeu.
function montarUsuario(resultadoUsuario) {
    if (resultadoUsuario.length == 0) {
        return null;
    }

    return {
        pensador: resultadoUsuario[0].pensador,
        descricao: resultadoUsuario[0].descricao,
        similaridade: Number(resultadoUsuario[0].similaridade)
    };
}

// Busca todos os dados usados na dashboard.
function buscarDados(req, res) {
    let idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O id do usuario esta undefined!");
        return;
    }

    // Cada consulta usa o resultado da anterior para montar a resposta.
    dashboardModel.contarUsuarios()
        .then(function (resultadoUsuarios) {
            let totalUsuarios = Number(resultadoUsuarios[0].total);

            return dashboardModel.contarRespostas()
                .then(function (resultadoRespostas) {
                    let totalRespostas = Number(resultadoRespostas[0].total);

                    return dashboardModel.buscarDistribuicao()
                        .then(function (resultadoDistribuicao) {
                            let distribuicao = montarDistribuicao(resultadoDistribuicao, totalRespostas);

                            return dashboardModel.buscarResultadoUsuario(idUsuario)
                                .then(function (resultadoUsuario) {
                                    res.status(200).json({
                                        totalUsuarios: totalUsuarios,
                                        totalRespostas: totalRespostas,
                                        distribuicao: distribuicao,
                                        usuario: montarUsuario(resultadoUsuario)
                                    });
                                });
                        });
                });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dados da dashboard: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarDados
};
