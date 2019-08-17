import React from 'react'
import { filterAnecdotes, reset } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleChange = (event) => {
    store.dispatch(filterAnecdotes(event.target.value))
  }

  const resetFilter = (event) => {
    event.target.value = ''
    store.dispatch(reset())
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input
        onChange={handleChange}
        onBlur={resetFilter} />
    </div>
  )
}

export default Filter
