const { MongoClient } = require('mongodb')
const dbURI = process.env.MONGO_URI

let dbConnection

const connectDB = async () => {
  if (dbConnection) {
    return dbConnection
  }

  try {
    const client = await MongoClient.connect(dbURI)
    dbConnection = client.db()
    console.log('MongoDB connection is OK')
    return dbConnection
  } catch (err) {
    throw new Error('MongoDB connection error')
  }
}

module.exports = connectDB
