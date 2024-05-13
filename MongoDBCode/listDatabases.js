
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
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client) {
    const dbsList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    dbsList.databases.forEach(db => {
        console.log(`DB Name: ${db.name}`);
    });
}

main().catch(console.error);