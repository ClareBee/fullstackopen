import React from 'react'

const People = ({people, deletePerson}) => (
  people.map((person, index) =>
    <div className="person" key={person.name + person.index}>
      <div>
        <strong>{person.name} | {person.number}</strong>
      </div>
      <button
        onClick={(e) => deletePerson(e, person.id)}
        className="delete"
      >
        Delete
      </button>
    </div>
  )
)

export default People
