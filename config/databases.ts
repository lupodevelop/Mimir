import { MongoClient, config } from "../deps.ts";

// DATABASE SETTINGS
const DB_ENV = config();
const HOST =  DB_ENV.DB_URI || "mongodb://localhost";
const PORT = +DB_ENV.DB_PORT || "27017";
const NAME = DB_ENV.DB_NAME || "deno";


//INIT DB
const client  = new MongoClient();
client.connectWithUri(`${HOST}:${PORT}`);


const db = client.database(NAME);

export default db;