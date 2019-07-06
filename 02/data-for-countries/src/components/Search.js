import React from 'react'

const Search = (props) => (
  <input onChange={(e) => props.handleInput(e)} value={props.searchInput} />
)

export default Search
