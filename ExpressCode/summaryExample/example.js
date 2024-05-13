const express = require("express");
const app = express();
const path = require("path");
const portNumber = 7003;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");

/*
  From: https://expressjs.com/en/api.html, https://expressjs.com/en/guide/routing.html

  Note: Express extends basic Node methods and they could be used as you are
        writing your routes.  We recommend you only use Express methods as defined
        in the previous reference.

  1. res.send([body] - The body parameter can be a Buffer object, 
                       a String, an object, Boolean, or an Array.

  2. res.end([data] [, encoding]) - Ends the response process. This method actually 
     comes from Node core, specifically the response.end() method of http.ServerResponse.
     Use to quickly end the response without any data. If you need to respond with data, 
     instead use methods such as res.send() and res.json().

  3. res.json([body]) - Sends a JSON response. This method sends a response (with the 
     correct content-type) that is the parameter converted to a JSON string using 
     JSON.stringify(). The parameter can be any JSON type, including object, array, 
     string, Boolean, number, or null, and you can also use it to convert other values to JSON.

  4. res.status(code) - Sets the HTTP status for the response. It is a chainable alias 
     of Node’s response.statusCode

  5. Terms review
     a. URL parameters or query strings are the part of a URL and 
        typically comes after a question mark (?)

     b. Route parameters are named URL segments used to capture the 
        values specified at their position in the URL. The captured 
        values are populated in the req.params object.

        Route path: /users/:userId/books/:bookId
        Request URL: http://localhost:3000/users/34/books/8989
        req.params: { "userId": "34", "bookId": "8989" }
 */

/* To Test: curl -X GET http://localhost:7003/getHTML */
app.get("/getHTML", (req, res) => {
  res.send("<h1>Returning HTML </h1>");
});

/* To Test: curl -X GET "http://localhost:7003/getURLParameters?age=15&salary=777" */
/* Notice the " " around the URL, otherwise the parameters will be no be passed correctly */
app.get("/getURLParameters", (req, res) => {
   res.send(`Received age: ${req.query.age} salary: ${req.query.salary}`);
});

app.get("/getJSON", (req, res) => {
  const student = { name: "Mary", age: 15 };
  res.json(student);
});

app.get("/getRender", (req, res) => {
   const variables = { semester: "Summer" };
   res.render("welcome", variables);
});
 
app.get("/getRouteParameters/:semester/CMSC:course", (req, res) => {
   res.send(`Received semester: ${req.params.semester}, course: ${req.params.course}`);
});
 
app.get("/getRedirect", (req, res) => {
   res.redirect("http://www.cs.umd.edu");
});

app.get("/getResourceNotFound", (req, res) => {
  const student = { name: "Mary", age: 15 };
  const http_page_file_not_found = 404;
  res.status(http_page_file_not_found);
  res.send("Cannot find resource (e.g., web page or file)");
});

/* To Test: curl -X POST http://localhost:7003/postSendingEmailAddress -d "email=test@notreal" */
app.post("/postSendingEmailAddress", (req, res) => {
  res.send(`<h2>Received via post email address ${req.body.email}</h2>`);
});

/* To Test: curl -X PUT http://localhost:7003/putRequest */
app.put("/putRequest", (req, res) => {
  res.send("<h2>Received put request</h2>");
});

/* To Test: curl -X DELETE http://localhost:7003/deleteRequest */
app.delete("/deleteRequest", (req, res) => {
  res.send("<h2>Received delete request</h2>");
});

app.listen(portNumber);
console.log(`main URL http://localhost:${portNumber}/`);
