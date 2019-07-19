CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  department_name VARCHAR(250) NOT NULL,
  price DECIMAL(10,4) NOT NULL,
  stock_quantity INT(10) NOT NULL
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
(
  'The Breakfast Club',
  'movies',
  9.99,
  12
),
(
  'Reebok Pumps',
  'shoes',
  130,
  2
),
(
  'Skip It',
  'toys',
  5.99,
  5
),
(
  'Mint Atari Gaming Console',
  'tos',
  599.99,
  1
),
(
  'Signed Copy of Prince : Purple Rain',
  'music',
  999.99,
  1
),
(
  'The Talking Heads : Remain In Light',
  'music',
  15.99,
  500
),
(
  'Michael Jackson : Thriller',
  'music',
  18.99,
  1200
),
(
  'The Pixies : Doolittle',
  'music',
  16.75,
  8
),
(
  'Cabbage Patch Kids : Collectors Edition',
  'toys',
  1000.5,
  56
);

SELECT * FROM products;