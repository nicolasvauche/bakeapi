module.exports = db => {
  const bcrypt = require('bcrypt')
  const saltRounds = 10
  const User = require('../models/user')(db)

  return {
    addUser: async (req, res) => {
      try {
        const userData = req.body
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds)
        userData.password = hashedPassword

        User.add(userData)
        .then(result => {
          const { password, ...userWithoutPassword } = userData
          res.status(201).json(userWithoutPassword)
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
