import React from 'react'
import ToDoItem from './ToDoItem'
import { Image, List } from 'semantic-ui-react'

const ToDoList = ({ todos }) => (
  <List divided verticalAlign='middle'>
  {todos.map(todo => (
    <ToDoItem key={todo.id} todo={todo} />
  ))}
  </List>
);

export default ToDoList;
