require('dotenv').config();
const mysql = require('mysql2/promise');
const colors = require('colors');
const inquirer = require('inquirer');
let connection;
let products;
let order;

async function connectToDB() {
  try {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.USERNAME,
      password: process.env.PASS,
      database: process.env.DB
    });
    console.log(colors.bgGreen.white.bold('Connected to DB!'));
  } catch (error) {
    console.log(colors.bgRed.white.bold(error));
  }
}


async function showAllProducts() {
  const query = 'SELECT * FROM bamazon.products';
  //query db
  let res = await connection.execute(query);
  //store results in array
  products = res[0];
  //todo install and use npm ascii to show some ascii art for the store name and final price
  console.table(products);
}

async function promptUser() {
  //first ask id of product they want to buy
  let productSelected = await inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Select a product to buy?',
      name: 'product',
      choices: products
    }
  ]);

  //then ask how many user wants to buy
  let productQuantity = await inquirer.prompt([
    {
      type: 'number',
      message: `How many ${productSelected.product[0]}'s would you like?`,
      name: 'quantity'
    }
  ]);
  
  let productName = productSelected.product[0];
  let quantity = productQuantity.quantity;
  
  //place the order
  let product_id = await getProductID(productName);
  placeOrder(product_id, productName, quantity);
}

function getProductID(selectedProductName) {
  return new Promise(function (resolve, reject) {
    for(var i = 0; i < products.length; i++) {
      if( products[i].name === selectedProductName ) {
        resolve(products[i].item_id);
        break;
      } else if (i === products.length - 1) {
        reject(Error('No Matches'));
        connection.end();
      }
    }
  });
}

async function placeOrder(id, productName, quantity) {
  order = new Order(id, productName, quantity);
  //receive id and quantity
  //check if there is enough stock for user order
  let hasStock = await stockCheck(order, quantity);
  //if there is enough stock fullfill order
  //if not reject order
  if(hasStock) {
    order.fullfillOrder();
  } else {
    order.rejectOrder();
  }
}

async function stockCheck(product, quantity) {
  // check if there is enough stock
  const query = `SELECT * FROM products WHERE item_id = "${product.id}"`;
  let [rows, fields] = await connection.execute(query);
  let availableStock = rows[0].stock_quantity;

  if( availableStock >= quantity) {
    return true;
  } else {
    return false;
  }
}

function Order(id, name, quantity) {
  this.id = id;
  this.item_name = name;
  this.quantity = quantity;
  
  this.rejectOrder = function () {
    //todo have this show how much stock is left on product
    console.log(colors.bgRed.white.bold(`Sorry, there is not enough stock to complete your order. Please try again with less quantity. There are only X left!`));
    connection.end();
  };

  this.fullfillOrder = async function () {
    //decrease quantity on item
    const query = `UPDATE products SET stock_quantity = stock_quantity - ${this.quantity} WHERE item_id = ${this.id}`;
    try {
      let res = await connection.execute(query);
      //show final cost to customer
      if(res[0].serverStatus === 2) {
        this.showPrice();
        connection.end();
      }
    } catch(error) {
      console.log(colors.bgRed.white.bold(error));
      connection.end();
    }
  };

  this.showPrice = async function() {
    const query = `SELECT price FROM products WHERE item_id = ${this.id}`;
    let [rows, fields] = await connection.execute(query);
    let totalPrice = rows[0].price * this.quantity;
  
    console.log(colors.bgGreen.white.bold('Order total : $', totalPrice));
  }
};

(async function () {
  try {
    await connectToDB();
    // while (connection != undefined) {
      await showAllProducts(); 
      await promptUser();        
    // }
  } catch (error) {
    console.log(colors.bgRed.white.bold(error));
  }
})();