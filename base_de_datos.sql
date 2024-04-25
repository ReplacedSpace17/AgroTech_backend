CREATE DATABASE agrotechdb;

-- Crear la tabla "users"
CREATE TABLE users (
  uid VARCHAR PRIMARY KEY,
  email VARCHAR,
  password VARCHAR,
  activate BOOLEAN
);

-- Crear la tabla "personal_information"
CREATE TABLE personal_information (
  uid VARCHAR PRIMARY KEY,
  nombre VARCHAR,
  apellidop VARCHAR,
  apellidom VARCHAR,
  avatar VARCHAR,
  nacimiento DATE
);


--TABLA DE SENSORES
CREATE TABLE sensores(
  sid VARCHAR PRIMARY KEY,
  uid VARCHAR,
  nombre VARCHAR 
);

--TABLA DE Parcela
CREATE TABLE parcela(
  pid VARCHAR PRIMARY KEY,
  uid VARCHAR,
  etiqueta VARCHAR,
  instrucciones VARCHAR
);


--TABLA DE bombas
CREATE TABLE bombas(
  bid VARCHAR PRIMARY KEY, /*ID bomba*/
  pid VARCHAR /*ID PARCELA*/
);

--TABLA DE rutinas de riego
CREATE TABLE riego(
  rid VARCHAR PRIMARY KEY, /*ID riego*/
  bid VARCHAR, /*ID PARCELA*/
  activado int,
  desactivado int,
  ciclos int
);


--TABLA DE Monitoreo
CREATE TABLE monitoreo(
  mid VARCHAR PRIMARY KEY, /*ID MONITOREO*/
  sid VARCHAR, /*ID SENSOR*/
  pid VARCHAR, /*ID PARCELA*/
  valor float,
  fecha date,
  hora time
);


-- uid
--4820abc3-1b73-4506-9021-e0a61a58385c




