import React from 'react'

const PersonForm = (props) => (
  <form
    onSubmit={props.addPerson}>
    <div className="form-input">
      Name: <input
        value={props.newName}
        onChange={props.handleNameChange}/>
    </div>
    <div className="form-input">
      Number: <input
        value={props.newNumber}
        onChange={props.handleNumberChange}/>
    </div>
    <div>
      <button type="submit">ADD</button>
    </div>
  </form>
)

export default PersonForm
