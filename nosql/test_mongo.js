import { MongoClient } from 'mongodb';
import dns from 'dns';

dns.setServers(['8.8.8.8']);

const uri = "mongodb+srv://vairaselvi24_db_user:QueryBuilderCluster@querybuildercluster.pqevs9l.mongodb.net/?appName=QueryBuilderCluster";
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

async function run() {
    try {
        console.log("Testing connection...");
        await client.connect();
        console.log("Connected successfully!");
        const db = client.db("admin");
        const ping = await db.command({ ping: 1 });
        console.log("Ping result:", ping);
    } catch (err) {
        console.error("Connection failed:", err.message);
    } finally {
        await client.close();
    }
}

run();
