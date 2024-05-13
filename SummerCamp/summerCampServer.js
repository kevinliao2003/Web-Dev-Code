/* REQUIRED MODULES */
const express = require("express"); /* Accessing express module */
const ejs = require("ejs");
const http = require('http');
const fs = require("fs");
const bodyParser = require("body-parser"); /* To handle post parameters */

/* Prompts the user for port number using command line arguments */
const args = process.argv.slice(2);
const portNumber = parseInt(args[0]);

/* CREATES AN INSTANCE OF EXPRESS */
const app = express(); /* app is a request handler function */
const server = http.createServer(app);
console.log(`Web server started and running at http://localhost:${portNumber}`);

/* Initializes request.body with post information */ 
app.use(bodyParser.urlencoded({extended:false}));

/* EXPRESS SET UP */
app.set("view engine", "ejs"); //sets as the view engine
app.use(express.urlencoded({ extended: true }));

/* MONGO SET UP */
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') }) 

const password = process.env.MONGO_DB_PASSWORD;
const mongoName = process.env.MONGO_DB_NAME;
const mongoCollection = process.env.MONGO_COLLECTION;

/* Our database and collection */
const databaseAndCollection = {db: mongoName, collection: mongoCollection};

const { MongoClient, ServerApiVersion } = require('mongodb');
async function main() {
   const uri = `mongodb+srv://kliao:${password}@cluster0.f7zg38i.mongodb.net/?retryWrites=true&w=majority`;
   //const client = new MongoClient(uri);
   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

   try {
      await client.connect();
   } catch (e) {
      console.error(e);
   } finally {
      await client.close();
   }
}

/* Asks the user if they want to continue */
const prompt = "Stop to shutdown the server: ";
process.stdout.write(prompt);
process.stdin.on("readable", function () {
   let dataInput = (process.stdin.read()).toString();
   if (dataInput !== null) {
      let command = dataInput.trim();
      if (command === "stop") {
         /* The server will stop when "stop" is entered. */
         process.stdout.write("Shutting down the server\n");
         process.exit(0);
     }
   }
});

/* GET AND POST REQUESTS FOR EJS FILES */
/* USE MONGO TO KEEP TRACK OF APPLICATION DATA */

app.get("/", (request, response) => {
   const template = fs.readFileSync('templates/welcome.ejs', 'utf8');
   const rendered = ejs.render(template);
   response.send(rendered);
});

/* /apply GET AND POST REQUESTS */

app.get("/apply", (request, response) => {
   const template = fs.readFileSync('templates/application.ejs', 'utf8');
   const rendered = ejs.render(template, {portNumber: portNumber});
   response.send(rendered);
});

app.post("/apply", async (request, response) => {
   const uri = `mongodb+srv://kliao:${password}@cluster0.f7zg38i.mongodb.net/?retryWrites=true&w=majority`;
   //const client = new MongoClient(uri);
   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

   try {
      let {name, email, gpa, background} = request.body;

      /* MONGO */
      let application = {applicantName: name, applicantEmail: email, 
                        applicantGpa: gpa, applicantBackground: background};
      await insertApplication(client, databaseAndCollection, application);

      const dateTimeObject = new Date() //time in which form was submitted
      let dateAndTime = dateTimeObject.toDateString() + ' ' + dateTimeObject.toTimeString();
      const template = fs.readFileSync('templates/applicantsData.ejs', 'utf8');
      const rendered = ejs.render(template, { name: name, email: email, 
                                             gpa: gpa, background: background, dateAndTime: dateAndTime});
      response.send(rendered);
   } catch(e) {
      console.error(e);
   } finally {
      await client.close();
   }
});

/* /review GET AND POST REQUESTS */

app.get("/review", (request, response) => {
   const template = fs.readFileSync('templates/reviewApplication.ejs', 'utf8');
   const rendered = ejs.render(template, {portNumber: portNumber});
   response.send(rendered);
});

app.post("/review", async (request, response) => {
   const uri = `mongodb+srv://kliao:${password}@cluster0.f7zg38i.mongodb.net/?retryWrites=true&w=majority`;
   //const client = new MongoClient(uri);
   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

   try {
      let {email} = request.body;

      /* Time in which action was completed */
      const dateTimeObject = new Date() //time in which form was submitted
      let dateAndTime = dateTimeObject.toDateString() + ' ' + dateTimeObject.toTimeString();

      /* Finds the applicant with the given email address */
      const info = await lookUpEmail(client, databaseAndCollection, email);
      const template = fs.readFileSync('templates/applicantsData.ejs', 'utf8');
      if (info) { //CHECK NECESSARY
         const rendered = ejs.render(template, { portNumber: portNumber, name: info.applicantName, email: info.applicantEmail, 
                                                gpa: info.applicantGpa, background: info.applicantBackground, dateAndTime: dateAndTime})
         response.send(rendered);
      } else { /* Applicant with given email address not found */
         const rendered = ejs.render(template, { portNumber: portNumber, name: "NONE", email: "NONE", 
                                                 gpa: "NONE", background: info.applicantBackground, dateAndTime: dateAndTime})
         response.send(rendered);
      }
   } catch(e) {
      console.error(e);
   } finally {
      await client.close();
   }
});

