import React from 'react'
import PropTypes from 'prop-types'
import ToDoItem from './ToDoItem'
import { List } from 'semantic-ui-react'

const ToDoList = ({ toDos, removeToDo, toggleToDo }) => (
  <List>
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

ToDoList.propTypes = {
  toDos: PropTypes.array,
  removeToDo: PropTypes.func.isRequired,
  toggleToDo: PropTypes.func.isRequired
}

export default ToDoList;
