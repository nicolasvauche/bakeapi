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
    console.log('Connexion à MongoDB réussie')
    return dbConnection
  } catch (err) {
    throw new Error('Échec de la connexion à MongoDB')
  }
}

module.exports = connectDB
