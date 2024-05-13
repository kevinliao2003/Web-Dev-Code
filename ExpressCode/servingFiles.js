const path = require("path");
const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const portNumber = 7001;

console.log(`__dirname: ${__dirname}`);
/* Notice serverStaticFiles is not part of the url to find files */
const publicPath = path.resolve(__dirname, "serverStaticFiles");
console.log(`publicPath: ${publicPath}`);

app.use(express.static(publicPath));

/* If the static file is not found this middleware function will be executed */
app.use((request, response) => {
   let statusCode = 404; 

   /* Only processing HTML content */
   response.writeHead(statusCode, {"Content-type": "text/html"});
   response.end("<h1>Requested file not found2</h1>");
});

app.listen(portNumber);
console.log("============================");
let message = `To access files under ${publicPath} type \nname of the file`;
message += `(e.g., armory.jpg) after http://localhost:${portNumber}/`;
console.log(message);

