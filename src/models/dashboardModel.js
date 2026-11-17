let database = require("../database/config");

// Conta os usuarios cadastrados no site.
function contarUsuarios() {
    let instrucaoSql = "SELECT COUNT(*) AS total FROM usuario;";
    console.log("Executando a instrucao SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Conta quantos resultados de quiz ja foram salvos.
function contarRespostas() {
    let instrucaoSql = "SELECT COUNT(*) AS total FROM resultado_quiz;";
    console.log("Executando a instrucao SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Busca quantas pessoas se identificaram com cada pensador.
// O LEFT JOIN garante que pensadores sem resultado também apareçam.
function buscarDistribuicao() {
    let instrucaoSql = `
        SELECT
            p.id_pensador AS idPensador,
            p.nome AS pensador,
            COUNT(r.id_resultado) AS quantidade
        FROM pensador p
        LEFT JOIN resultado_quiz r
            ON r.fk_pensador = p.id_pensador
        GROUP BY p.id_pensador, p.nome
        ORDER BY p.id_pensador;
    `;
    console.log("Executando a instrucao SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Busca o resultado do usuario que esta vendo o dashboard.
function buscarResultadoUsuario(idUsuario) {
    let instrucaoSql = `
        SELECT
            r.similaridade,
            p.nome AS pensador,
            p.descricao
        FROM resultado_quiz r
        INNER JOIN pensador p
            ON r.fk_pensador = p.id_pensador
        WHERE r.fk_usuario = ${Number(idUsuario)};
    `;
    console.log("Executando a instrucao SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    contarUsuarios,
    contarRespostas,
    buscarDistribuicao,
    buscarResultadoUsuario
};
