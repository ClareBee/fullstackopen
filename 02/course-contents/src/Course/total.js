import React from 'react'

const Total = ({total}) =>
  <h3>Total of {total} {total > 1 ? 'courses' : 'course'}</h3>

export default Total
