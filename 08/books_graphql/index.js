require('dotenv').config()

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
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
      console.log('found', author)
      if(!author){
        author = new Author({ bookCount: 1, name: args.authorInput.name })
        console.log('new', author)
      }
      console.log(author)

      const book = new Book({ ...args})
      console.log(book)
      book.author = author
      try {
        await author.save()
        await book.save()
      } catch (error) {
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
      try{
        await author.save()
      } catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
