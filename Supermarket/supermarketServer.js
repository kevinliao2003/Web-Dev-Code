/* REQUIRED MODULES */
const http = require('http');
const express = require("express"); /* Accessing express module */
const ejs = require("ejs");
const fs = require("fs");
const bodyParser = require("body-parser"); /* To handle post parameters */

/* PORT NUMBER & STATUS CODE */
const portNumber = 5000;
const statusCode = 200;

/* CREATES AN INSTANCE OF EXPRESS */
const app = express(); /* app is a request handler function */
const server = http.createServer(app);
console.log(`Web server is running at http://localhost:${portNumber}`);

/* Initializes request.body with post information */ 
app.use(bodyParser.urlencoded({extended:false}));

/* EXPRESS SET UP */
app.set("view engine", "ejs"); //sets as the view engine
app.use(express.urlencoded({ extended: true }));

/* COMMAND LINE ARGUMENTS */
const args = process.argv.slice(2);

/* Displays the message "Usage supermarketServer.js jsonFile" 
when an incorrect number of command line arguments are provided. */
if (args.length !== 1) {
  console.error('Usage: supermarketServer.js jsonFile');
  process.exit(1);
}

/* Defines the class. */
/* Reads command line argumetns and parses the given file. */
class Supermarket {
    #args
    constructor(args) {
        this.#args = args;
    }
  
    parse() {
        return JSON.parse(fs.readFileSync(this.#args[0], 'utf8'));
    }
}

const supermarket = new Supermarket(args)
/* Loads items data from the provided JSON file. */
const itemsData = supermarket.parse();

const prompt = "Type itemsList or stop to shutdown the server: "
process.stdout.write(prompt); //prompt
process.stdin.on("readable", function () {
    let dataInput = (process.stdin.read()).toString();
    if (dataInput !== null) {
        let command = dataInput.trim();

        if (command === "stop") {
            /* The server will stop when "stop" is entered. */
            process.stdout.write("Shutting down the server\n");
            process.exit(0);
        } else if (command === "itemsList") {
            /* The items in the JSON file loaded are displayed when "itemsList" is entered. */
            console.log(itemsData); //dispalays items from the JSON file
        } else {
            console.log(`Invalid command: ${dataInput}`);
        }
    }

    process.stdout.write(prompt);
    process.stdin.resume(); //resumes the process
});

/* EXPRESS */

/* This endpoint renders the main page of the application 
and it will display the contents of the index.ejs template file. */
app.get("/", (request, response) => {
    const template = fs.readFileSync('templates/index.ejs', 'utf8');
    const rendered = ejs.render(template);
    response.send(rendered);
});

/* This endpoint displays the displayItems.ejs template with the table of items available. */
app.get("/catalog", (request, response) => {
    const template = fs.readFileSync('templates/displayItems.ejs', 'utf8');
    
    /* Create HTML code and pass it into {} for writeHead. */
    let ans = "<table style='border: 0.075rem solid black;'>";
    ans += "<thead><tr><th style='border: 0.075rem solid black;'>Item</th><th style='border: 0.075rem solid black;'>Cost</th></tr></thead>";
    itemsData.itemsList.forEach((key) => {
        ans += `<tr><td style='border: 0.075rem solid black;'>${key.name}</td><td style='border: 0.075rem solid black;'>${key.cost}</td></tr>`;
    });
    ans += "</table>";

    const rendered = ejs.render(template, { itemsTable: ans });
    response.send(rendered);
});

/* This endpoint displays the placeOrder.ejs template with the table of items available. */
app.get("/order", (request, response) => {
    const template = fs.readFileSync('templates/placeOrder.ejs', 'utf8');

    /* Create HTML code for the select label. */
    let ans = "";
    itemsData.itemsList.forEach((key) => {
        /* MUST HAVE "" FOR TWO WORDS TO BE TAPED TOGETHER */
        ans += `<option value="${key.name}">"${key.name}"</option>`;
    });

    const rendered = ejs.render(template, { items: ans });
    response.send(rendered);
});

/* 
- This endpoint will process the submission of the placeOrder form, 
retrieving the order values and processing the order.
- Processing an order requires displaying the orderConfirmation.ejs template with a table that includes the items to be purchased, 
along with their cost. 
- The last table row has the sum of all the items in the order. */
app.post("/order", (request, response) => {
    /* Extracts variables from request query */
    let {name, email, delivery, itemsSelected} = request.body; //MUST MATCH THE HTML NAMES

    /* Builds table for itemsSelected and passes that into orderTable. */
    let ans = "<table style='border: 0.075rem solid black;'>";
    ans += "<thead><tr><th style='border: 0.075rem solid black;'>Item</th><th style='border: 0.075rem solid black;'>Cost</th></tr></thead>";
    let totalCost = 0; //total cost
    itemsSelected.forEach((item) =>  {
        /* Finds the cost of the corresponding item. */
        let c = itemsData.itemsList.find((key) => {
            return key.name === item;
        })?.cost;

        ans += `<tr><td style='border: 0.075rem solid black;'>${item}</td><td style='border: 0.075rem solid black;'>${c}</td></tr>\n`;
        totalCost += c
    });

    /* Adds totalCost as new row to table. */
    ans += `<tr><td style='border: 0.075rem solid black;'>Total Cost</td><td style='border: 0.075rem solid black;'>${totalCost}</tr>`;
    ans += "</table>"

    const template = fs.readFileSync('templates/orderConfirmation.ejs', 'utf8');
    const rendered = ejs.render(template, { name: name, email: email, 
                                            delivery: delivery, orderTable: ans})
    response.send(rendered);
});

server.listen(portNumber)