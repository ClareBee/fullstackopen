import React from 'react'
import PropTypes from 'prop-types'
import ToDoItem from './ToDoItem'
import { List } from 'semantic-ui-react'

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

ToDoList.propTypes = {
  toDos: PropTypes.array,
  removeToDo: PropTypes.function,
  toggleToDo: PropTypes.function
}

export default ToDoList;
