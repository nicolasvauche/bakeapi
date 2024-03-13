module.exports = db => {
  const bcrypt = require('bcrypt')
  const saltRounds = 10
  const User = require('../models/user')(db)

  return {
    getAllUsers: (req, res) => {
      User.findAll()
        .then(results => {
          const users = []
          results.forEach(result => {
            const { password, ...user } = result
            users.push(user)
          })
          res.status(200).json(users)
        })
        .catch(error => res.status(500).send(error))
    },
    getUser: (req, res) => {
      const { id } = req.params
      User.findById(id)
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
    },
    getUserProfile: (req, res) => {
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
    },
    addUser: async (req, res) => {
      try {
        const userData = req.body
        userData.role = 'ROLE_USER'

        const hashedPassword = await bcrypt.hash(userData.password, saltRounds)
        userData.password = hashedPassword

        User.add(userData)
          .then(result => {
            const { password, ...user } = userData
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
    },
    editUser: (req, res) => {
      const { id } = req.params
      const userData = req.body
      User.updateById(id, userData)
        .then(result => {
          if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' })
          }
          User.findById(id).then(result => {
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
    deleteUser: (req, res) => {
      const { id } = req.params
      User.deleteById(id)
        .then(result => {
          if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' })
          }
          res
            .status(200)
            .json({ message: `User ${id} was successfully deleted` })
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
