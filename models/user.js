const { ObjectId } = require('mongodb')

module.exports = db => {
  let collection = db.collection('users')

  return {
    add: async userData => {
      return collection.insertOne(userData)
    }
  }
}
