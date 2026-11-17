let database = require("../database/config");

// Busca um usuario pelo email e pela senha.
// Se encontrar alguém, o login é válido.
function autenticar(email, senha) {
    let instrucaoSql = `
        SELECT id_usuario AS id, nome, email
        FROM usuario
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrucao SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Verifica se o email já está cadastrado.
// Usado para impedir duas contas com o mesmo email.
function buscarPorEmail(email) {
    let instrucaoSql = `
        SELECT id_usuario AS id, nome, email
        FROM usuario
        WHERE email = '${email}';
    `;
    console.log("Executando a instrucao SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Cadastra um novo usuario no banco.
function cadastrar(nome, email, senha) {
    let instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
        VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrucao SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    buscarPorEmail,
    cadastrar
};
