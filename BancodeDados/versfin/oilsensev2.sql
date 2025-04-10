-- CRIAÇÃO DA BASE DADOS DO NOSSO PROJETO --
create database Oilsense;
use Oilsense;

create table montadora(
	id int primary key auto_increment,
    nome varchar(70) not null,
    cnpj char(18) unique not null,
    email varchar(50) unique not null,
    token varchar(60) unique not null,
    status varchar(10),
    constraint chk_status check (status in ('Ativo', 'Inativo', 'Manutenção'))
);

create table funcionario(
	id int primary key auto_increment,
    nome varchar(40) not null,
    sobrenome varchar(60) not null,
    email varchar(60) unique not null,
    senha varchar(50) not null,
    fkmontadora int not null,
    constraint fk_montadoraFuncionario foreign key(fkmontadora) references montadora(id)
)auto_increment = 100;

create table modelo(
		id int primary key auto_increment,
	    modelo varchar(100) not null,
		ano year not null,
        fkmontadora int not null,
		constraint fk_montadoraModelo foreign key(fkmontadora) references montadora(id)
)auto_increment = 100;

create table sensor(
	id int primary key auto_increment,
    status varchar(10),
	nome varchar(10) default 'HC-SR04',
    tipo varchar(12) default 'Ultrassônico',
    constraint chk_statusValido check (status in ('Ativo', 'Inativo', 'Manutenção'))
)auto_increment = 100;

create table carro(
    placa char(7) unique not null,
	volume decimal(6,3) not null,
    alturacarter decimal(6,3) not null,
    fkmodelo int not null,
    fksensor int not null unique,
    constraint fk_modeloCarro foreign key(fkmodelo) references modelo(id),
    constraint fk_sensorCarro foreign key(fksensor) references sensor(id),
    constraint pk_carro primary key (fksensor)
)auto_increment = 100;

create table telemetria(
	id int primary key auto_increment,
    alturaoleo decimal(6,3) not null,
    dtColeta datetime not null,
	fksensor int not null,
    constraint fk_sensorTelemetria foreign key(fksensor) references sensor(id)	
);

drop database oilsense;


