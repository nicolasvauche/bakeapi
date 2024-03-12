const { MongoClient, ServerApiVersion } = require('mongodb')
const dbURI = process.env.MONGO_URI

let dbConnection
let mongoClientInstance

const connectDB = async () => {
  if (dbConnection && mongoClientInstance) {
    return { db: dbConnection, client: mongoClientInstance }
  }

  try {
    const mongoClient = new MongoClient(dbURI, {
      serverApi: ServerApiVersion.v1
    })
    await mongoClient.connect()
    dbConnection = mongoClient.db()
    mongoClientInstance = mongoClient
    console.log('MongoDB connection is OK')
    return { db: dbConnection, client: mongoClient }
  } catch (err) {
    throw new Error(`MongoDB connection error: ${err}`)
  }
}

module.exports = connectDB
