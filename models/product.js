const { ObjectId } = require('mongodb')

module.exports = db => {
  let collection = db.collection('products')

  return {
    findAll: async () => {
      return collection.find().toArray()
    },
    findByUserId: async userId => {
      return collection.find({ userId: new ObjectId(String(userId)) }).toArray()
    },
    findById: async id => {
      return collection.findOne({ _id: new ObjectId(String(id)) })
    },
    add: async productData => {
      return collection.insertOne(productData)
    },
    updateById: async (id, productData) => {
      return collection.updateOne(
        { _id: new ObjectId(String(id)) },
        { $set: productData }
      )
    },
    deleteById: async id => {
      return collection.deleteOne({ _id: new ObjectId(String(id)) })
    }
  }
}
