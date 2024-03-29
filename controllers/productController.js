module.exports = db => {
  const Product = require('../models/product')(db)
  const User = require('../models/user')(db)

  return {
    getAllProducts: (req, res) => {
      Product.findAll()
        .then(results => res.status(200).json(results))
        .catch(error => res.status(500).send(error))
    },
    getUserProducts: (req, res) => {
      const { id: userId } = req.params
      User.findById(userId)
        .then(result => {
          if (!result) {
            return res.status(404).json({ error: 'User not found' })
          }
          Product.findAllByUserId(userId)
            .then(result => {
              res.status(200).json(result)
            })
            .catch(error => {
              console.error('Internal server error:', error)
              res
                .status(500)
                .json({ error: error.message || 'Internal server error' })
            })
        })
        .catch(error => {
          console.error('Internal server error:', error)
          res
            .status(500)
            .json({ error: error.message || 'Internal server error' })
        })
    },
    getProduct: (req, res) => {
      const { id } = req.params
      Product.findById(id)
        .then(result => {
          if (!result) {
            return res.status(404).json({ error: 'Product not found' })
          }
          res.status(200).json(result)
        })
        .catch(error => {
          console.error('Internal server error:', error)
          res
            .status(500)
            .json({ error: error.message || 'Internal server error' })
        })
    },
    addProduct: (req, res) => {
      const productData = req.body
      Product.add(productData)
        .then(result => res.status(201).json(productData))
        .catch(error => {
          console.error('Internal server error:', error)
          res
            .status(500)
            .json({ error: error.message || 'Internal server error' })
        })
    },
    editProduct: (req, res) => {
      const { id } = req.params
      const productData = req.body
      Product.updateById(id, productData)
        .then(result => {
          if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Product not found' })
          }
          Product.findById(id).then(result => {
            res.status(200).json(result)
          })
        })
        .catch(error => {
          console.error('Internal server error:', error)
          res
            .status(500)
            .json({ error: error.message || 'Internal server error' })
        })
    },
    deleteProduct: (req, res) => {
      const { id } = req.params
      Product.deleteById(id)
        .then(result => {
          if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Product not found' })
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
