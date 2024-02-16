module.exports = db => {
  const Product = require('../models/Product')(db)

  return {
    getAllProducts: (req, res) => {
      Product.findAll()
        .then(results => res.status(200).json(results))
        .catch(error => res.status(500).send(error))
    }
  }
}
