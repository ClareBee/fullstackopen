import React from 'react'

const People = ({people, deletePerson}) => (
  people.map((person, index) =>
    <div key={person.name + person.index}>
      <p>
        {person.name} | {person.number}
      </p>
      <button onClick={(e) => deletePerson(e, person.id)}>Delete</button>
    </div>
  )
)

export default People
