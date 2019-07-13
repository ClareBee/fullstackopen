const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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

const generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(person => person.id))
  : 0
  return maxId + 1
}

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/persons', (req, res) => {
  res.json(persons)
})

app.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person){
    res.json(person)
  } else {
    // end method = empty response
    res.status(404).end()
  }
})

app.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/persons', (req, res) => {
  const body = req.body
  console.log('req', req)
  if (!body.name) {
   return res.status(400).json({
     error: 'content missing'
   })
  }
  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  }
  persons = persons.concat(person)
  console.log('person', person)
  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
