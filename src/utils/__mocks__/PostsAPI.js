// __mocks__/PostsAPI.js

const PostsAPI = jest.genMockFromModule('./PostsAPI')

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

PostsAPI.getCategories = () => Promise.resolve(categories)

module.exports = PostsAPI
