require('dotenv').config()
const bcrypt = require('bcrypt')
const connectDB = require('../services/mongodb')
const users = require('./usersData')
const products = require('./productsData')
const saltRounds = 10

async function hashPasswords (users) {
  return Promise.all(
    users.map(async user => ({
      ...user,
      password: await bcrypt.hash(user.password, saltRounds)
    }))
  )
}

async function insertDocuments (db, collectionName, documents) {
  const collection = db.collection(collectionName)
  await collection.deleteMany({})
  const insertions = await collection.insertMany(documents)
  console.log(
    `${insertions.insertedCount} documents were inserted into ${collectionName}`
  )
}

async function createFixtures () {
  const { db, client } = await connectDB()
  try {
    const hashedUsers = await hashPasswords(users)
    await insertDocuments(db, 'users', hashedUsers)
    await insertDocuments(db, 'products', products)
    console.log('All fixtures have been successfully created')
  } catch (error) {
    console.error('An error occurred creating fixtures:', error)
  } finally {
    await client.close()
  }
}

createFixtures()
