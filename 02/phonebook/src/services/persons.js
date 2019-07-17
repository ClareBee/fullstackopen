import axios from 'axios'
// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  console.log(newPerson)
  return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
  return request.then(response => response.data)
}

const destroy = oldPersonId => {
  const request = axios.delete(`${baseUrl}/${oldPersonId}`)
  return request.then(response => response.data)
}
export default { getAll, create, update, destroy }
