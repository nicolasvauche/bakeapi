module.exports = db => {
  const bcrypt = require('bcrypt')
  const saltRounds = 10
  const User = require('../models/user')(db)
  const Product = require('../models/product')(db)

  return {
    getProfile: (req, res) => {
      const { _id } = req.userInfos
      User.findById(_id)
        .then(result => {
          const { password, ...user } = result
          res.status(200).json(user)
        })
        .catch(error => {
          console.error('Internal server error:', error)
          res
            .status(500)
            .json({ error: error.message || 'Internal server error' })
        })
    },
    getProducts: (req, res) => {
      const { _id } = req.userInfos
      Product.findAllByUserId(_id)
        .then(result => {
          res.status(200).json(result)
        })
        .catch(error => {
          console.error('Internal server error:', error)
          res
            .status(500)
            .json({ error: error.message || 'Internal server error' })
        })
    },
    editProfile: async (req, res) => {
      const { _id } = req.userInfos
      const userData = req.body

      if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds)
        userData.password = hashedPassword
      }

      User.updateById(_id, userData)
        .then(result => {
          User.findById(_id).then(result => {
            const { password, ...user } = result
            res.status(200).json(user)
          })
        })
        .catch(error => {
          console.error('Internal server error:', error)
          res
            .status(500)
            .json({ error: error.message || 'Internal server error' })
        })
    },
    deleteProfile: (req, res) => {
      const { _id } = req.userInfos
      User.deleteById(_id)
        .then(result => {
          res
            .status(200)
            .json({ message: `User ${_id} was successfully deleted` })
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
