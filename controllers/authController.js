module.exports = db => {
  const jwt = require('jsonwebtoken')
  const bcrypt = require('bcrypt')
  const User = require('../models/user')(db)
  const SECRET_KEY = process.env.JWT_SECRET

  return {
    login: async (req, res) => {
      const { email, password } = req.body
      const user = await User.findByEmail(email)

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          SECRET_KEY,
          { expiresIn: '24h' }
        )
        res.json({ token })
      } else if (!user) {
        res.status(404).send('User not found')
      } else {
        res.status(401).send('Bad credentials')
      }
    }
  }
}
