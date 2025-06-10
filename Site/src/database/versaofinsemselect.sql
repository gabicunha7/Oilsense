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
    status varchar(10) default 'Inativo',
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
    codigo char(7) unique not null,
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
            ('Corolla', 2021, 1),
			('Hilux', 2021, 1),
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
            ('Inativo'),
            ('Ativo'),
            ('Ativo'),
            ('Ativo'),
            ('Ativo'),
            ('Ativo'),
            ('Ativo'),
            ('Ativo'),
            ('Ativo');


insert into carro (fksensor, codigo, volumecarter, alturacarter, fkmodelo)
values		(1, 'ABC1D01', 4.500, 12.300, 100), 
			(2, 'XYZ2E02', 6.200, 13.500, 101), 
			(3, 'JKL3F03', 3.200, 11.700, 102),  
			(6, 'MNO4G04', 3.800, 12.000, 103),  
			(8, 'PQR5H05', 4.000, 11.900, 104),  
			(9, 'STU6I06', 4.200, 12.100, 105),  
			(10, 'VWX7J07', 4.500, 12.300, 100), 
			(11, 'YZA8K08', 3.200, 11.700, 100),
            (13, 'GYR65HU', 5.200, 14.700, 100),
            (14, 'KGU65VH', 4.100, 13.300, 101),
            (15, 'SCD560H', 3.600, 12.300, 101),
            (16, 'DCFE9G5', 2.900, 11.400, 100),
            (17, 'HWQG78V', 4.500, 13.700, 100),
            (18, 'KJR28HB', 3.100, 12.900, 101),
            (19, 'LYBR73J', 3.900, 15.200, 101),
            (20, 'BLRG930', 2.800, 11.900, 101); 


insert into telemetria(distancia, dtHoraColeta, fksensor)
values 
(4, '2025-06-03 10:50:10', 1),
(4, '2025-06-04 10:50:10', 1),
(4.5, '2025-06-05 10:50:10', 1),
(5, '2025-06-06 10:50:10', 1),
(6, '2025-06-07 10:50:10', 1),
(6, '2025-06-08 10:50:10', 1),
(7, '2025-06-09 10:50:10', 1),
(1, '2025-06-03 10:50:10', 10),
(1, '2025-06-04 10:50:10', 10),
(1.5, '2025-06-05 10:50:10', 10),
(3, '2025-06-06 10:50:10', 10),
(3, '2025-06-07 10:50:10', 10),
(4, '2025-06-08 10:50:10', 10),
(4, '2025-06-09 10:50:10', 10),
(4, '2025-06-10 10:50:10', 10),
(2, '2025-06-03 10:50:10', 2),
(2, '2025-06-04 10:50:10', 2),
(2, '2025-06-05 10:50:10', 2),
(3, '2025-06-06 10:50:10', 2),
(3, '2025-06-07 10:50:10', 2),
(3, '2025-06-08 10:50:10', 2),
(3, '2025-06-09 10:50:10', 2),
(1, '2025-06-03 10:50:10', 11),
(1, '2025-06-04 10:50:10', 11),
(1.5, '2025-06-05 10:50:10', 11),
(3, '2025-06-06 10:50:10', 11),
(3, '2025-06-07 10:50:10', 11),
(4, '2025-06-08 10:50:10', 11),
(4, '2025-06-09 10:50:10', 11),
(4, '2025-06-10 10:50:10', 11),
(3.4, '2025-06-03 10:50:10', 13),
(3.6, '2025-06-04 10:50:10', 13),
(4, '2025-06-05 10:50:10', 13),
(4.2, '2025-06-06 10:50:10', 13),
(5, '2025-06-07 10:50:10', 13),
(5, '2025-06-08 10:50:10', 13),
(5, '2025-06-09 10:50:10', 13),
(5.3, '2025-06-10 10:50:10', 13),
(2, '2025-06-03 10:50:10', 14),
(2.3, '2025-06-04 10:50:10', 14),
(2.4, '2025-06-05 10:50:10', 14),
(2.6, '2025-06-06 10:50:10', 14),
(3, '2025-06-07 10:50:10', 14),
(3.1, '2025-06-08 10:50:10', 14),
(3.2, '2025-06-09 10:50:10', 14),
(3.5, '2025-06-10 10:50:10', 14),
(5, '2025-06-03 10:50:10', 15),
(5, '2025-06-04 10:50:10', 15),
(5.5, '2025-06-05 10:50:10', 15),
(5.7, '2025-06-06 10:50:10', 15),
(6, '2025-06-07 10:50:10', 15),
(6.2, '2025-06-08 10:50:10', 15),
(6.4, '2025-06-09 10:50:10', 15),
(6.7, '2025-06-10 10:50:10', 15),
(4, '2025-06-03 10:50:10', 16),
(4.3, '2025-06-04 10:50:10', 16),
(4.5, '2025-06-05 10:50:10', 16),
(4.6, '2025-06-06 10:50:10', 16),
(5, '2025-06-07 10:50:10', 16),
(5.6, '2025-06-08 10:50:10', 16),
(6, '2025-06-09 10:50:10', 16),
(6.3, '2025-06-10 10:50:10', 16),
(1.2, '2025-06-03 10:50:10', 17),
(2.5, '2025-06-04 10:50:10', 17),
(3.5, '2025-06-05 10:50:10', 17),
(3.8, '2025-06-06 10:50:10', 17),
(4.2, '2025-06-07 10:50:10', 17),
(5, '2025-06-08 10:50:10', 17),
(6.2, '2025-06-09 10:50:10', 17),
(6.7, '2025-06-10 10:50:10', 17),
(1, '2025-06-03 10:50:10', 18),
(1, '2025-06-04 10:50:10', 18),
(1.2, '2025-06-05 10:50:10', 18),
(3, '2025-06-06 10:50:10', 18),
(3, '2025-06-07 10:50:10', 18),
(3, '2025-06-08 10:50:10', 18),
(4, '2025-06-09 10:50:10', 18),
(4.3, '2025-06-10 10:50:10', 18),
(1, '2025-06-03 10:50:10', 19),
(1.3, '2025-06-04 10:50:10', 19),
(1.5, '2025-06-05 10:50:10', 19),
(2, '2025-06-06 10:50:10', 19),
(2.3, '2025-06-07 10:50:10', 19),
(2.5, '2025-06-08 10:50:10', 19),
(2.5, '2025-06-09 10:50:10', 19),
(3, '2025-06-10 10:50:10', 19),
(4, '2025-06-03 10:50:10', 20),
(4.2, '2025-06-04 10:50:10', 20),
(4.5, '2025-06-05 10:50:10', 20),
(4.6, '2025-06-06 10:50:10', 20),
(5, '2025-06-07 10:50:10', 20),
(5.2, '2025-06-08 10:50:10', 20),
(5.4, '2025-06-09 10:50:10', 20),
(6, '2025-06-10 10:50:10', 20);


