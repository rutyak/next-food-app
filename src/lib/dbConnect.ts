import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!url) {
  throw new Error("Please define MONGODB_URL in your environment variable");
}

if(process.env.NODE_ENV === 'development'){
  if(!global._mongoClientPromise){
    client = new MongoClient(url, options);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else{
  client = new MongoClient(url, options);
  clientPromise = client.connect();
}

export default clientPromise;

