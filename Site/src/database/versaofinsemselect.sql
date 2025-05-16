-- CRIAÇÃO DA BASE DADOS DO NOSSO PROJETO --
create database Oilsense;
use Oilsense;

create table montadora(
	id int primary key auto_increment,
    nome varchar(70) not null,
    cnpj char(14) unique not null,
    email varchar(50) unique not null,
    senha varchar(70) not null,
    dtcadastro date,
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
);


create table carro(
    fksensor int primary key,
    placa char(7) unique not null,
	volumecarter decimal(6,3) not null,
    alturacarter decimal(6,3) not null,
    fkmodelo int not null,
    constraint fk_modeloCarro foreign key(fkmodelo) references modelo(id),
    constraint fk_sensorCarro foreign key(fksensor) references sensor(id)
);


create table telemetria(
	id int primary key auto_increment,
    distancia decimal(6,3) not null,
    dtHoraColeta datetime not null,
	fksensor int not null,
    constraint fk_sensorTelemetria foreign key(fksensor) references sensor(id)	
);


insert into montadora(nome, cnpj, email, senha, status, dtcadastro)
values  	('Toyota', '59104760000191', 'toyota@gmail.com', 'ToyotaSenha', 'Ativo', '2023-03-15'),
			('Volkswagen', '59104422000150', 'volkswagen@gmail.com', 'VolkswagenSenha', 'Inativo', '2025-03-10'),
			('Hyundai', '10394422000142', 'hyundai@gmail.com', 'HyundaiSenha', 'Ativo', '2020-08-20'),
            ('Honda', '01192333000394', 'honda@gmail.com', 'HondaSenha', 'Ativo', '2024-05-25');
            
            
insert into funcionario (nome, sobrenome, email, senha, fkmontadora)
values		('Lucas', 'Silva', 'lucas.silva@toyota.com', 'senha1', 1),
			('Mariana', 'Costa', 'mariana.costa@toyota.com', 'senha2', 1),
			('Carlos', 'Souza', 'carlos.souza@hyundai.com', 'senha3', 3),
			('Fernanda', 'Oliveira', 'fernanda.oliveira@hyundai.com', 'senha4', 3),
			('André', 'Pereira', 'andre.pereira@honda.com', 'senha5', 4),
			('Beatriz', 'Martins', 'beatriz.martins@honda.com', 'senha6', 4),
			('João', 'Lima', 'joao.lima@honda.com', 'senha7', 4);
            
            
insert into modelo (modelo, ano, fkmontadora)
values		('Corolla', 2022, 1),
			('Hilux', 2023, 1),
			('HB20', 2023, 3),
			('Creta', 2024, 3),
			('Civic', 2022, 4),
			('HR-V', 2023, 4);
            
            
insert into sensor (status)
values 		('Ativo'),
			('Ativo'),
            ('Ativo'),
            ('Inativo'),
            ('Manutenção'),
            ('Ativo'),
            ('Manutenção'),
            ('Ativo'),
            ('Ativo'),
            ('Ativo'),
			('Ativo'),
            ('Inativo');
            
            
insert into carro (fksensor, placa, volumecarter, alturacarter, fkmodelo)
values		(1, 'ABC1D01', 4.500, 12.300, 100), 
			(2, 'XYZ2E02', 6.200, 13.500, 101), 
			(3, 'JKL3F03', 3.200, 11.700, 102),  
			(6, 'MNO4G04', 3.800, 12.000, 103),  
			(8, 'PQR5H05', 4.000, 11.900, 104),  
			(9, 'STU6I06', 4.200, 12.100, 105),  
			(10, 'VWX7J07', 4.500, 12.300, 100), 
			(11, 'YZA8K08', 3.200, 11.700, 102); 
            
