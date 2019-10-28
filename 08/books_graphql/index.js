require('dotenv').config()

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)
const MONGODB_URI = process.env.MONGODB_URI

const JWT_SECRET = process.env.SECRET_KEY

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
  type Book {
    title: String!
    author: Author
    published: Int!
    genres: [String!]
  }
  type Author {
    name: String
    bookCount: Int
    born: Int
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
  }
  input AuthorInput {
    name: String!
    born: Int
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      genres: [String!]
      authorInput: AuthorInput!
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
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => {
      return Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      console.log(root, args)
      if(!args.author && !args.genre){
        return Book.find({}).populate('author')
      }
      if(args.author) {
        let authorToFindBy = await Author.findOne({ name: args.author})
        return Book.find({author: authorToFindBy._id}).populate('author')
        // why doesn't this work?
        // return Book.find({'author.name': args.author}).populate('author')
      }
      if(args.genre){
        return Book.find({ genres: args.genre }).populate('author')
      }
    },
    allAuthors: () => {
      return Author.find({})
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.authorInput.name })
      if(author && author.bookCount){
        console.log('author book count', author)
        author.bookCount = author.bookCount + 1
      }
      if(author && !author.bookCount) {
        author.bookCount = 1
      }
      if(!author){
        author = new Author({ bookCount: 1, name: args.authorInput.name })
      }
      const book = new Book({ ...args})
      book.author = author
      try {
        await author.save()
        await book.save()
      } catch (error) {
        console.log(error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book.populate('author')
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.genre })

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
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
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
