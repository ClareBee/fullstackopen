import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = { name: newName }
    const namesArray = persons.map(person => person.name)
    if (namesArray.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const renderNumbers = () => {
    return persons.map(person => <p>{person.name}</p>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {renderNumbers()}
      </div>
    </div>
  )
}

export default App;
