import React from 'react'

const People = ({people}) => (
  people.map((person, index) => <p key={person.name + person.index}>{person.name} | {person.number}</p>)
)

export default People
