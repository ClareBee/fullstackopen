import React from 'react'

const Statistic = ({ title, value, percent }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{value} {percent ? '%' : ''}</td>
    </tr>
  )
}

export default Statistic
