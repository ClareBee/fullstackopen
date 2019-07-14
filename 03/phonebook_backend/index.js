const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
morgan.token('person', function(req, res){ return '' })
app.use(morgan(':method :url :response-time ms :person'))
app.use(cors())

const baseUrl = '/api'
let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

const generateId = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const checkUniqueness = (name) => {
  return persons.find(person => person.name.toUpperCase() === name.toUpperCase())
}

app.get(`${baseUrl}`, (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get(`${baseUrl}/info`, (req, res) => {
  res.send(`<h1>Phonebook has info for ${persons.length} people</h1>
    <p>Request received at ${new Date()}</p>`)
})

app.get(`${baseUrl}/persons`, (req, res) => {
  res.json(persons)
})

app.get(`${baseUrl}/persons/:id`, (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person){
    res.json(person)
  } else {
    // end method = empty response
    res.status(404).end()
  }
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
  const notUnique = checkUniqueness(body.name)
  if(notUnique){
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(500),
  }
  persons = persons.concat(person)
  morgan.token('person', function(req, res) { return JSON.stringify(person) })
  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
