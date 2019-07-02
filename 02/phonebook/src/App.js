import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchInput, setSearchInput ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    const namesArray = persons.map(person => person.name)
    if (namesArray.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const renderPeople = () => {
    if (searchInput === ''){
      console.log('hello')
      return persons.map(person => <p key={person.name}>{person.name} - {person.number}</p>)
    } else {
     return persons
      .filter(person => {
        if (person.name.toUpperCase().match(searchInput.toUpperCase())){
          return person
        }
      })
      .map(person => <p key={person.name}>{person.name} - {person.number}</p>)
    }
  }

  const showNames =(event) => {
    console.log(event.target.value)
    setSearchInput(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <label>Filter shown with:</label>
      <input onChange={showNames} value={searchInput}/>
      <h2>Add a New </h2>
      <form
        onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {renderPeople()}
      </div>
    </div>
  )
}

export default App;
