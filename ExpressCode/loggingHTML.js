const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const portNumber = 7000;
const morganLogger = require("morgan");

app.use(morganLogger("short")); /* You can try dev instead of short */

app.use((request, response) => {
   let statusCode = 200; /* OK */
   
   /* text/html vs. text/plain in next entry */
   response.writeHead(statusCode, {"Content-type": "text/html"});
   response.end("<h1>We have logged the request</h1>");
});

app.listen(portNumber);
console.log(`To access server: http://localhost:${portNumber}`);
