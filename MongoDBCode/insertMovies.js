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
       
        /* Inserting one movie */
        console.log("***** Inserting one movie *****");
        let movie1 = {name: "Notebook", year: 2000};
        await insertMovie(client, databaseAndCollection, movie1);

        /* Inserting multiple movies */
        console.log("***** Inserting multiple movies *****");
        let moviesArray = [{name:"Batman", year:2021, stars: 1.5},
                               {name:"Wonder Women", year:2005, stars: 2.0},
                               {name:"When Harry Met Sally", year:1985, stars: 5},
                               {name:"Hulk", year:1985, stars: 5}
                              ];
        await insertMultipleMovies(client, databaseAndCollection, moviesArray);
        console.log(databaseAndCollection);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function insertMovie(client, databaseAndCollection, newMovie) {
    const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(newMovie);

    console.log(`Movie entry created with id ${result.insertedId}`);
}

async function insertMultipleMovies(client, databaseAndCollection, moviesArray) {
    const result = await client.db(databaseAndCollection.db)
                        .collection(databaseAndCollection.collection)
                        .insertMany(moviesArray);

    console.log(`Inserted ${result.insertedCount} movies`);
}

main().catch(console.error);