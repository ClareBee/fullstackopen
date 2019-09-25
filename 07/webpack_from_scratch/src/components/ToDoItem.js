import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, List, Segment, Button, Checkbox, Confirm } from 'semantic-ui-react'

const ToDoItem = ({ toDo, removeToDo, toggleToDo }) => {
  const [confirm, setConfirm] = useState(false);

  const handleDelete = (toDoId) => {
    removeToDo(toDoId)
  }

  const close = () => {
    setConfirm(false)
  }
  const open = () => {
    setConfirm(true)
  }

  return (
    <List.Item>
      <Segment>
        <Icon name="pencil" />
        <List.Content>
          <List.Header>{toDo.content}</List.Header>
        </List.Content>
        <Checkbox label="done?" onChange={() => toggleToDo(toDo.id)} checked={toDo.done}/>
        <Button onClick={open}>Delete</Button>
        <Confirm
          open={confirm}
          onCancel={close}
          onConfirm={() => handleDelete(toDo.id)}
        />
      </Segment>
    </List.Item>
  )
};

ToDoItem.propTypes = {
  toDo: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.number,
    done: PropTypes.boolean
  }),
  removeToDo: PropTypes.func,
  toggleToDo: PropTypes.func
}

export default ToDoItem
