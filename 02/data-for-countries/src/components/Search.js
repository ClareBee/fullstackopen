import React from 'react'

const Search = (props) => (
  <input onChange={props.handleInput} value={props.searchInput} />
)

export default Search
