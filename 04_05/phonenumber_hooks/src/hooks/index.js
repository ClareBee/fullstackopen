import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const inputValues = () => {
    return { type, value, onChange }
  }

  return {
    type,
    value,
    onChange,
    reset,
    inputValues
  }
}

export const useResource = (resourceUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const request = await axios.get(resourceUrl)
    setResources(request.data)
  }

  const create = async newObject => {
    const response = await axios.post(resourceUrl, newObject)
    const updatedResources = [...resources, response.data]
    setResources(updatedResources)
  }

  const service = {
   create,
   getAll
  }

  return [
    resources, service
  ]
}
