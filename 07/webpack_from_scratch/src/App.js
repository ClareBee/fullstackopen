import React, { useState, useEffect } from 'react'
import PromisePolyfill from 'promise-polyfill'
import toDoService from './services/toDoService'
import ToDoList from './components/ToDoList'
import ToDoForm from './components/ToDoForm'
import { Container, Divider, Segment, Reveal, Image } from 'semantic-ui-react'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

const App = () => {
  const [toDos, setToDos] = useState([])

  useEffect(() => {
    toDoService
      .getAll()
      .then(initialToDos => setToDos(initialToDos))
  }, [])

  const addToDo = toDo => {
   event.preventDefault()
   const toDoObject = {
     content: toDo.content,
     id: toDos.length + 1,
     done: false
   }
   toDoService
     .create(toDoObject)
     .then(data => {
       setToDos(toDos.concat(data))
     })
     .catch(err => console.log(err))
  }

  const removeToDo = toDoId => {
    toDoService.destroy(toDoId)
      .then(response => {
        console.log(response)
        setToDos(toDos.filter(savedToDo => savedToDo.id !== toDoId))
      })
  }

  const toggleToDo = toDoId => {
    const toDo = toDos.find(toDo => toDo.id === toDoId)
    const updatedToDo = {
      ...toDo,
      done: !toDo.done
    }
    toDoService.update(toDo.id, updatedToDo)
      .then(returnedToDo => {
        const updated = toDos.map(savedToDo => savedToDo.id === toDo.id ? savedToDo : returnedToDo)
        setToDos(updated)
      })
  }

  return (
    <Container>
      <h1 className="ui header">Webpack-From-Scratch</h1>
      <Divider />
      <Segment>Small app to explore setting up Webpack</Segment>
      <Reveal animated='fade'>
        <Reveal.Content visible>
          <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' />
        </Reveal.Content>
        <Reveal.Content hidden>
          <Image src='https://react.semantic-ui.com/images/avatar/large/ade.jpg' size='small' />
        </Reveal.Content>
      </Reveal>
      <ToDoForm addToDo={addToDo} />
      <ToDoList toDos={toDos} removeToDo={removeToDo} toggleToDo={toggleToDo} />
    </Container>
  )
}

export default App
