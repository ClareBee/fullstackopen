import React from 'react'

const ResultItem = ({ country, switchView }) => {
  return (<li className="country-list">
    {country.name}
    <button value={country.name} onClick={(e) => switchView(e)}>SHOW</button>
  </li>)
}

export default ResultItem
