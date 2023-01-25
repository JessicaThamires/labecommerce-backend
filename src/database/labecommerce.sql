-- Active: 1674603881553@@127.0.0.1@3306

CREATE TABLE users(  
    id TEXT  PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
("u001","ana@gmail.com", "ana001"),
("u002","bianca@gmail.com", "bianca002"),
("u003","carolin@gmail.com", "carolina003");

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
("p001", "Lavagem simples", 40, "Limpeza"),
("p002","Lavagem cera", 50, "Limpeza"),
("p003", "Cristalização", 350, "Estética"),
("p004", "Higienização", 400, "Limpeza"),
("p005", "Polimento", 300, "Estética");

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products
WHERE name like 'Polimento';

INSERT INTO users (id, email, password)
VALUES
("u004","Daniela@gmail.com", "daniela004");

INSERT INTO products (id, name, price, category)
VALUES
("p006", "Limpeza ar condicionado", 200, "Limpeza");

SELECT * FROM products
WHERE id like 'p006';

SELECT * FROM users
WHERE id like 'u004';

DELETE FROM users
WHERE id = 'u004';

DELETE FROM products
WHERE id = 'p006';

UPDATE products
SET
name = 'Lavagem completa'
WHERE id = 'p002';

UPDATE users
SET
email = 'bruno@gmail.com',
password = 'bruno002'
WHERE id = 'u002';

SELECT * FROM users
ORDER BY email DESC;

SELECT * FROM products
ORDER BY price ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 20 offset 0;


SELECT * FROM products
WHERE price >= 30 and price <= 300
ORDER BY price ASC;

CREATE TABLE purchases(
id TEXT PRIMARY KEY UNIQUE NOT NULL,
total_price REAL NOT NULL,
paid INTEGER NOT NULL,
delivered_at TEXT,
buyer_id TEXT NOT NULL,
FOREIGN KEY (buyer_id) REFERENCES users(id)
);


SELECT * FROM purchases;



INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
('p001', 150, 0, DATETIME('now'), 'u003'),
('p002', 205, 0, DATETIME('now'), 'u003'),
('p003', 300, 0, DATETIME('now'), 'u002'),
('p004', 105, 0, DATETIME('now'), 'u002');

DROP TABLE purchases;

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = 'p001';

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = 'u003'


