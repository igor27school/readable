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

export const receiveCategoryPosts = (categoryPath, posts) => ({
  type: RECEIVE_CATEGORY_POSTS,
  categoryPath,
  posts,
})

export const fetchCategoryPostsFromServer = (categoryPath) => dispatch => (
  ServerAPI.getCategoryPosts(categoryPath).then(posts => dispatch(receiveCategoryPosts(categoryPath, posts)))
)

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  post,
})

export const fetchPostFromServer = (postId) => dispatch => (
  ServerAPI.getPost(postId).then(post => dispatch(receivePost(post)))
)

export const receivePostComments = (postId, comments) => ({
  type: RECEIVE_POST_COMMENTS,
  postId,
  comments,
})

export const fetchPostCommentsFromServer = (postId) => dispatch => (
  ServerAPI.getPostComments(postId).then(comments => dispatch(receivePostComments(postId, comments)))
)
