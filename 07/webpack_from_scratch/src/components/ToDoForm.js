import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Message } from 'semantic-ui-react'

const ToDoForm = ({ addToDo }) => {
  const [newToDo, setNewToDo] = useState({ content: ''})
  const [error, setError] = useState("")

  const onChange = event => {
    event.preventDefault()
    setError("")
    setNewToDo({
      content: event.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(newToDo.content === "") {
      setError('Please enter something first')
      return
    }
    addToDo(newToDo);
    setNewToDo({ content: ''})
  }

  return (
    <Form onSubmit={onSubmit} error>
      <Form.Field>
        <label>New ToDo</label>
        <input placeholder='New ToDo' value={newToDo.content} onChange={(e) => onChange(e)} />
      </Form.Field>
      {error && <Message
        error
        header='Error'
        content={error}
      /> }
      <Button circular positive type='submit'>Submit</Button>
    </Form>
  )
}

ToDoForm.propTypes = {
  addToDo: PropTypes.func
}
export default ToDoForm
