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
      database: 'bamazon'
    });
    console.log(colors.bgGreen.white.bold('Connected to DB!'));
  } catch (error) {
    console.log(colors.bgRed.white.bold(error));
  }
}


// TODO : first display all products in table
async function showAllProducts() {
  const query = 'SELECT * FROM bamazon.products';
  //query db
  let res = await connection.execute(query);
  //store results in array
  products = res[0];
  // console.table(products);
}

async function promptUser() {
  let availableProducts = [];
  
  products.forEach(function (product) {
    availableProducts.push(` ${product.item_id}  ${product.product_name}`);
  });

  //first ask id of product they want to buy
  let productSelected = await inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Select a product to buy?',
      name: 'product',
      choices: availableProducts
    }
  ]);
  

  //then ask how many user wants to buy
  let productQuantity = await inquirer.prompt([
    {
      type: 'number',
      message: `How many ${productSelected} would you like?`,
      name: 'quantity'
    }
  ]);
  
  let product = productSelected.product[0];
  let quantity = productQuantity.quantity;

  makeOrder(product, quantity);
  placeOrder();
  //call place order
}

function makeOrder(product, quantity) {
  let id = product.trim().split(' ')[0];
  let name = product.trim().slice(1);
  
  order = Order(id, name, quantity);
  console.log(order);
}

function placeOrder() {
  //receive id and quantity
  //check if there is enough stock for user order
  //if there is enough stock fullfill order
  //if not reject order
}

function stockCheck() {
  //check if there is enough stock
}

function Order(id, name, quantity) {
  this.item_id = id;
  this.item_name = name;
  this.quantity = quantity;
  
  this.rejectOrder = function () {
    //tell customer the reason and end the process
  };

  this.fullfillOrder = function () {
    //decrease quantity on item
    //show final cost to customer
  }
};

(async function () {
  try {
    await connectToDB();
    await showAllProducts(); 
    await promptUser();
  } catch (error) {
    console.log(colors.bgRed.white.bold(error));
  }
})();