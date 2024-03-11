const { MongoClient, ServerApiVersion } = require('mongodb')
const dbURI = process.env.MONGO_URI

let dbConnection

const connectDB = async () => {
  if (dbConnection) {
    return dbConnection
  }

  try {
    const mongoClient = new MongoClient(dbURI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    const client = await mongoClient.connect(dbURI)
    dbConnection = client.db()
    console.log('MongoDB connection is OK')
    return { db: dbConnection, client: client }
  } catch (err) {
    throw new Error(`MongoDB connection error: ${err}`)
  }
}

module.exports = connectDB
