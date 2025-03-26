-- CRIAÇÃO DA BASE DADOS DO NOSSO PROJETO --
CREATE DATABASE projetoPi;

use projetoPi;

create table montadora(
	id int primary key auto_increment,
    nomeMontadora varchar(70) not null,
    cnpj char(18) unique not null,
    emailMontadora varchar(50) unique not null,
    token varchar(255) unique not null
);

create table funcionario(
	id int primary key auto_increment,
    nomeFuncionario varchar(50) not null,
    emailFuncionario varchar(60) unique,
    senha varchar(50),
    imagem varchar(100) default(null),
    fkmontadora int,
    constraint fk_montadoraFuncionario foreign key(fkmontadora) references montadora(id)
);

create table carro(
	id int primary key auto_increment,
    modelo varchar(100) not null,
    ano varchar(9),
    placa varchar(15) unique,
    fksensor int,
    fkmontadora int,
    constraint fk_montadoraCarro foreign key(fkmontadora) references montadora(id),
    unique key ix_fkSensor(fksensor)
);

create table sensor(
	id int primary key auto_increment,
    statusSensor varchar(11),
    fkcarro int,
    constraint fk_carroSensor foreign key(fkcarro) references carro(id),
    constraint uq_carroSensor unique(id, fkcarro)
);

create table telemetria(
	id int primary key auto_increment,
    volumeLitros decimal(5,2) default(null),
    dataHoraColeta datetime,
    alerta varchar(25) default('Falha Sensor'),
	fksensor int not null,
    constraint fk_sensorTelemetria foreign key(fksensor) references sensor(id)	
);

drop database projetoPi;