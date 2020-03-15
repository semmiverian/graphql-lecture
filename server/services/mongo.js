const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'majestic-fox'
const client = new MongoClient(url)

module.exports = client