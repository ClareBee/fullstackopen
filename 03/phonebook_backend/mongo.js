const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

// accesses command line params
const password = process.argv[2]

const url =
  `mongodb+srv://clarebee:${password}@cluster0-qugsl.mongodb.net/people?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

// mongo is schemaless
// Mongoose provides schema at application level to define shape of documents stored in collection
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

// definition - 'Person' as singular of model - collection will be 'people'
const Person = mongoose.model('Person', personSchema)

// model as constructor function
const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

if (process.argv[3]) {
  person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}

if (!process.argv[3]){
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
