require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')


app.use(bodyParser.json())
morgan.token('person', function(req, res){ return '' })
app.use(morgan(':method :url :response-time ms :person'))
app.use(express.static('build'))
app.use(cors())

const baseUrl = '/api'

app.get(`${baseUrl}`, (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get(`${baseUrl}/info`, (req, res) => {
  res.send(`<h1>Phonebook has info for ${persons.length} people</h1>
    <p>Request received at ${new Date()}</p>`)
})

app.get(`${baseUrl}/persons`, (req, res) => {
  Person.find({}).then(people => {
    res.json(people.map(person => person.toJSON()))
  })
})

app.get(`${baseUrl}/persons/:id`, (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON())
  })
})

app.delete(`${baseUrl}/persons/:id`, (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
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

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
