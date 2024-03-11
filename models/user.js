const { ObjectId } = require('mongodb')

module.exports = db => {
  let collection = db.collection('users')

  return {
    findAll: async () => {
      return collection.find().toArray()
    },
    add: async userData => {
      return collection.insertOne(userData)
    }
  }
}
