let database = require("../database/config");

// Cada pergunta tem pesos diferentes para cada pensador.
// Quanto maior o peso, mais aquela resposta se parece com o pensador.
let perguntas = [
    {
        id: 1,
        texto: "Você acredita que as pessoas são naturalmente boas e que a sociedade é o que as corrompe?",
        pesos: {
            sim: { 6: 2, 5: 1, 7: 1 },
            nao: { 4: 2, 3: 1, 10: 1 }
        }
    },
    {
        id: 2,
        texto: "Para você, segurança e ordem valem mais do que a liberdade individual?",
        pesos: {
            sim: { 4: 2, 3: 1, 8: 1 },
            nao: { 5: 2, 6: 1, 9: 1 }
        }
    },
    {
        id: 3,
        texto: "A propriedade privada é um direito natural que o Estado deve proteger?",
        pesos: {
            sim: { 5: 2, 2: 1, 8: 1 },
            nao: { 7: 2, 6: 1, 1: 1 }
        }
    },
    {
        id: 4,
        texto: "O governante pode agir fora da moral tradicional para manter o poder?",
        pesos: {
            sim: { 3: 2, 8: 1, 4: 1 },
            nao: { 1: 2, 2: 1, 9: 1 }
        }
    },
    {
        id: 5,
        texto: "A luta de classes é o motor da história?",
        pesos: {
            sim: { 7: 2, 10: 1, 6: 1 },
            nao: { 2: 1, 8: 2, 5: 1 }
        }
    },
    {
        id: 6,
        texto: "O Estado deve intervir na economia para reduzir as desigualdades?",
        pesos: {
            sim: { 7: 2, 6: 1, 9: 1 },
            nao: { 5: 2, 8: 1, 3: 1 }
        }
    },
    {
        id: 7,
        texto: "A verdadeira política acontece no espaço público e na ação coletiva?",
        pesos: {
            sim: { 9: 2, 2: 1, 6: 1 },
            nao: { 4: 1, 3: 1, 10: 1 }
        }
    },
    {
        id: 8,
        texto: "O poder está presente em todas as relações cotidianas, inclusive nas instituições?",
        pesos: {
            sim: { 10: 2, 7: 1, 9: 1 },
            nao: { 4: 1, 8: 2, 1: 1 }
        }
    },
    {
        id: 9,
        texto: "A democracia precisa de um povo soberano que participe diretamente das decisões?",
        pesos: {
            sim: { 6: 2, 9: 1, 7: 1 },
            nao: { 4: 1, 3: 2, 1: 1 }
        }
    },
    {
        id: 10,
        texto: "O Estado deve ter o monopólio legítimo do uso da força?",
        pesos: {
            sim: { 8: 2, 4: 1, 3: 1 },
            nao: { 10: 2, 9: 1, 6: 1 }
        }
    },
    {
        id: 11,
        texto: "A melhor forma de governo é aquela conduzida por quem conhece a verdade e a justiça?",
        pesos: {
            sim: { 1: 2, 2: 1, 8: 1 },
            nao: { 3: 1, 10: 2, 7: 1 }
        }
    },
    {
        id: 12,
        texto: "A virtude e o bem comum devem guiar as decisões políticas?",
        pesos: {
            sim: { 2: 2, 1: 1, 9: 1 },
            nao: { 3: 2, 10: 1, 4: 1 }
        }
    }
];

// Monta a lista que vai para o front-end, sem os pesos.
function listarPerguntas() {
    let lista = [];

    for (let i = 0; i < perguntas.length; i++) {
        lista.push({
            id: perguntas[i].id,
            texto: perguntas[i].texto
        });
    }

    return lista;
}

// Soma o maior peso que o pensador poderia receber em cada pergunta.
// Serve para descobrir a pontuação máxima possível dele.
function maximoPossivel(idPensador) {
    let maximo = 0;

    for (let i = 0; i < perguntas.length; i++) {
        let pesos = perguntas[i].pesos;
        let sim = pesos.sim[idPensador] || 0;
        let nao = pesos.nao[idPensador] || 0;
        let maior = sim;

        // Usa o maior peso entre "sim" e "não" naquela pergunta.
        if (nao > maior) {
            maior = nao;
        }

        if (maior > 0) {
            maximo += maior;
        }
    }

    return maximo;
}

