import React from 'react'

const Statistic = ({ title, value, percent }) => {
  return (
    <p>{title} {value} {percent ? '%' : ''}</p>
  )
}

export default Statistic
