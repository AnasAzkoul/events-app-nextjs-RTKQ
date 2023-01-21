import {MongoClient} from 'mongodb'; 

export async function connectToDB () {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  
  return client; 
}

export async function insertDocument (client, document, collection) {
  const db = client.db(); 
  
  
  await db.collection(collection).insertOne(document);
}

export async function getCollectionSortedByID (client, collection, sort) {
  const db = client.db(); 
  
  const collectionArray = await db.collection(collection).find().sort(sort).toArray()
  
  return collectionArray; 
}