// Calcula qual pensador mais combina com as respostas do usuário.
function calcularResultado(respostas) {
    // Só calcula se todas as perguntas foram respondidas.
    if (respostas == undefined || respostas.length != perguntas.length) {
        return null;
    }

    let pontuacoes = {};
    let desempate = {};
    let perguntasRespondidas = {};

    // Comeca a pontuacao de todos os pensadores em zero.
    for (let id = 1; id <= 10; id++) {
        pontuacoes[id] = 0;
        desempate[id] = 0;
    }

    // Soma os pesos de cada resposta escolhida.
    for (let i = 0; i < respostas.length; i++) {
        let resposta = respostas[i];
        let idPergunta = Number(resposta.idPergunta);
        let valor = String(resposta.resposta || "").toLowerCase();

        // Confere se a resposta é válida e se a pergunta não foi repetida.
        if (!idPergunta || (valor !== "sim" && valor !== "nao") || perguntasRespondidas[idPergunta]) {
            return null;
        }

        // Procura a pergunta pelo id.
        let pergunta = null;
        for (let j = 0; j < perguntas.length; j++) {
            if (perguntas[j].id === idPergunta) {
                pergunta = perguntas[j];
                break;
            }
        }

        if (!pergunta) {
            return null;
        }

        perguntasRespondidas[idPergunta] = true;
        let pesos = pergunta.pesos[valor];

        // Soma os pontos para cada pensador.
        for (let idPensador in pesos) {
            pontuacoes[idPensador] += pesos[idPensador];
            desempate[idPensador] += pesos[idPensador] * (i + 1);
        }
    }

    // O maior pontuador vence. Em caso de empate, vale a ordem das respostas.
    let idVencedor = 1;

    for (let id = 2; id <= 10; id++) {
        let venceu = pontuacoes[id] > pontuacoes[idVencedor];
        let empatou = pontuacoes[id] === pontuacoes[idVencedor];

        if (venceu || (empatou && desempate[id] > desempate[idVencedor])) {
            idVencedor = id;
        }
    }

    // Calcula a similaridade em relacao ao maximo que o pensador poderia fazer.
    let maximo = maximoPossivel(idVencedor);
    let similaridade = 0;

    if (maximo > 0) {
        similaridade = Math.round((pontuacoes[idVencedor] / maximo) * 100);
    }

    // Garante que o percentual fique entre 0 e 100.
    if (similaridade > 100) {
        similaridade = 100;
    } else if (similaridade < 0) {
        similaridade = 0;
    }

    return {
        idPensador: idVencedor,
        pontuacao: pontuacoes[idVencedor],
        similaridade: similaridade
    };
}

// Salva o resultado do usuário. Se ele já respondeu, atualiza.
function salvarResultado(idUsuario, idPensador, similaridade) {
    return buscarResultado(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            let instrucaoUpdate = `
                UPDATE resultado_quiz
                SET fk_pensador = ${Number(idPensador)}, similaridade = ${Number(similaridade)}
                WHERE fk_usuario = ${Number(idUsuario)};
            `;
            console.log("Executando a instrucao SQL: \n" + instrucaoUpdate);
            return database.executar(instrucaoUpdate);
        }

        let instrucaoInsert = `
            INSERT INTO resultado_quiz (fk_usuario, fk_pensador, similaridade)
            VALUES (${Number(idUsuario)}, ${Number(idPensador)}, ${Number(similaridade)});
        `;
        console.log("Executando a instrucao SQL: \n" + instrucaoInsert);
        return database.executar(instrucaoInsert);
    });
}

// Busca o resultado já salvo de um usuário.
function buscarResultado(idUsuario) {
    let instrucaoSql = `
        SELECT
            r.id_resultado AS idResultado,
            r.fk_usuario AS idUsuario,
            r.fk_pensador AS idPensador,
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
    listarPerguntas,
    calcularResultado,
    salvarResultado,
    buscarResultado
};
