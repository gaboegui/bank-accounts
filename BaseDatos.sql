-- Create Persona table
CREATE TABLE IF NOT EXISTS persona (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    genero VARCHAR(20),
    edad INT,
    identificacion VARCHAR(20) UNIQUE NOT NULL,
    direccion VARCHAR(200),
    telefono VARCHAR(20)
);

-- Create Cliente table (inherits from Persona via JOINED strategy concept)
CREATE TABLE IF NOT EXISTS cliente (
    id INT PRIMARY KEY REFERENCES persona(id),
    cliente_id VARCHAR(50) UNIQUE NOT NULL, -- "Contraseña" in requirements listed separately, but usually unique ID is different. Req: "Cliente debe tener una clave única"
    contrasena VARCHAR(100) NOT NULL,
    estado BOOLEAN NOT NULL
);

-- Create Cuenta table
CREATE TABLE IF NOT EXISTS cuenta (
    id SERIAL PRIMARY KEY,
    numero_cuenta VARCHAR(20) UNIQUE NOT NULL,
    tipo_cuenta VARCHAR(20) NOT NULL,
    saldo_inicial DECIMAL(15, 2) NOT NULL,
    estado BOOLEAN NOT NULL,
    cliente_id INT NOT NULL REFERENCES cliente(id)
);

-- Create Movimientos table
CREATE TABLE IF NOT EXISTS movimientos (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    tipo_movimiento VARCHAR(50) NOT NULL,
    valor DECIMAL(15, 2) NOT NULL,
    saldo DECIMAL(15, 2) NOT NULL,
    cuenta_id INT NOT NULL REFERENCES cuenta(id)
);

-- Sample Data from Casos de Uso (Requerimientos.md)

-- 1. Usuarios
INSERT INTO persona (id, nombre, genero, identificacion, direccion, telefono, edad) VALUES (1, 'Jose Lema', 'Masculino', '1234567890', 'Otavalo sn y principal', '098254785', 30);
INSERT INTO persona (id, nombre, genero, identificacion, direccion, telefono, edad) VALUES (2, 'Marianela Montalvo', 'Femenino', '1234567891', 'Amazonas y NNUU', '097548965', 25);
INSERT INTO persona (id, nombre, genero, identificacion, direccion, telefono, edad) VALUES (3, 'Juan Osorio', 'Masculino', '1234567892', '13 junio y Equinoccial', '098874587', 35);

INSERT INTO cliente (id, cliente_id, contrasena, estado) VALUES (1, 'jlema', '1234', true);
INSERT INTO cliente (id, cliente_id, contrasena, estado) VALUES (2, 'mmontalvo', '5678', true);
INSERT INTO cliente (id, cliente_id, contrasena, estado) VALUES (3, 'josorio', '1245', true);

-- 2 & 3. Cuentas
INSERT INTO cuenta (id, numero_cuenta, tipo_cuenta, saldo_inicial, estado, cliente_id) VALUES (1, '478758', 'Ahorro', 2000, true, 1);
INSERT INTO cuenta (id, numero_cuenta, tipo_cuenta, saldo_inicial, estado, cliente_id) VALUES (2, '225487', 'Corriente', 100, true, 2);
INSERT INTO cuenta (id, numero_cuenta, tipo_cuenta, saldo_inicial, estado, cliente_id) VALUES (3, '495878', 'Ahorros', 0, true, 3);
INSERT INTO cuenta (id, numero_cuenta, tipo_cuenta, saldo_inicial, estado, cliente_id) VALUES (4, '496825', 'Ahorros', 540, true, 2);
INSERT INTO cuenta (id, numero_cuenta, tipo_cuenta, saldo_inicial, estado, cliente_id) VALUES (5, '585545', 'Corriente', 1000, true, 1);

-- 4. Movimientos
-- 478758 | Retiro de 575 (Saldo final: 1425)
INSERT INTO movimientos (fecha, tipo_movimiento, valor, saldo, cuenta_id) VALUES ('2022-02-10 10:00:00', 'Retiro', -575, 1425, 1);
-- 225487 | Depósito de 600 (Saldo final: 700)
INSERT INTO movimientos (fecha, tipo_movimiento, valor, saldo, cuenta_id) VALUES ('2022-02-10 11:00:00', 'Deposito', 600, 700, 2);
-- 495878 | Depósito de 150 (Saldo final: 150)
INSERT INTO movimientos (fecha, tipo_movimiento, valor, saldo, cuenta_id) VALUES ('2022-02-10 12:00:00', 'Deposito', 150, 150, 3);
-- 496825 | Retiro de 540 (Saldo final: 0)
INSERT INTO movimientos (fecha, tipo_movimiento, valor, saldo, cuenta_id) VALUES ('2022-02-08 13:00:00', 'Retiro', -540, 0, 4);

-- Reset sequences to match manually inserted IDs
SELECT setval('persona_id_seq', (SELECT MAX(id) FROM persona));
SELECT setval('cuenta_id_seq', (SELECT MAX(id) FROM cuenta));
SELECT setval('movimientos_id_seq', (SELECT MAX(id) FROM movimientos));
