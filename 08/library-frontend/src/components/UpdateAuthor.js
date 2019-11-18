import React, { useState } from 'react'
import Select from 'react-select'
import { ALL_AUTHORS } from '../graphql/queries'
import { UPDATE_AUTHOR } from '../graphql/mutations'
import { useMutation } from '@apollo/react-hooks'

const UpdateAuthor = (props) => {
  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState('')

  const [updateAuthor, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_AUTHOR,
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
          type="number"
          value={born}
          onChange={({ target }) => setBorn(parseInt(target.value))}
        />
      </div>
      <button type="submit">Update Author</button>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please make sure you're logged & try again</p>}
    </form>
  )
}

export default UpdateAuthor;
