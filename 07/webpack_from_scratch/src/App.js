import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PromisePolyfill from 'promise-polyfill'
import ToDoList from './components/ToDoList'
import ToDoForm from './components/ToDoForm'
import { Container, Divider, Segment, Reveal, Image } from 'semantic-ui-react'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const [todos, setTodos] = useState([])

  const todosUrl = 'http://localhost:3004/todos'

  useEffect(() => {
    axios.get(todosUrl).then(response => {
      setTodos(response.data)
    })
  }, [])

  const addToDo = (toDo) => {
    console.log(toDo)
    axios
      .post('http://localhost:3004/todos', toDo)
      .then(response => {
        console.log(response)
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
      <ToDoList todos={todos}/>
    </Container>
  )
}

export default App
