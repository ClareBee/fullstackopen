import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

const ToDoForm = ({ addToDo }) => {
  const [newToDo, setNewToDo] = useState({})

  const onChange = event => {
    event.preventDefault()
    setNewToDo({
      content: event.target.value
    })
  }

  const onSubmit = () => {
    addToDo(newToDo);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label>Content</label>
        <input placeholder='New ToDo' onChange={(e) => onChange(e)} />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

ToDoForm.propTypes = {
  addToDo: PropTypes.func
}
export default ToDoForm
