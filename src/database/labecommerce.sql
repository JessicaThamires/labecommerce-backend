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


