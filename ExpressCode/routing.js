const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const portNumber = 6500;

app.get("/", (request, response) => {
   response.end("Welcome to the cmsc335 home page");
});

app.get("/syllabus", (request, response) => {
   response.end("Class Syllabus")
});

app.get("/class/:semester", (request, response) => {
   response.end("Information for semester: " + request.params.semester);   
});

/* Middleware function invoked if above ones don't match */
app.use((request, response) => {
   const httpNotFoundStatusCode = 404;
   response.status(httpNotFoundStatusCode).send("Resource not found");
});

app.listen(portNumber);
console.log(`Try: http://localhost:${portNumber}`);
console.log(`Try: http://localhost:${portNumber}/syllabus`);
console.log(`Try: http://localhost:${portNumber}/class/summer`);
console.log(`Try: http://localhost:${portNumber}/invalid`);