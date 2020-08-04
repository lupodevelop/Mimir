import { MongoClient } from "../deps.ts";

//INIT DB
const client  = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");


const db = client.database("deno");

export default db;