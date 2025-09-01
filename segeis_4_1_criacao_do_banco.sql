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