use universo_lector;

create table libro (
ISBN integer primary key,
titulo varchar(20),
fechaLanzamiento date, 
fechaEdicion date,
estado varchar (20)
);
create table socios (
DNI integer primary key,
direccion varchar(20),
nombre varchar(20),
apellido varchar(20),
telefono integer
);
create table editorial(
idEditorial integer primary key auto_increment,
razonSocial varchar(40),
telefono integer,
nombre varchar(20)
);
create table autor (
 idAutor integer primary key auto_increment,
 nombre varchar (20)
);
create table prestamo (
 idPrestamo integer primary key auto_increment,
 fechaRetiro date,
 fechaTope date,
 fechaReal date
);
create table LibroXAutor (
idLibroXAutor integer primary key auto_increment,
ISBN integer,
idAutor integer,
foreign key (ISBN) references libro (ISBN),
foreign key (idAutor) references autor (idAutor)
);
create table EditorialXLibro (
idEditorialXLibro integer primary key auto_increment,
idEditorial integer,
ISBN integer,
foreign key (ISBN) references libro (ISBN),
foreign key (idEditorial) references editorial (idEditorial)
);
create table PrestamoXSocioXLibro (
idPrestamoXSocioXLibro integer primary key auto_increment,
idPrestamo integer,
DNI integer,
ISBN integer,
foreign key (idPrestamo) references prestamo (idPrestamo),
foreign key (DNI) references socios (DNI),
foreign key (ISBN) references libro (ISBN)
);

ALTER TABLE socios
MODIFY telefono VARCHAR(15);

INSERT INTO socios (DNI, direccion, nombre, apellido, telefono)
VALUES
(123456789, 'Dorrego 123', 'Juan', 'Pérez', 5551234567),
(45539094, 'Luis Agote 2676', 'Estanislao', 'Lopez', 2236021535),
(30147948, 'Av Trabajadores 4578', 'Ricardo', 'Jerez', 223654871),
(28451751, 'Licenciadismo 1023', 'Veronica', 'Tritonita', 223457891),
(30654472, 'Forster 1012', 'Rosk', 'Velasco', 223654879);

DELETE FROM socios
WHERE DNI = 30147948;
/*Por que me dejo actualizar la direccion de un socio que anteriormente elimine?*/
UPDATE socios
SET direccion = 'Acha 860'
WHERE DNI = 28451751;
