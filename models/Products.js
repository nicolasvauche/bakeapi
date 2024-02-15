const { MongoClient } = require('mongodb')

let db
const dbURI =
  'mongodb://nicolas:nicolas@localhost:27017/nodejs_cours?authSource=admin'
const dbName = 'node_bakeapi'

MongoClient.connect(dbURI)
  .then(client => {
    console.log('Connexion à MongoDB réussie')
    db = client.db(dbName)
  })
  .catch(err => console.error(err))

class Product {
  static findAll () {
    return db.collection('products').find().toArray()
  }
}

module.exports = Product
