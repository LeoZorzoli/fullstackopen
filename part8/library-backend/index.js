require('dotenv').config()
const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

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

  type Subscription {
    bookAdded: Book!
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
      books: [Book]
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      findUser (username: String): User
      allBooks: [Book]
      allAuthors: [Author]
      me: User  
      recommends: [Book]
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      findUser: (root, args) => User.findOne({ username: args.username }),
      allBooks: async (root, args) => {
          return await Book.find({}).populate('author')
      },
      allAuthors: async (root, args) => {
          return await Author.find({}).populate('books')
      },
      me: (root, args, context) => {
        return context.currentUser
      },
      recommends: async (root, args, context) => {
        const currentUser = context.currentUser
        if(currentUser){
          const booksToShow = await Book.find({
            genres: {
              $in: [currentUser.favoriteGenre]
            }
          }).populate('author')
          return booksToShow
        } else {
          return await Book.find({}).populate('author')
        }
      }
  },

  Author: {
      name: (root) => root.name,
      born: (root) => root.born,
  },

  Mutation: {
      addBook: async (root, args, context) => {
          let book
          try {
            const author = await Author.findOne({name: args.author})
            const currentUser = context.currentUser

            if (!currentUser) {
              throw new AuthenticationError("Not authenticated")
            }

              if (author) {
                book = new Book({ ...args, author: author._id})
                author.books = author.books.concat(book._id)

                await author.save()
                await book.save()
              }

              if (!author) {
                const _id = mongoose.Types.ObjectId()
                book = new Book({ ...args, author: _id });

                const newAuthor = new Author({
                  name: args.author,
                  born: null,
                  _id,
                  books: [book._id]
                })

                await newAuthor.save()
                await book.save()
              }
              
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }

          pubsub.publish('BOOK_ADDED', { bookAdded: book })

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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
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

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})