import React from 'react'
import PropTypes from 'prop-types'
import { Icon, List, Segment, Button, Checkbox } from 'semantic-ui-react'

const ToDoItem = ({ toDo, removeToDo, toggleToDo }) => (
  <List.Item>
    <Segment>
      <Icon name="pencil" />
      <List.Content>
        <List.Header>{toDo.content}</List.Header>
      </List.Content>
      <Checkbox label="done?" onChange={() => toggleToDo(toDo.id)} checked={toDo.done}/>
      <Button onClick={() => removeToDo(toDo.id)}>Delete</Button>
    </Segment>
  </List.Item>
);

ToDoItem.propTypes = {
  toDo: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string,
    done: PropTypes.boolean
  }),
  removeToDo: PropTypes.function.isRequired,
  toggleToDo: PropTypes.function.isRequired
}

export default ToDoItem
