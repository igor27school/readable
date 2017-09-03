import * as ServerAPI from '../utils/ServerAPI'

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS"
export const RECEIVE_CATEGORY_POSTS = "RECEIVE_CATEGORY_POSTS"
export const RECEIVE_POST = "RECEIVE_POST"
export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS"

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
})

export function fetchCategoriesFromServer() {
  return dispatch => ServerAPI.getCategories().then(categories => dispatch(receiveCategories(categories)))
}

export const receiveAllPosts = posts => ({
  type: RECEIVE_ALL_POSTS,
  posts,
})

export function fetchAllPostsFromServer() {
  return dispatch => ServerAPI.getAllPosts().then(posts => dispatch(receiveAllPosts(posts)))
}

export const receiveCategoryPosts = (categoryPath, posts) => ({
  type: RECEIVE_CATEGORY_POSTS,
  categoryPath,
  posts,
})

export function fetchCategoryPostsFromServer(categoryPath) {
  return dispatch => ServerAPI.getCategoryPosts(categoryPath).then(posts => dispatch(receiveCategoryPosts(categoryPath, posts)))
}

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  post,
})

export function fetchPostFromServer(postId) {
  return dispatch => ServerAPI.getPost(postId).then(post => dispatch(receivePost(post)))
}

export const receivePostComments = (postId, comments) => ({
  type: RECEIVE_POST_COMMENTS,
  postId,
  comments,
})

export function fetchPostCommentsFromServer(postId) {
  return dispatch => ServerAPI.getPostComments(postId).then(comments => dispatch(receivePostComments(postId, comments)))
}
