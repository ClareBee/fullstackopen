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
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={submit}
    >
      <div className="mb-4">
        <Select
          value={selected}
          onChange={handleChange}
          options={formatOptions(props.authors)}
        />
      </div>
      <div className="mb-4">
        <label
          for="born"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Born:
        </label>
        <input
          id="born"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          value={born}
          onChange={({ target }) => setBorn(parseInt(target.value))}
        />
      </div>
      <button
        type="submit"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Author
      </button>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please make sure you're logged & try again</p>}
    </form>
  )
}

export default UpdateAuthor;
