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
        
        console.log("***** Updating one movie *****");
        let newValues = {year: 2022, stars: 7.0};
        let targetName = "Batman";
        await updateOne(client, databaseAndCollection, targetName, newValues)
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function updateOne(client, databaseAndCollection, targetName, newValues) {
    let filter = {name : targetName};
    let update = { $set: newValues };

    //For debugging purposes
    console.log("filter " + filter);
    console.log("updte: " + update);

    const result = await client.db(databaseAndCollection.db)
    .collection(databaseAndCollection.collection)
    .updateOne(filter, update);

    console.log(`Documents modified: ${result.modifiedCount}`);
}

main().catch(console.error);