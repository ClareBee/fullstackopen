require('dotenv').config()
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const Book = require('./models/book')
const Author = require('./models/author')
const Visitor = require('./models/visitor')

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
  type Visitor {
    username: String!
    favoriteGenre: String
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
    me: Visitor
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
    createVisitor(
      username: String!
      favoriteGenre: String!
    ): Visitor
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => {
      return Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
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
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
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
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book.populate('author')
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
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
    createVisitor: async (root, args) => {
      const visitor = new Visitor({ username: args.username, favoriteGenre: args.genre })
      try {
        await visitor.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return visitor
    },
    login: async (root, args) => {
      const user = await Visitor.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const visitorForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(visitorForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
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
      const currentUser = await Visitor.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
