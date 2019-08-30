import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const { data } = await axios.post(baseUrl, blog, config)
    return { data }
  } catch(err){
    return  { error: err.response.data.error }
  }
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const { data } = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
    return { data }
  } catch(err){
    return  { error: err.response.data.error }
  }
}

const destroy = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const { data } = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return { data }
  } catch(err) {
    return { error: err.response.data.error }
  }
}

export default { getAll, setToken, create, update, destroy }
