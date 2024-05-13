const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const portNumber = 8001;

app.get("/", (request, response) => {
   response.send("get request detected for CMSC335");
});

app.post("/", (request, response) => {
   response.send("post request detected for CMSC335")
});

app.put("/", (request, response) => {
   response.send("put request detected for CMSC335")
});

app.delete("/", (request, response) => {
   response.send("delete request detected for CMSC335")
});

app.listen(portNumber);
console.log(`To access server: http://localhost:${portNumber}`);
