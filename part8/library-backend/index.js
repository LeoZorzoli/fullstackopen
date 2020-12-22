require('dotenv').config()
const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

let MONGODB_URI = process.env.MONGODB_URI
let JWT_SECRET = process.env.JWT_SECRET

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
      addBook(
          title: String!
          published: Int!
          author: String!
          genres: [String!]!
      ): Book
      
      editAuthor(
        name: String!
        setBornTo: Int!
      ): Author

      createUser(
        username: String!
        favoriteGenre: String!
      ): User

      login(
        username: String!
        password: String!
      ): Token
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
      name: String
      born: Int
      bookCount: Int!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      findUser (username: String): User
      allBooks (author: String, genre: String): [Book]
      allAuthors: [Author!]!  
      me: User  
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      findUser: (root, args) => User.findOne({ username: args.username }),
      allBooks: (root, args) => {
          if (args.genre) {
            return books.filter(b => b.genres.includes(args.genre))
          } else if (args.author) {
            return books.filter(b => b.author.name === args.author)
          } else {
            return books
          }
        },
      allAuthors: (root, args) => {
        return Author.find({})
      },
      me: (root, args, context) => {
        return context.currentUser
      }
  },

  Author: {
      name: (root) => root.name,
      born: (root) => root.born,
      bookCount: (root) => {
          const count = books.filter(b => b.author === root.name)
          return count.length
      }
  },

  Mutation: {
      addBook: async (root, args, context) => {
          const author = new Author ({ name: args.author })
          const authorExist = Author.findOne({name: author.name})
          const currentUser = context.currentUser

          if (!currentUser) {
            throw new AuthenticationError("Not authenticated")
          }

          try {
            if (!authorExist) {
              await author.save()
            }
            const book = new Book({ ...args, id: uuid(), author: author})
            await book.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          return book
      },
      editAuthor: async (root, args, context) => {
          const author = await Author.findOne({name: args.name})
          const currentUser = context.currentUser

          if(!currentUser) {
            throw new AuthenticationError("Not authenticated")
          }

          if (!author) {
            return null
          }
          author.born = args.setBornTo 

          try {
            await author.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }

          return author     
      },
      createUser: (root, args) => {
        const user = new User({ ...args })
    
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("Wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})