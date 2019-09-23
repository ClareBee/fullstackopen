import React from 'react'
import { Icon, List, Segment, Button } from 'semantic-ui-react'

const ToDoItem = ({ toDo, removeToDo }) => (
  <List.Item>
    <Segment>
      <Icon name="pencil" />
      <List.Content>
        <List.Header>{toDo.content}</List.Header>
      </List.Content>
      <Button onClick={() => removeToDo(toDo.id)}>Delete</Button>
    </Segment>
  </List.Item>
);

export default ToDoItem;
