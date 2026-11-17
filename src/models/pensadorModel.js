let database = require("../database/config");

// Busca todos os pensadores cadastrados no banco.
function listar() {
    let instrucaoSql = `
        SELECT id_pensador AS id, nome, espectro, descricao
        FROM pensador
        ORDER BY id_pensador;
    `;
    console.log("Executando a instrucao SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar
};