CREATE OR REPLACE VIEW vw_nivel_oleo
AS            
select 
                case when avg(((c.alturacarter - t.distancia) / c.alturacarter) * 100) > 70 then 'Nível 1 (Excesso de óleo)'
                when avg(((c.alturacarter - t.distancia) / c.alturacarter) * 100) < 60 then 'Nível 2 (Falta de óleo)'
                        when avg(((c.alturacarter - t.distancia) / c.alturacarter) * 100) < 50 then 'Nível 3 (Crítico de falta de óleo)'
                        else 'Sem Alerta' 
                end as 'nivel_oleo',
				date(t.dtHoraColeta) dtcoleta,
                m.id id_montadora
                from carro c
                inner join sensor s   
                        on c.fksensor = s.id
                inner join telemetria t
                        on t.fksensor = s.id
                inner join modelo mdl 
                        on c.fkmodelo = mdl.id
                inner join montadora m
                        on mdl.fkmontadora = m.id
                group by dtcoleta, c.codigo, m.id;
                

CREATE OR REPLACE VIEW vw_listar_alertas
AS      
select 
m.id, c.codigo cod,  concat(mdl.modelo,' ',mdl.ano) as modelo, mdl.id id_modelo,
case when avg(((c.alturacarter - t.distancia) / c.alturacarter) * 100) > 70 then 1
	 when avg(((c.alturacarter - t.distancia) / c.alturacarter) * 100) < 60 then 2
	 when avg(((c.alturacarter - t.distancia) / c.alturacarter) * 100) < 50 then 3
else 'Sem Alerta' 
end as nivel_oleo
from carro c
inner join sensor s   
    on c.fksensor = s.id
inner join telemetria t
	on t.fksensor = s.id
inner join modelo mdl 
    on c.fkmodelo = mdl.id
inner join montadora m
    on mdl.fkmontadora = m.id
where date(t.dtHoraColeta) = current_date()
group by c.codigo;
