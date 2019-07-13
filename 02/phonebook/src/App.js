import React, { useState, useEffect } from 'react'
import personService from './services/persons'
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
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    if(!newName || !newNumber){
      // TODO: add error message to UI
      return null;
    }
    const personAlreadyThere = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())
    if (!!personAlreadyThere) {
      const id = personAlreadyThere.id
      if (window.confirm(`${personAlreadyThere.name} is already added to phonebook. Replace the old number with the new one?`)){
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      } else {
        return null;
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
        })
      return null;
    }
  }

  const deletePerson = (event, oldPersonId) => {
    const clonePersons = [...persons]
    const personToDelete = clonePersons.find(person => person.id === oldPersonId)
    const filteredPersons = clonePersons.filter(person => person !== personToDelete)
    event.preventDefault()
    if(window.confirm(`Are you sure you want to delete ${personToDelete.name}`)){
      personService
        .destroy(oldPersonId)
        .then(response => setPersons(filteredPersons))
    } else {
      return null;
    }
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
      .filter(person => {
        if (!person.name){
          return null;
        }
        return person.name.toUpperCase().match(searchInput.toUpperCase())
      })
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
        <People
          people={renderPeople()}
          deletePerson={deletePerson}
        />
      </div>
    </div>
  )
}

export default App;
