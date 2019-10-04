import React, { useState } from 'react'
import Select from 'react-select'

import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(name: $name, setBornTo: $setBornTo){
      name
      born
    }
  }
`;

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
  }
}
`

const UpdateAuthor = (props) => {
  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR,
    {
      refetchQueries: [{ query: ALL_AUTHORS }]
    }
  )

  const handleChange = selected => {
    setSelected(selected)
  }

  const submit = e => {
    e.preventDefault()
    console.log(selected)
    updateAuthor({ variables: { setBornTo: born, name: selected.value }})
    setSelected('')
    setBorn('')
  }

  const formatOptions = options => {
    return options.map(option => {
      return {
        value: option.name, label: option.name
      }
    })
  }

  return (
    <form
      onSubmit={submit}
    >
      <Select
        value={selected}
        onChange={handleChange}
        options={formatOptions(props.authors)}
      />
      <div>
        <label>Born:</label>
        <input
          type ='number'
          value={born}
          onChange={({ target }) => setBorn(parseInt(target.value))}
        />
      </div>
      <button type='submit'>Update Author</button>
    </form>
  )
}

export default UpdateAuthor;
