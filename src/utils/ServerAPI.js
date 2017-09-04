import { POST_TYPE, VOTE_UP } from '../utils/Helper'

const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:5001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getCategoryPosts = categoryPath =>
  fetch(`${api}/${categoryPath}/posts`, { headers })
    .then(res => res.json())

export const getPost = postId =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())

export const getPostComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const sendVote = (componentType, id, voteType) => {
  const component = componentType === POST_TYPE ? 'posts' : 'comments'
  return fetch(`${api}/${component}/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: voteType === VOTE_UP ? 'upVote' : 'downVote'})
  }).then(res => res.json())
}
