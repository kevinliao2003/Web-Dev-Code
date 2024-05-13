const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const portNumber = 5005;

let message;

/* Handles the request of a favicon.ico we don't have */
/* By default browsers try to request /favicon.ico from the */
/* root of a hostname */

const reqProceessedNoContentToReturn = 204;
app.get('/favicon.ico', (reqquest, response) => response.status(reqProceessedNoContentToReturn));

app.use((request, response, next) => {
   console.log("Received: " + request.url);
   message = "First middleware function";
   console.log(message);
   next();  /* next middleware function */
});

app.use((request, response) => {
   let secondMessage = "Second middleware function";

   console.log(secondMessage);
   message += secondMessage;
   response.end(message);
});


app.listen(portNumber);
console.log(`To access server: http://localhost:${portNumber}`);
