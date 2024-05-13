/*
 * Use formsSummaryGet.html to provide information
 */

const express = require("express"); /* Accessing express module */
const app = express(); /* app is a request handler function */
const portNumber = 7003;
const statusCode = 200;

app.get("/", (request, response) => {
  let answer = "<h1>Welcome to Terps Supermarket</h1>";
  response.writeHead(statusCode, { "Content-type": "text/html" });
  response.end(answer);
});

app.get("/catalog", (request, response) => {
  /* Notice how we are extracting the values from request.query */
  const { firstName, lastName, password, email, website } = request.query;
  const { ownsLaptop, ownsDesktop, atSchool, gender } = request.query;
  const { course, transcript, description, expertise, devEnvironments } = request.query;
 
  let answer = "<h2>Information provided via Get:</h2>";
  answer += "firstName: " + firstName + "<br>";
  answer += "lastName: " + lastName + "<br>";
  answer += "password: " + password + "<br>";
  answer += "email: " + email + "<br>";
  answer += "website: " + website + "<br>";
  answer += "ownsLaptop: " + ownsLaptop + "<br>";
  answer += "ownsDesktop: " + ownsDesktop + "<br>";
  answer += "atSchool: " + atSchool + "<br>";
  answer += "gender: " + gender + "<br>";
  answer += "course: " + course + "<br>";
  answer += "transcript: " + transcript + "<br>";
  answer += "description: " + description + "<br>";
  answer += "expertise: " + expertise + "<br>";
  answer += "devEnvironments: " + devEnvironments + "<br>";

  response.writeHead(statusCode, { "Content-type": "text/html" });
  response.end(answer);
});

app.listen(portNumber);
console.log(`Server started on port ${portNumber}`);
console.log(`Try: http://localhost:${portNumber}`);
console.log(`Try: Open formsSummaryGet.html in live server (or browser) to submit information`);

