CREATE DATABASE dentista_db;
USE dentista_db;

CREATE TABLE paciente (
    id int not null auto_increment,
    nome varchar(300),
    cpf varchar(300),
    data_nascimento date,
    sexo varchar(300),
    email varchar(300),
    endereco varchar(300),
    celular varchar(300),
    PRIMARY KEY(id)
);

CREATE TABLE dentista (
    id int not null auto_increment,
    cpf varchar(300),
    rg varchar(300),
    nome varchar(300),
    numero_registro varchar(300),
    especialidade varchar(300),
    celular varchar(300),
    PRIMARY KEY(id)
);

CREATE TABLE agenda (
    id int not null auto_increment,
    tipo varchar(300),
    hora varchar(300),
    data varchar(300),
    dentista_id int not null,
    paciente_id int not null,
    PRIMARY KEY(id),
    FOREIGN KEY(dentista_id) REFERENCES dentista (id),
    FOREIGN KEY(paciente_id) REFERENCES paciente (id)
);

CREATE TABLE procedimento (
    id int not null auto_increment,
    nome varchar(300),
    materiais varchar(300),
    valor decimal(12, 2),
    PRIMARY KEY(id)
);

CREATE TABLE consulta (
    id int not null auto_increment,
    data date,
    valor_total decimal(12, 2),
    agenda_id int not null,
    dentista_id int not null,
    paciente_id int not null,
    PRIMARY KEY(id),
    FOREIGN KEY(agenda_id) REFERENCES agenda (id),
    FOREIGN KEY(dentista_id) REFERENCES dentista (id),
    FOREIGN KEY(paciente_id) REFERENCES paciente (id)
);

CREATE TABLE consulta_procedimento (
    id int not null auto_increment,
    consulta_id int not null,
    procedimento_id int not null,
    dente int,
    quantidade int,
    valor decimal(12, 2),
    PRIMARY KEY(id),
    FOREIGN KEY(consulta_id) REFERENCES consulta (id),
    FOREIGN KEY(procedimento_id) REFERENCES procedimento (id)
);

CREATE TABLE recebimento (
    id int not null auto_increment,
    data date not null,
    forma_recebimento varchar(300),
    status int default 0,
    valor_total decimal(12, 2),
    consulta_id int not null,
    PRIMARY KEY(id),
    FOREIGN KEY(consulta_id) REFERENCES consulta (id)
);