const {gql} = require('apollo-server')
const {ObjectId} = require('mongodb')

module.exports = {
  typeDefs: gql`
    type Book {
      name: String
      genre: String
    }

    extend type Query {
      books: [Book]
      book(id: ID): Book
    }

    extend type Mutation {
      addBook(name: String, genre: String): Book
    }
  `,

  resolvers: {
    Query: {
      async book(_, params, {db}) {
        const book = await db.collection('books').findOne({_id: ObjectId(params.id)})

        return book
      },

      async books(_, params, {db}) {
        const books = await db
          .collection('books')
          .find({})
          .toArray()

        return books
      }
    },

    Mutation: {
      async addBook(_, {name, genre}, {db}) {
        const book = await db.collection('books').insertOne({
          name,
          genre
        })

        return book.ops[0]
      }
    }
  }
}
