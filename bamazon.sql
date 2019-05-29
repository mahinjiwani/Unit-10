DROP DATABASE IF EXISTS amazonDB;

CREATE DATABASE amazonDB;

USE amazonDB;

CREATE TABLE products (
	item_id VARCHAR(30) NOT NULL,
    product_name VARCHAR(30) NOT NULL,	
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(10),
    stock_quantity INTEGER(10)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("SP3060", "Sephia Headphones", "Electronics", "10.95", "15");

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("SYNCHKG091438", "Clorax Wipes", "HOME", 13.95, 15);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("YJ30", "Women's Top", "Fashion", 15.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("X0110051US", "Men's Watch", "Accessories", 23.96, 3);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("B07DCNBHZY_US", "Women's Bracelet", "Accessories", 5.99, 8);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("49980A", "Espresso Machine", "Home", 36.99, 5);

SELECT * FROM products






