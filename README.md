# semana_4_1
Sistema para gerenciamento de eventos e ingressos para o senac


1 módulo-Banco de dados: Aqui criamos toda a estrutura da nossa base de dados seguindo a documentação de requisitos, regras de negócio e boas práticas. Damos uma atenção especial aos relacionamentos da tabela "usuario" que possui duas relações diretas com ingresso (a de vendas e a de validação) e um autorelacionamento(um usuário cadastra outro usuário).

-- -----------------------------------------------------
-- Schema segeis_4_1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS segeis_4_1 DEFAULT CHARACTER SET utf8 ;
USE segeis_4_1 ;

-- -----------------------------------------------------
-- Table perfil
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS perfil (
  id_perfil INT NOT NULL,
  titulo VARCHAR(15) NOT NULL,
  PRIMARY KEY (id_perfil))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table usuario
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nome_completo VARCHAR(100) NOT NULL,
  email VARCHAR(45) NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  senha VARCHAR(64) NOT NULL,
  criador_id_usuario INT NULL,
  perfil_id_perfil INT NOT NULL,
  PRIMARY KEY (id_usuario),
  UNIQUE INDEX cpf_UNIQUE (cpf ASC) ,
  UNIQUE INDEX email_UNIQUE (email ASC) ,
  INDEX fk_usuario_perfil_idx (perfil_id_perfil ASC) ,
  INDEX fk_usuario_usuario1_idx (criador_id_usuario ASC) ,
  CONSTRAINT fk_usuario_perfil
    FOREIGN KEY (perfil_id_perfil)
    REFERENCES perfil (id_perfil)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_usuario_usuario1
    FOREIGN KEY (criador_id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE SET NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table evento
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS evento (
  id_evento INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(35) NOT NULL,
  dt_inicio DATE NOT NULL,
  dt_termino DATE NOT NULL,
  localizacao VARCHAR(45) NOT NULL,
  capacidade_total INT NOT NULL,
  capacidade_atual INT NOT NULL,
  criador_id_usuario INT NULL,
  PRIMARY KEY (id_evento),
  UNIQUE INDEX titulo_UNIQUE (titulo ASC) ,
  INDEX fk_evento_usuario1_idx (criador_id_usuario ASC) ,
  CONSTRAINT fk_evento_usuario1
    FOREIGN KEY (criador_id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table setor
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS setor (
  id_setor INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(20) NOT NULL,
  capacidade_total INT NOT NULL,
  capacidade_atual INT NOT NULL,
  evento_id_evento INT NOT NULL,
  PRIMARY KEY (id_setor),
  INDEX fk_setor_evento1_idx (evento_id_evento ASC) ,
  CONSTRAINT fk_setor_evento1
    FOREIGN KEY (evento_id_evento)
    REFERENCES evento (id_evento)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table ingresso
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ingresso (
  id_ingresso INT NOT NULL AUTO_INCREMENT,
  codigo VARCHAR(6) NOT NULL,
  nome_completo VARCHAR(100) NOT NULL,
  email VARCHAR(45) NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  situacao ENUM('ativo', 'utilizado', 'cancelado') NOT NULL DEFAULT 'ativo',
  validador_id_usuario INT NULL,
  criador_id_usuario INT NULL,
  setor_id_setor INT NOT NULL,
  PRIMARY KEY (id_ingresso),
  UNIQUE INDEX codigo_UNIQUE (codigo ASC) ,
  INDEX fk_ingresso_setor1_idx (setor_id_setor ASC) ,
  INDEX fk_ingresso_usuario1_idx (criador_id_usuario ASC) ,
  INDEX fk_ingresso_usuario2_idx (validador_id_usuario ASC) ,
  CONSTRAINT fk_ingresso_setor1
    FOREIGN KEY (setor_id_setor)
    REFERENCES setor (id_setor)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_ingresso_usuario1
    FOREIGN KEY (criador_id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
  CONSTRAINT fk_ingresso_usuario2
    FOREIGN KEY (validador_id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Schema segeis_4_1
-- -----------------------------------------------------
USE segeis_4_1 ;

-- -----------------------------------------------------
-- Table perfil
-- -----------------------------------------------------

INSERT INTO segeis_4_1.perfil
(id_perfil,
titulo)
VALUES
(1, 'administrador'),
(2, 'vendedor'),
(3, 'validador');

-- -----------------------------------------------------
-- Table usuario
-- -----------------------------------------------------

INSERT INTO segeis_4_1.usuario
(id_usuario,
nome_completo,
email,
cpf,
senha,
criador_id_usuario,
perfil_id_perfil)
VALUES
(1, 'ricardo evangelista dos santos', 'ricardo@gmail.com', '90129304601', md5('123456'), 1, 1),
(2, 'thais pereira dos santos', 'thais@gmail.com', '90128494601', md5('123456'), 1, 2),
(3, 'lucas alves dos anjos', 'lucas@gmail.com', '01929304601', md5('123456'), 1, 3),
(4, 'daiane da silva e silva', 'daiane@gmail.com', '90129308931', md5('123456'), 1, 1),
(5, 'larissa rocha dos oliveira', 'larissa@gmail.com', '90893304601', md5('123456'), 1, 2);

-- -----------------------------------------------------
-- Table evento
-- -----------------------------------------------------

INSERT INTO segeis_4_1.evento
(id_evento,
titulo,
dt_inicio,
dt_termino,
localizacao,
capacidade_total,
capacidade_atual,
criador_id_usuario)
VALUES
(1, 'o grande show', '2025-09-22', '2025-09-29', 'brasília', 5000, 5000, 1);

-- -----------------------------------------------------
-- Table setor
-- -----------------------------------------------------

INSERT INTO segeis_4_1.setor
(id_setor,
titulo,
capacidade_total,
capacidade_atual,
evento_id_evento)
VALUES
(1, 'vip', 200, 200, 1),
(2, 'imprensa', 250, 250, 1),
(3, 'comunidade', 4550, 4550, 1);


-- -----------------------------------------------------
-- Table ingresso
-- -----------------------------------------------------

INSERT INTO segeis_4_1.ingresso
(id_ingresso,
codigo,
nome_completo,
email,
cpf,
situacao,
validador_id_usuario,
criador_id_usuario,
setor_id_setor)
VALUES
(1, 'a5c8b2', 'amanda alves de souza', 'amanda@gmail.com', '98374627192', 'ativo', NULL, 1, 1),
(2, 'a5c8c4', 'julia alves de souza', 'julia@gmail.com', '87276227192', 'ativo', NULL, 1, 2),
(3, 'a0k8b2', 'marcos julio costa', 'marcos@gmail.com', '98264627192', 'ativo', NULL, 1, 3),
(4, 'v2c8b2', 'erick mendonça silva', 'mendonça@gmail.com', '09174627091', 'ativo', NULL, 1, 1),
(5, 'n2c8x4', 'paulo augusto figueredo', 'paulo@gmail.com', '90274628712', 'ativo', NULL, 1, 2);




