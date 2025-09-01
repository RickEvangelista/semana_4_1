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



