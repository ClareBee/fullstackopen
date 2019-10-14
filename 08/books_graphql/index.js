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
    name: String!
    bookCount: Int!
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
    allBooks: (root, args) => {
      if(!args.author && !args.genre){
        return Book.find({}).populate('author')
      }
      if(args.author) {
        return Book.find({ author: args.author }).populate('author')
      }
      if(args.genre){
        return Book.find({ genres: args.genre }).populate('author')
      }
    },
    // allAuthors: () => {
    //   return authors.map(author => {
    //     return {
    //       name: author.name,
    //       born: author.born,
    //       bookCount: books.filter(book => book.author === author.name).length
    //     }
    //   })
    // }
  },
  Mutation: {
    addBook: async (root, args) => {
      // if (!books.find(book => book.author === args.author)){
      //   const author = { name: args.author, bookCount: 1, id: uuid()}
      //   authors = authors.concat(author)
      // }
      let author = await Author.findOne({ name: args.authorInput.name })
      if(!author){
        author = new Author({ name: args.authorInput.name, bookCount: 1 })
      }
      console.log(author)
      const book = new Book({ ...args, author: author })
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