/* /selectByGPA GET AND POST REQUESTS */

app.get("/selectByGPA", (request, response) => {
   const template = fs.readFileSync('templates/selectByGPA.ejs', 'utf8');
   const rendered = ejs.render(template, {portNumber: portNumber});
   response.send(rendered);
});

app.post("/selectByGPA", async (request, response) => {
   const uri = `mongodb+srv://kliao:${password}@cluster0.f7zg38i.mongodb.net/?retryWrites=true&w=majority`;
   //const client = new MongoClient(uri);
   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

   try {
      let {gpa} = request.body;

      /* Finds applicants with gpas greater than or equal to gpa */
      const info = await getGPAs(client, databaseAndCollection, gpa);
      if (info) {
         /* Builds HTML table */
         let ans = "<table style='border: 0.075rem solid black;'>";
         ans += "<thead><tr><th style='border: 0.075rem solid black;'>Name</th><th style='border: 0.075rem solid black;'>GPA</th></tr></thead>";

         let visited = []; //avoids processing same names
         info.forEach((item) => {
            let name = item.applicantName;
            if (!visited.includes(name) && name !== '') {
               ans += `<tr><td style='border: 0.075rem solid black;'>${name}`;
               ans += `</td><td style='border: 0.075rem solid black;'>${item.applicantGpa}</td></tr>`;
               visited.push(name);
            }
         });
         ans += "</table>";

         const template = fs.readFileSync('templates/displayGPAs.ejs', 'utf8');
         const rendered = ejs.render(template, { getGPAs: ans});
         response.send(rendered);
      }
   } catch(e) {
      console.error(e);
   } finally {
      await client.close();
   }
});

/* /selectByGPA GET AND POST REQUESTS */

app.get("/removeAll", (request, response) => {
   const template = fs.readFileSync('templates/removeAll.ejs', 'utf8');
   const rendered = ejs.render(template, {portNumber: portNumber});
   response.send(rendered);
});

app.post("/removeAll", async (request, response) => {
   const uri = `mongodb+srv://kliao:${password}@cluster0.f7zg38i.mongodb.net/?retryWrites=true&w=majority`;
   //const client = new MongoClient(uri);
   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

   try {
      let numRemoved = await clearCollection(client, databaseAndCollection);

      const template = fs.readFileSync('templates/removeOfAll.ejs', 'utf8');
      const rendered = ejs.render(template, { numRemoved: numRemoved});
      response.send(rendered);
   } catch(e) {
      console.error(e);
   } finally {
      await client.close();
   }
});

/* Selecting the "HOME" link in one of the pages will take us back to the home page. */
app.get("/home", (request, response) => {
   const template = fs.readFileSync('templates/welcome.ejs', 'utf8');
   const rendered = ejs.render(template);
   response.send(rendered);
});

/* Submit application functionality 
   - data provided in the application is correctly stored in the database. */
async function insertApplication(client, databaseAndCollection, application) {
   const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(application);
}

async function lookUpEmail(client, databaseAndCollection, email) {
   let filter = {applicantEmail: email};
   const result = await client.db(databaseAndCollection.db)
                        .collection(databaseAndCollection.collection)
                        .findOne(filter); //returns a single document or null
   return result;
}

async function getGPAs(client, databaseAndCollection, gpa) {
   let filter = {applicantGpa: { $gte: gpa}}; //greater than or equal to gpa
   const cursor = client.db(databaseAndCollection.db)
                        .collection(databaseAndCollection.collection)
                        .find(filter);

   const result = await cursor.toArray(); //must convert to array to view content
   return result;
}

/* Remove all applications from the database functionality */
async function clearCollection(client, databaseAndCollection) {
   const result = await client.db(databaseAndCollection.db)
                              .collection(databaseAndCollection.collection)
                              .deleteMany({}); //deletes all content

   return result.deletedCount //returns the number of elements deleted
}

main().catch(console.error);

server.listen(portNumber);