import { MongoClient, ServerApiVersion } from "mongodb";

//  connect to database
const uri = process.env.DATABASE_URI;

// creating mongoDB client with stable api vrsion
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);


let db;
async function connectDB() {
    try {
        await client.connect();
        console.log("Connection established. You successfully connected to MongoDB!");  // send a successful message 
        db = client.db(process.env.DATABASE_NAME).collection(process.env.COLLECTION_NAME);
        return;

        // const collection = database.collection(`${process.env.COLLECTION_NAME}`); 
    }
    catch (error) {
        console.log("Database connection error:: ", error);
        process.exit(1);   // end process

    }
}
// this function returns a promise

async function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
}

export { connectDB, getDB };
