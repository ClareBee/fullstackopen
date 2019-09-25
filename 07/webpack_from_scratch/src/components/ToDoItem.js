import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, List, Segment, Grid, Button, Checkbox, Confirm, Divider } from 'semantic-ui-react'

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
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={10}>
            <List.Header>
              <Icon name="pencil" />
              <h4 style={{textDecoration: toDo.done ? 'line-through' : ''}}>{toDo.content}</h4>
            </List.Header>
            <Divider />
            <Checkbox label="done?" onChange={() => toggleToDo(toDo.id)} checked={toDo.done}/>
          </Grid.Column>
          <Grid.Column floated="right" width={3}>
            <Button circular negative onClick={open}>Delete</Button>
            <Confirm
              open={confirm}
              onCancel={close}
              onConfirm={() => handleDelete(toDo.id)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
