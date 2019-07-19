CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR NOT NULL,
  department_name VARCHAR NOT NULL,
  price DECIMAL NOT NULL,
  stock_quantity DECIMAL NOT NULL
);

INSERT INTO products(
  product_name,
  department_name,
  price,
  stock_quantity)
VALUES(
  'Back To The Future Box Set: Directors Cut',
  'movies',
  12.99,
  12
),
VALUES(
  'The Breakfast Club',
  'movies',
  9.99,
  12
),
VALUES(
  'Reebok Pumps',
  'shoes',
  130,
  2
),
VALUES(
  'Skip It',
  'toys',
  5.99,
  5
),
VALUES(
  'Mint Atari Gaming Console',
  'tos',
  599.99,
  1
),
VALUES(
  'Signed Copy of Prince : Purple Rain',
  'music',
  999.99,
  1
),
VALUES(
  'The Talking Heads : Remain In Light',
  'music',
  15.99,
  500
),
VALUES(
  'Michael Jackson : Thriller',
  'music',
  18.99,
  1200
),
VALUES(
  'The Pixies : Doolittle',
  'music',
  16.75,
  8
),
VALUES(
  'Cabbage Patch Kids : Collectors Edition',
  'toys',
  10000,5,
  56
);

SELECT * FROM products;