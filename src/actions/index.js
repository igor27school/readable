import * as ServerAPI from '../utils/ServerAPI'
import { buildComment, buildPost } from '../utils/Helper'

export const CHANGE_SORT_ORDER = "CHANGE_SORT_ORDER"
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS"
export const RECEIVE_CATEGORY_POSTS = "RECEIVE_CATEGORY_POSTS"
export const RECEIVE_POST = "RECEIVE_POST"
export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS"
export const RECEIVE_VOTE = "RECEIVE_VOTE"
export const ADD_POST = "ADD_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const REMOVE_OBJECT = "REMOVE_OBJECT"

const changeSortOrder = sortBy => ({
  type: CHANGE_SORT_ORDER,
  sortBy,
})

export function reSort(sortBy) {
  return dispatch => dispatch(changeSortOrder(sortBy))
}

const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
})

export function fetchCategoriesFromServer() {
  return dispatch => ServerAPI.getCategories().then(categories => dispatch(receiveCategories(categories)))
}

const receiveAllPosts = posts => ({
  type: RECEIVE_ALL_POSTS,
  posts,
})

export function fetchAllPostsFromServer() {
  return dispatch => ServerAPI.getAllPosts().then(posts => dispatch(receiveAllPosts(posts)))
}

const receiveCategoryPosts = (categoryPath, posts) => ({
  type: RECEIVE_CATEGORY_POSTS,
  categoryPath,
  posts,
})

export function fetchCategoryPostsFromServer(categoryPath) {
  return dispatch => ServerAPI.getCategoryPosts(categoryPath).then(posts => dispatch(receiveCategoryPosts(categoryPath, posts)))
}

const receivePost = (post) => ({
  type: RECEIVE_POST,
  post,
})

export function fetchPostFromServer(postId) {
  return dispatch => ServerAPI.getPost(postId).then(post => dispatch(receivePost(post)))
}

const receivePostComments = (postId, comments) => ({
  type: RECEIVE_POST_COMMENTS,
  postId,
  comments,
})

export function fetchPostCommentsFromServer(postId) {
  return dispatch => ServerAPI.getPostComments(postId).then(comments => dispatch(receivePostComments(postId, comments)))
}

const receiveVote = (objectType, id, voteType) => ({
  type: RECEIVE_VOTE,
  objectType,
  id,
  voteType,
})

export function vote(objectType, id, voteType) {
  return dispatch => ServerAPI.sendVote(objectType, id, voteType).then(() => dispatch(receiveVote(objectType, id, voteType)))
}

const addPost = post => ({
  type: ADD_POST,
  post,
})

export function createPost(values) {
  const post = buildPost(values)
  return dispatch => ServerAPI.createPost(post).then(createdPost => dispatch(addPost(createdPost)))
}

const addComment = comment => ({
  type: ADD_COMMENT,
  comment,
})

export function createComment(parentPostId, values) {
  const comment = buildComment(parentPostId, values)
  return dispatch => ServerAPI.createComment(comment).then(createdComment => dispatch(addComment(createdComment)))
}

const removeObject = (objectType, id) => ({
  type: REMOVE_OBJECT,
  objectType,
  id,
})

export function deleteObject(objectType, id) {
  return dispatch => ServerAPI.deleteObject(objectType, id).then(() => dispatch(removeObject(objectType, id)))
}
