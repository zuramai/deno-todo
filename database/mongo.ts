import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
// Initialize the plugin
await init();
const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");
const db = client.database("deno_mongo");

export default db;