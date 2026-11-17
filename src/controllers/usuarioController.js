let usuarioModel = require("../models/usuarioModel");

// Confere se o email tem arroba, ponto depois do arroba e nenhum espaco.
function emailValido(email) {
    email = String(email);

    let posicaoArroba = email.indexOf("@");
    let outroArroba = email.indexOf("@", posicaoArroba + 1);
    let posicaoPonto = email.indexOf(".", posicaoArroba + 1);

    if (posicaoArroba < 1 || outroArroba != -1) {
        return false;
    }

    if (posicaoPonto < posicaoArroba + 2 || posicaoPonto >= email.length - 1) {
        return false;
    }

    if (email.indexOf(" ") != -1) {
        return false;
    }

    return true;
}

// Verifica o email e a senha e devolve os dados do usuario logado.
function autenticar(req, res) {
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;

    if (email == undefined || email == "") {
        res.status(400).send("Seu email esta undefined!");
    } else if (senha == undefined || senha == "") {
        res.status(400).send("Sua senha esta indefinida!");
    } else {
        // Procura um usuario com esse email e senha no banco.
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log("Resultados encontrados: " + resultadoAutenticar.length);

                if (resultadoAutenticar.length == 1) {
                    res.json({
                        id: resultadoAutenticar[0].id,
                        nome: resultadoAutenticar[0].nome,
                        email: resultadoAutenticar[0].email
                    });
                } else {
                    res.status(403).send("Email e/ou senha invalido(s)");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// Valida os campos e cadastra um novo usuario.
function cadastrar(req, res) {
    let nome = req.body.nomeServer;
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;

    if (nome == undefined || nome.trim() == "") {
        res.status(400).send("Seu nome esta undefined!");
    } else if (email == undefined || email.trim() == "") {
        res.status(400).send("Seu email esta undefined!");
    } else if (senha == undefined || senha == "") {
        res.status(400).send("Sua senha esta indefinida!");
    } else if (!emailValido(email)) {
        res.status(400).send("Informe um e-mail valido.");
    } else if (senha.length < 6) {
        res.status(400).send("A senha deve ter pelo menos 6 caracteres.");
    } else {
        // Antes de cadastrar, confere se o email já existe.
        usuarioModel.buscarPorEmail(email)
            .then(function (usuarioExistente) {
                if (usuarioExistente.length > 0) {
                    // Mensagem em texto simples para o front exibir no alert.
                    res.status(401).send("Este e-mail ja esta cadastrado.");
                } else {
                    usuarioModel.cadastrar(nome.trim(), email.trim(), senha)
                        .then(function (resultado) {
                            res.status(201).json({
                                mensagem: "Usuario cadastrado com sucesso.",
                                id: resultado.insertId
                            });
                        })
                        .catch(function (erro) {
                            console.log(erro);
                            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                            res.status(500).json(erro.sqlMessage);
                        });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao verificar o e-mail! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar
};
