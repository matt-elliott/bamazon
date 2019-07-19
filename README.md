# BAMAZON
A CLI to order from a mock store.

## THE PROBLEM
User needs to be able to select a product and place an order from store through CLI.

## THE BUILD
Using Node.js with NPM packages mysql2 and inquirer to connect to a database and present products table to user and allow them to select a product. If the product has available stock to fulfill the order the user is notified their order is being processed. Otherwise, if there is not enough stock the program suggests buying a few less.

## USAGE
To start the user interface:
```
node bamazonCustomer.js
```
Then just follow the prompts until the end.
