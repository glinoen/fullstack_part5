import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (likedBlog) => {
  const response = await axios.put(`${baseUrl}/${likedBlog.id}`, 
  {
    user: likedBlog.user._id,
    likes: likedBlog.likes,
    author: likedBlog.author,
    title: likedBlog.title,
    url: likedBlog.url
  })
  return response.data
}

const destroy = async (blogToBeRemoved) => {
  const config = {
    headers: { 'Authorization': token}
  }
  const response = await axios.delete(`${baseUrl}/${blogToBeRemoved.id}`, config)
  return response.data
}


export default { getAll, setToken, create, like, destroy}