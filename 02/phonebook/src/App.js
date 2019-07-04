import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Filter from './components/filter'
import PersonForm from './components/person_form'
import People from './components/people'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchInput, setSearchInput ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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
      return persons
    }
    else {
     return persons
      .filter(person => person.name.toUpperCase().match(searchInput.toUpperCase()))
    }
  }

  const showNames = (event) => {
    setSearchInput(event.target.value)
  }

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <Filter
        showNames={showNames}
        searchInput={searchInput}
      />

      <h2>Add a New </h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <div>
        <People people={renderPeople()} />
      </div>
    </div>
  )
}

export default App;
