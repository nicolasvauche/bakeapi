module.exports = db => {
  let collection = db.collection('products')

  return {
    findAll: async () => {
      return collection.find().toArray()
    }
  }
}
