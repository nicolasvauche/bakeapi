const { ObjectId } = require('mongodb')

module.exports = db => {
  let collection = db.collection('users')

  return {
    findAll: async () => {
      return collection.find().toArray()
    },
    findById: async id => {
      return collection.findOne({ _id: new ObjectId(String(id)) })
    },
    add: async userData => {
      return collection.insertOne(userData)
    },
    updateById: async (id, userData) => {
      return collection.updateOne(
        { _id: new ObjectId(String(id)) },
        { $set: userData }
      )
    },
    deleteById: async id => {
      return collection.deleteOne({ _id: new ObjectId(String(id)) })
    }
  }
}
