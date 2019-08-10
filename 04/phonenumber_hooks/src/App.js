import React, { useEffect } from 'react'
import { useField, useResource } from './hooks'
import './App.css'


const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    noteService
      .getAll()
    personService
      .getAll()
  }, [])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div className="container">
      <h1>Custom Hooks Example</h1>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.inputValues()} />
        <button>Create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}
      <hr />
      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <label>Name</label> <input {...name.inputValues()} /> <br/>
        <label>Number</label> <input {...number.inputValues()} />
        <button>Create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
