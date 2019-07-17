require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
morgan.token('person', function(req, res){ return '' })
app.use(morgan(':method :url :response-time ms :person'))
app.use(express.static('build'))

const baseUrl = '/api'

app.get(`${baseUrl}`, (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get(`${baseUrl}/info`, (req, res) => {
  Person.find({}).then(people => {
    res.send(`<p>Phoneback has info on ${people.length} people</p>`)
  })})

app.get(`${baseUrl}/persons`, (req, res) => {
  Person.find({}).then(people => {
    res.json(people.map(person => person.toJSON()))
  })
})

app.get(`${baseUrl}/persons/:id`, (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person.toJSON())
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.put(`${baseUrl}/persons/:id`, (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.delete(`${baseUrl}/persons/:id`, (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post(`${baseUrl}/persons`, (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
   return res.status(400).json({
     error: 'content missing'
   })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  console.log(person)
  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
  morgan.token('person', function(req, res) { return JSON.stringify(person) })
})

// has to be last middleware loaded in!
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
