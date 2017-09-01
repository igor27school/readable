import * as ServerAPI from '../utils/ServerAPI'

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS"
export const RECEIVE_CATEGORY_POSTS = "RECEIVE_CATEGORY_POSTS"

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
})

export const fetchCategoriesFromServer = () => dispatch => (
  ServerAPI.getCategories().then(categories => dispatch(receiveCategories(categories)))
)

export const receiveAllPosts = posts => ({
  type: RECEIVE_ALL_POSTS,
  posts,
})

export const fetchAllPostsFromServer = () => dispatch => (
  ServerAPI.getAllPosts().then(posts => dispatch(receiveAllPosts(posts)))
)

export const receiveCategoryPosts = (category_path, posts) => ({
  type: RECEIVE_CATEGORY_POSTS,
  category_path,
  posts,
})

export const fetchCategoryPostsFromServer = (category_path) => dispatch => (
  ServerAPI.getCategoryPosts(category_path).then(posts => dispatch(receiveCategoryPosts(category_path, posts)))
)
