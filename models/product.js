const { ObjectId } = require('mongodb')

module.exports = db => {
  let collection = db.collection('products')

  return {
    findAll: async () => {
      return collection.find().toArray()
    },
    deleteById: async id => {
      return collection.deleteOne({ _id: new ObjectId(String(id)) })
    }
  }
}
