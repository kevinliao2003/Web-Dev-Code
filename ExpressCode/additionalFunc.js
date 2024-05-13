const path = require("path");
const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const portNumber = 7002;

console.log("__dirname: " + __dirname);
/* Notice serverStaticFiles is not part of the url to find files */
const publicPath = path.resolve(__dirname, "serverStaticFiles");

app.use(express.static(publicPath));

app.use((request, response) => {
   response.redirect("http://www.cs.umd.edu");
});

app.listen(portNumber);
console.log(`Try: http://localhost:${portNumber}/Testudo.jpg`)
console.log(`Try redirect option with: http://localhost:${portNumber}/`);
