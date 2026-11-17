let mysql = require("mysql2");

// CONEXAO DO BANCO MYSQL SERVER
// Essas informações vêm do arquivo .env (produção) ou .env.dev (desenvolvimento).
let mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

// Abre uma conexão, executa a instrução SQL e fecha a conexão.
function executar(instrucao) {

    // Confere se o ambiente foi configurado corretamente.
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (producao OU desenvolvimento) NAO FOI DEFINIDO EM .env OU .env.dev OU app.js\n");
        return Promise.reject("AMBIENTE NAO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        let conexao = mysql.createConnection(mySqlConfig);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

module.exports = {
    executar
};
