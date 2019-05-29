// var mysql = require("mysql");
// var inquirer = require("inquirer");

// var connection = mysql.createConnection({
//   host: "localhost",

//   // Your port; if not 3306
//   port: 3309,

//   // Your username
//   user: "root",

//   // Your password
//   password: "docker",
//   database: "amazonDB"
// });

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("error connecting.. " + connection.threadId);
//   loadProducts();
// });

// function loadProducts() {
//   connection.query("SELECT * FROM products"), function(err, res) {
//     if (err) throw (err);
//       console.table(res);
//       promptCustomerForItem (res);
//   }

// }

// function promptCustomerForItem (inventory) {
//   inquirer 
//     .prompt (
//       [
//         {Type: 'input',
//         Name: 'item',
//         message: "What is the ID?",
//         validate: function(val) {
//           return !isNaN(val) || val.toLowerCase() === "q";
//         }
//       }
//     ])
//     .then(function(val) {
//       checkIfShouldExit(val.choice);
//       var choiceId = parseInt(val.choice);
//       var product = checkInventory(choiceId, inventory);

//       if(product) {
//         promptCustomerForQuantity(product);
//       }
//       else {
//         console.log("\nThat item is not in the inventory.");
//         loadProducts();
//       }
//       });
//     }

//   function promptCustomerForQuantity(product) {
//     inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "quantity",
//         message: "How many do you want?",
//         validate: function(val) {
//           return val >  0 || val.toLowerCase() === "q";
//         }
//       }
//     ])
//   .then(function(val) {
//     checkIfShouldExit(val.quantity);
//     var quantity = parseInt(val.quantity);

//     if (quantity > product.stock_quan) {
//       console.log("\nInsufficient");
//       loadProducts();
//     }
//     else {
//       makePurchase(product, quantity);
//     }
//   });
//   }

//   function makePurchase(product, quantity) {
//     connection.query (
//       "update products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
//       [quantity, prodcut.item_id],
//       function(err, res) {
//         console.log("\nPurchase successful " + quantity + " " + product.product_name + "'s!");
//         loadProducts();
//       }
//     );
//   }

//   function checkInventory(chocieId, inventory) {
//     for (var i = 0; i < inventory.length; i++) {
//       if (inventory[i].item_id === choiceId) {
//         return inventory[i];
//       }
//     }
//     return null;
//   }

//   function checkIfShouldExit(choice) {
//     if (choice.toLowerCase() === "q") {
//       console.log("Bye");
//       process.exit(0);
//     }
//   }


  // Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3309,

  // Your username
  user: "root",

  // Your password
  password: "docker",
  database: "bamazon"
});

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

// Function to load the products table from the database and print results to the console
function loadProducts() {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // Draw the table in the terminal using the response
    console.table(res);1

    // Then prompt the customer for their choice of product, pass all the products to promptCustomerForItem
    promptCustomerForItem(res);
  });
}

// Prompt the customer for a product ID
function promptCustomerForItem(inventory) {
  // Prompts user for what they would like to purchase
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would you like to purchase? [Quit with Q]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      // Check if the user wants to quit the program
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      // If there is a product with the id the user chose, prompt the customer for a desired quantity
      if (product) {
        // Pass the chosen product to promptCustomerForQuantity
        promptCustomerForQuantity(product);
      }
      else {
        // Otherwise let them know the item is not in the inventory, re-run loadProducts
        console.log("\nThat item is not in the inventory.");
        loadProducts();
      }
    });
}

// Prompt the customer for a product quantity
function promptCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      // Check if the user wants to quit the program
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);

      // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        loadProducts();
      }
      else {
        // Otherwise run makePurchase, give it the product information and desired quantity to purchase
        makePurchase(product, quantity);
      }
    });
}

// Purchase the desired quantity of the desired item
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      // Let the user know the purchase was successful, re-run loadProducts
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadProducts();
    }
  );
}

// Check to see if the product the user chose exists in the inventory
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}

// Check to see if the user wants to quit the program
function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    // Log a message and exit the current node process
    console.log("Goodbye!");
    process.exit(0);
  }
}
    
