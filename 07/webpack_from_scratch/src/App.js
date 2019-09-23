import React, { useState, useEffect } from 'react'
import PromisePolyfill from 'promise-polyfill'
import toDoservice from './services/toDoservice'
import ToDoList from './components/ToDoList'
import ToDoForm from './components/ToDoForm'
import { Container, Divider, Segment, Reveal, Image } from 'semantic-ui-react'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const [toDos, settoDos] = useState([])

  useEffect(() => {
    toDoservice
      .getAll()
      .then(initialtoDos => settoDos(initialtoDos))
  }, [])

  const addToDo = (toDo) => {
   event.preventDefault()
   const toDoObject = {
     content: toDo.content,
     id: toDos.length + 1,
     done: false
   }
   toDoservice
     .create(toDoObject)
     .then(data => {
       console.log('data', data)
       settoDos(toDos.concat(data))
     })
     .catch(err => console.log(err))
  }

  const removeToDo = (toDoId) => {
    toDoservice.destroy(toDoId)
      .then(response => {
        settoDos(toDos.filter(savedToDo => savedToDo.id !== toDoId))
      })
  }

  const toggleDone = (toDo) => {
    const updatedToDo = {
      ...toDo,
      done: !toDo.done
    }
    toDoservice.update(toDo.id, updatedToDo)
      .then(returnedToDo => {
        const updated = toDos.map(savedToDo => savedToDo.id === toDo.id ? savedToDo : returnedToDo)
        settoDos(updated)
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
      <ToDoList toDos={toDos} removeToDo={removeToDo} />
    </Container>
  )
}

export default App
