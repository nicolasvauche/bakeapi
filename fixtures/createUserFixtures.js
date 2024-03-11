require('dotenv').config()
const bcrypt = require('bcrypt')
const connectDB = require('../services/mongodb')
const saltRounds = 10

async function createUsers () {
  const { db, client } = await connectDB()
  try {
    const collection = db.collection('users')
    await collection.deleteMany({})

    const users = [
      {
        email: 'admin@test.com',
        password: 'admin',
        role: 'ROLE_ADMIN',
        bakeryName: ''
      },
      {
        email: 'user@test.com',
        password: 'user',
        role: 'ROLE_USER',
        bakeryName: 'Ma Boulangerie Test'
      }
    ]

    const userInsertions = users.map(async user => {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds)
      user.password = hashedPassword
      return collection.insertOne(user)
    })

    const results = await Promise.all(userInsertions)
    results.forEach(result => {
      console.log(`The user id: ${result.insertedId} was created successfully`)
    })

    console.log(
      results.length > 0
        ? results.length > 1
          ? results.length + ' users have been successfully created'
          : results.length + ' user has been successfully created'
        : 'No user was created because the fixtures were empty'
    )
  } catch (err) {
    console.error('An error occurred:', err)
  } finally {
    await client.close()
  }
}

createUsers()
