import React from 'react'

const People = ({people}) => (
  people.map(person => <p>{person.name} | {person.number}</p>)
)

export default People
