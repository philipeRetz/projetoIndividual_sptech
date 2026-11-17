// Define o ambiente em que o site está rodando.
// 'producao' usa o .env e 'desenvolvimento' usa o .env.dev.
let ambiente_processo = 'desenvolvimento';

// Escolhe qual arquivo de variáveis de ambiente será carregado.
let caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

// Carrega as variáveis de ambiente antes de iniciar o servidor.
require("dotenv").config({ path: caminho_env });

let express = require("express");
let cors = require("cors");
let path = require("path");
let PORTA_APP = process.env.APP_PORT;
let HOST_APP = process.env.APP_HOST;

let app = express();

// Importa os arquivos de rotas do projeto.
let indexRouter = require("./src/routes/index");
let usuarioRouter = require("./src/routes/usuarios");
let pensadorRouter = require("./src/routes/pensadores");
let quizRouter = require("./src/routes/quiz");
let dashboardRouter = require("./src/routes/dashboard");

// Permite receber JSON e dados de formulário nas requisições.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Libera o acesso aos arquivos da pasta public (HTML, CSS, imagens...).
app.use(express.static(path.join(__dirname, "public")));

// Libera o acesso de outras origens para a API.
app.use(cors());

// Registra todas as rotas usadas pelo front-end.
app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/pensadores", pensadorRouter);
app.use("/quiz", quizRouter);
app.use("/dashboard", dashboardRouter);

// Sobe o servidor na porta definida no .env.dev.
app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######

    Servidor do site rodando em: http://${HOST_APP}:${PORTA_APP}
    Ambiente: ${process.env.AMBIENTE_PROCESSO}
    `);
});
