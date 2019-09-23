import React from 'react'
import ToDoItem from './ToDoItem'
import { Image, List } from 'semantic-ui-react'

const ToDoList = ({ toDos, removeToDo }) => (
  <List divided verticalAlign='middle'>
  {toDos.map(toDo => (
    <ToDoItem key={toDo.id} toDo={toDo} removeToDo={removeToDo} />
  ))}
  </List>
);

export default ToDoList;
