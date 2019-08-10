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
  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = () => {
    const request = axios.get(resourceUrl)
    return request.then(response => response.data)
  }

  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(resourceUrl, newObject, config)
    return response.data
  }

  const update = (id, newObject) => {
    const request = axios.put(`${ resourceUrl } /${id}`, newObject)
    return request.then(response => response.data)
  }

  return {
    getAll,
    create,
    update,
    setToken
  }
}
