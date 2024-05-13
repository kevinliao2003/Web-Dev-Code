const path = require("path");
const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const portNumber = 7002; /* port number used must be the same used in formGet.html */

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");

app.get("/", (request, response) => {
   const variables = { semester: request.query.semester,
                       teacher : request.query.teacher
                     };
   /* Generating HTML using courseInfo template */
   response.render("courseInfo", variables);
});

app.listen(portNumber);
console.log(`Try: http://localhost:${portNumber}/?semester=fall&teacher=Peter or use formGet.html`);
