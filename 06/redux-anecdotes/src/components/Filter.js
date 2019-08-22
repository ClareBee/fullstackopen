import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes, reset } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterAnecdotes(event.target.value)
  }

  const resetFilter = (event) => {
    event.target.value = ''
    props.reset()
  }
  const style = {
    marginBottom: '10px',
    fontSize: '20px'
  }

  return (
    <div style={style}>
      <strong>Filter:</strong> <input
        onChange={handleChange}
        onBlur={resetFilter} />
    </div>
  )
}

const matchDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(reset()),
    filterAnecdotes: value => {
      dispatch(filterAnecdotes(value))
    }
  }
}

export default connect(null, matchDispatchToProps)(Filter)
