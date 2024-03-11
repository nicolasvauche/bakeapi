module.exports = db => {
  const bcrypt = require('bcrypt')
  const saltRounds = 10
  const User = require('../models/user')(db)

  return {
    addUser: async (req, res) => {
      try {
        const userData = req.body
        userData.role = 'ROLE_USER'

        const hashedPassword = await bcrypt.hash(userData.password, saltRounds)
        userData.password = hashedPassword

        User.add(userData)
          .then(result => {
            const { password, role, ...user } = userData
            res.status(201).json(user)
          })
          .catch(error => {
            console.error('Internal server error:', error)
            res
              .status(500)
              .json({ error: error.message || 'Internal server error' })
          })
      } catch (error) {
        console.error('Internal server error:', error)
        res
          .status(500)
          .json({ error: error.message || 'Internal server error' })
      }
    }
  }
}
