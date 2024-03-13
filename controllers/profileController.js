module.exports = db => {
  const User = require('../models/user')(db)
  const Product = require('../models/product')(db)

  return {
    getProfile: (req, res) => {
      const { _id } = req.userInfos
      User.findById(_id)
        .then(result => {
          if (!result) {
            return res.status(404).json({ error: 'User not found' })
          }

          const { password, ...user } = result
          res.status(200).json(user)
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
