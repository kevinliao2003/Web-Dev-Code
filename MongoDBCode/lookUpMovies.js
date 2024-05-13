const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') })  

const uri = process.env.MONGO_CONNECTION_STRING;

 /* Our database and collection */
 const databaseAndCollection = {db: "CMSC335DB", collection:"moviesCollection"};

/****** DO NOT MODIFY FROM THIS POINT ONE ******/
const { MongoClient, ServerApiVersion } = require('mongodb');
async function main() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

   
    try {
        await client.connect();
                console.log("***** Looking up one movie *****");
                let movieName = "Batman";
                await lookUpOneEntry(client, databaseAndCollection, movieName);

                console.log("***** Looking up many *****");
                let year = 2005, stars = 2.0;
                //await lookUpMany(client, databaseAndCollection, year, stars);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function lookUpOneEntry(client, databaseAndCollection, movieName) {
    let filter = {name: movieName};
    console.log("filter " + filter); //[object Object]
    const result = await client.db(databaseAndCollection.db)
                        .collection(databaseAndCollection.collection)
                        .findOne(filter);

   if (result) {
       console.log("result " + result.year); //[object Object]
   } else {
       console.log(`No movie found with name ${movieName}`);
   }
}

async function lookUpMany(client, databaseAndCollection, year, stars) {
    let filter = {year : { $gte: year}, stars: {$gte: stars}};
    const cursor = client.db(databaseAndCollection.db)
    .collection(databaseAndCollection.collection)
    .find(filter);

    // Some Additional comparison query operators: $eq, $gt, $lt, $lte, $ne (not equal)
    // Full listing at https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
    const result = await cursor.toArray(); //must convert to array to view content
    console.log(result);
}

main().catch(console.error);