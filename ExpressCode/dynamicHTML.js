const http = require("http");
const path = require("path");
const express = require("express"); /* Accessing express module */
const app = express(); /* app is a request handler function */
const portNumber = 7002;

/* directory where templates will reside */
app.set("views", path.resolve(__dirname, "templates"));

/* view/templating engine */
app.set("view engine", "ejs");

app.get("/", (request, response) => {
  const variables = {
    semester: "Summer",
    greeting: "Welcome to the course site"
  };

  /* Generating the HTML using welcome template */
  response.render("welcome", variables);
});

app.listen(portNumber);
console.log(`To access server: http://localhost:${portNumber}`);
