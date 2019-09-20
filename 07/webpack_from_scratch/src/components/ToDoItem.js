import React from 'react'
import { Icon, List, Segment } from 'semantic-ui-react'

const ToDoItem = ({ todo }) => (
  <List.Item>
    <Segment>
      <Icon name="pencil" />
      <List.Content>
        <List.Header>{todo.content}</List.Header>
      </List.Content>
      </Segment>
  </List.Item>
);

export default ToDoItem;
