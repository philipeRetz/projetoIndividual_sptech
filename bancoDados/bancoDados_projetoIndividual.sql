CREATE DATABASE IF NOT EXISTS projeto;
USE projeto;

DROP TABLE IF EXISTS resultado_quiz;
DROP TABLE IF EXISTS pensador;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE pensador (
    id_pensador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL UNIQUE,
    espectro VARCHAR(30),
    descricao VARCHAR(500)
);

CREATE TABLE resultado_quiz (
    id_resultado INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL UNIQUE,
    fk_pensador INT NOT NULL,
    similaridade INT NOT NULL,
    CONSTRAINT fk_resultado_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_resultado_pensador FOREIGN KEY (fk_pensador) REFERENCES pensador(id_pensador)
);

INSERT INTO pensador (id_pensador, nome, espectro, descricao) VALUES
(1, 'Platão', 'Idealista', 'Filósofo grego, discípulo de Sócrates e mestre de Aristóteles. Fundou a Academia de Atenas e defendeu uma sociedade ideal governada por filósofos-reis.'),
(2, 'Aristóteles', 'Virtuoso', 'Filósofo grego, discípulo de Platão. Escreveu sobre lógica, ética, política e biologia, defendendo que o ser humano é um animal político e que a virtude e o bem comum devem orientar a vida em sociedade.'),
(3, 'Nicolau Maquiavel', 'Realista', 'Filósofo e político italiano, autor de O Príncipe. Separa a política da moral e da religião e analisa o poder como ele é, e não como deveria ser.'),
(4, 'Thomas Hobbes', 'Absolutista', 'Filósofo inglês, autor de Leviatã. Defende que o ser humano é naturalmente egoísta e que o contrato social troca liberdade por segurança e ordem.'),
(5, 'John Locke', 'Liberal', 'Filósofo inglês, autor de Dois Tratados sobre o Governo. Defende o governo limitado e os direitos naturais à vida, à liberdade e à propriedade.'),
(6, 'Jean-Jacques Rousseau', 'Soberania popular', 'Filósofo suíço, autor de O Contrato Social. Defende que o homem nasce bom, mas a sociedade o corrompe, e que o povo é soberano por meio da vontade geral.'),
(7, 'Karl Marx', 'Socialista', 'Filósofo e economista alemão, autor de O Capital e do Manifesto Comunista. Analisa a luta de classes e propõe a superação do capitalismo.'),
(8, 'Max Weber', 'Institucionalista', 'Sociólogo e economista alemão. Define o Estado como detentor do monopólio do uso legítimo da força e analisa a política como disputa pelo poder.'),
(9, 'Hannah Arendt', 'Republicana', 'Filósofa política alemã, autora de Origens do Totalitarismo e A Condição Humana. Valoriza o espaço público, a ação coletiva e a participação cidadã.'),
(10, 'Michel Foucault', 'Pós-estruturalista', 'Filósofo francês, autor de Vigiar e Punir. Analisa as relações de poder, as instituições disciplinares e os mecanismos de controle social.');
