import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'
import Filter from './components/filter'
import PersonForm from './components/person_form'
import People from './components/people'
import Notification from './components/notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchInput, setSearchInput ] = useState('')
  const [ message, setMsg ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
      })
  }, [])

  const notify = (type, content) => {
    setMsg({ type, content })
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }

  const reset = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    if(!newName || !newNumber){
      notify('error', 'Please enter all requested info')
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
            notify('success', `${newName} successfully updated`)
            reset()
          })
          .catch(err => {
            notify('error', `${newName} was already deleted!`)
            reset()
          })
      } else {
        return null;
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(personObject))
          notify('success', `${personObject.name} was added successfully!`)
          reset()
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
        .catch(err => {
          notify('error', `${personToDelete.name} was already removed!`)
        })
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
      <Notification message={message} />
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
