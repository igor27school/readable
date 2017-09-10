// __mocks__/ServerAPI.js

const ServerAPI = jest.genMockFromModule('./ServerAPI')

const categories = [
  {
    path: 'category1',
    name: 'category 1',
  },
  {
    path: 'category2',
    name: 'category 2',
  },
]

const posts = [
  {
    id: 'post1',
    title: 'post1 title',
    body: 'post1 body',
    author: 'post1 author',
    category: 'category1',
    timestamp: 123456,
    deleted: false,
  },
  {
    id: 'post2',
    title: 'post2 title',
    body: 'post2 body',
    author: 'post2 author',
    category: 'category1',
    timestamp: 123457,
    deleted: false,
  },
]

const comments = [
  {
    id: 'comment1',
    author: 'comment1 author',
    body: 'comment1 body',
    parentId: 'post1'
  },
  {
    id: 'comment2',
    author: 'comment2 author',
    body: 'comment2 body',
    parentId: 'post1',
  },
]

ServerAPI.getCategories = () => Promise.resolve(categories)
ServerAPI.getAllPosts = () => Promise.resolve(posts)
ServerAPI.getPostComments = () => Promise.resolve(comments)

module.exports = ServerAPI
