module.exports = db => {
  const Product = require('../models/product')(db)

  return {
    getAllProducts: (req, res) => {
      Product.findAll()
        .then(results => res.status(200).json(results))
        .catch(error => res.status(500).send(error))
    },
    deleteProduct: (req, res) => {
      const { id } = req.params
      Product.deleteById(id)
        .then(result => {
          if (result.deletedCount === 0) {
            return res.status(404).send('Product not found')
          }
          res
            .status(200)
            .json({ message: `Product ${id} was successfully deleted` })
        })
        .catch(error => {
          console.error('Internal server error:', error)
          res
            .status(500)
            .json({ error: error.message || 'Internal server error' })
        })
    }
  }
}
