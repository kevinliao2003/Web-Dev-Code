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
        console.log("***** Deleting one movie *****");
        let targetName = "Batman";
        await deleteOne(client, databaseAndCollection, targetName);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function deleteOne(client, databaseAndCollection, targetName) {
    let filter = {name: targetName};
    const result = await client.db(databaseAndCollection.db)
                   .collection(databaseAndCollection.collection)
                   .deleteOne(filter);
    
     console.log(`Documents deleted ${result.deletedCount}`);
}

main().catch(console.error);