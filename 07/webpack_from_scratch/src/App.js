import React, { useState, useEffect } from 'react'
import PromisePolyfill from 'promise-polyfill'
import toDoService from './services/toDoService'
import ToDoList from './components/ToDoList'
import ToDoForm from './components/ToDoForm'
import { Header, Container, Divider, Grid, Reveal, Image, Statistic } from 'semantic-ui-react'
import image from './assets/getitdone.jpg'

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
     id: Date.now(),
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
        const updated = toDos.map(savedToDo => savedToDo.id !== toDo.id ? savedToDo : returnedToDo)
        setToDos(updated)
      })
  }

  return (
    <Container text>
      <Divider />
      <Header as="h2">
        Webpack-From-Scratch
        <Header.Subheader>
          Small app to explore setting up React with Webpack, Babel & ESLint
        </Header.Subheader>
      </Header>
      <Divider />
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            <Reveal animated='fade'>
              <Reveal.Content visible>
                <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Image src={image} size='small' />
              </Reveal.Content>
            </Reveal>
          </Grid.Column>
          <Grid.Column floated="right" width={3}>
            <Statistic.Group>
              <Statistic>
                <Statistic.Value>{toDos.length}</Statistic.Value>
                <Statistic.Label>ToDos</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <ToDoForm addToDo={addToDo} />
      <Divider />
      <ToDoList toDos={toDos} removeToDo={removeToDo} toggleToDo={toggleToDo} />
    </Container>
  )
}

export default App
