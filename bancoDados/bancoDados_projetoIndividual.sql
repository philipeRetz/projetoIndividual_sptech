CREATE DATABASE projeto;
USE projeto;

CREATE TABLE usuario(
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
email VARCHAR(45) UNIQUE NOT NULL,
senha VARCHAR(45) UNIQUE NOT NULL
);

CREATE TABLE pensador(
id_pensador INT PRIMARY KEY AUTO_INCREMENT,
nomePensador VARCHAR(45),
fk_usuario INT, 
CONSTRAINT fk_pedido_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);
