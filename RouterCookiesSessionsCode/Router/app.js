const express = require("express"); 
const app = express(); 
const portNumber = 3000;


const buildings = require("./routes/buildings");
const schoolDorms = require("./routes/schoolDorms");

/* Treating like middleware. Use buildings.js file to handle 
   endpoints that start with /buildings */
app.use("/buildings", buildings);

/* Treating like middleware. Use schoolDorms.js file to handle 
   endpoints that start with /dorms.  Examples shows you
   don't have to name file after part of the end point */
app.use("/dorms", schoolDorms);


app.use("/", (request, response) => {
  response.send("/ in app.js ");
});

console.log(`Server listening on port ${portNumber}`)
const homeURL = `http://localhost:${portNumber}`;
console.log(homeURL);

/* buildings URLs */
const buildingsURL = `${homeURL}/buildings`;
const buildingsIribeURL = `${homeURL}/buildings/iribe`;
console.log(buildingsURL);
console.log(buildingsIribeURL);

/* dorms URLs */
const dormsURL = `${homeURL}/dorms`;
const dormsLaPlataURL = `${homeURL}/dorms/laplata`;
console.log(dormsURL);
console.log(dormsLaPlataURL);

app.listen(portNumber);