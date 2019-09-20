import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'

const ToDoForm = (props) => {
  const [newToDo, setNewToDo] = useState({})

  const onChange = event => {
    event.preventDefault()
    setNewToDo({
      content: event.target.value
    })
  }

  const onSubmit = () => {
    props.addToDo(newToDo);
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

export default ToDoForm;
