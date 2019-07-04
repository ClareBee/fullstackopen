import React from 'react'

const People = ({people}) => (
  people.map(person => <p key={person.name}>{person.name} | {person.number}</p>)
)

export default People