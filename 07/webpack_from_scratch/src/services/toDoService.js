import axios from 'axios'
const baseUrl = 'http://localhost:3004/toDos'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = axios.post(baseUrl, newObject, config)
  return response.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const destroy = (id) => {
  const request = axios.delete(`${ baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken, destroy }
