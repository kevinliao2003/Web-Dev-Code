
const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const bodyParser = require("body-parser"); /* To handle post parameters */
const portNumber = 7004;

/* We could have placed the following routes along with 
   the ones in formsSummaryGet.js */

/* Initializes request.body with post information */ 
app.use(bodyParser.urlencoded({extended:false}));

app.post("/", (request, response) => {
	/* Notice how we are extracting the values from request.query */
   let {firstName, lastName, password, email, website} =  request.body;
   let {ownsLaptop, ownsDesktop, atSchool, gender} =  request.body;
   let {course, transcript, description, expertise, devEnvironments} =  request.body;
   	
   let statusCode = 200;
	
   let answer = "<h2>Information provided via Post</h2>";
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

   response.writeHead(statusCode, {"Content-type": "text/html"});
   response.end(answer);
});

app.listen(portNumber);
console.log(`Server started on port ${portNumber}`);
console.log(`Try: Open formsSummaryPost.html in live server (or browser) to submit information`);
