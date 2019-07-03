import React from 'react'

const Filter = (props) => (
  <React.Fragment>
  <label>Filter shown with:</label>
  <input className="form-input" onChange={props.showNames} value={props.searchInput}/>
  </React.Fragment>
)

export default Filter
