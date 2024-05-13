const path = require("path");
const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const bodyParser = require("body-parser");
const portNumber = 7003; /* port number used must be the same used in formPost.html */

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");

/* Initializes request.body with post information */ 
app.use(bodyParser.urlencoded({extended:false}));

app.post("/", (request, response) => {
   const variables = { semester: request.body.semester,
                       teacher : request.body.teacher
                     };
   /* Generating HTML using courseInfo template */
   response.render("courseInfo", variables);
});

app.listen(portNumber);
console.log(`Server started on port ${portNumber}`);
console.log("Use formPost.html to provide data");