import React from 'react'
import ToDoItem from './ToDoItem'
import { Image, List } from 'semantic-ui-react'

const ToDoList = ({ toDos, removeToDo, toggleToDo }) => (
  <List divided verticalAlign='middle'>
  {toDos.map(toDo => (
    <ToDoItem
      key={toDo.id}
      toDo={toDo}
      removeToDo={removeToDo}
      toggleToDo={toggleToDo}
    />
  ))}
  </List>
);

export default ToDoList;
