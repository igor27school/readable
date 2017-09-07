import * as ServerAPI from '../utils/ServerAPI'
import { buildComment, buildPost, buildEditComment, buildEditPost } from '../utils/Helper'
import * as types from '../constants/ActionTypes'

const changeSortOrder = sortBy => ({
  type: types.CHANGE_SORT_ORDER,
  sortBy,
})

export function reSort(sortBy) {
  return dispatch => dispatch(changeSortOrder(sortBy))
}

const receiveCategories = categories => ({
  type: types.RECEIVE_CATEGORIES,
  categories,
})

export function fetchCategoriesFromServer() {
  return dispatch => ServerAPI.getCategories().then(categories => dispatch(receiveCategories(categories)))
}

const receiveAllPosts = posts => ({
  type: types.RECEIVE_ALL_POSTS,
  posts,
})

export function fetchAllPostsFromServer() {
  return dispatch => ServerAPI.getAllPosts().then(posts => dispatch(receiveAllPosts(posts)))
}

const receiveCategoryPosts = (categoryPath, posts) => ({
  type: types.RECEIVE_CATEGORY_POSTS,
  categoryPath,
  posts,
})

export function fetchCategoryPostsFromServer(categoryPath) {
  return dispatch => ServerAPI.getCategoryPosts(categoryPath).then(posts => dispatch(receiveCategoryPosts(categoryPath, posts)))
}

const receivePost = (post) => ({
  type: types.RECEIVE_POST,
  post,
})

export function fetchPostFromServer(postId) {
  return dispatch => ServerAPI.getPost(postId).then(post => dispatch(receivePost(post)))
}

const receivePostComments = (postId, comments) => ({
  type: types.RECEIVE_POST_COMMENTS,
  postId,
  comments,
})

export function fetchPostCommentsFromServer(postId) {
  return dispatch => ServerAPI.getPostComments(postId).then(comments => dispatch(receivePostComments(postId, comments)))
}

const receiveVote = (objectType, id, voteType) => ({
  type: types.RECEIVE_VOTE,
  objectType,
  id,
  voteType,
})

export function vote(objectType, id, voteType) {
  return dispatch => ServerAPI.sendVote(objectType, id, voteType).then(() => dispatch(receiveVote(objectType, id, voteType)))
}

const addPost = post => ({
  type: types.ADD_POST,
  post,
})

export function createPost(values) {
  const post = buildPost(values)
  return dispatch => ServerAPI.createPost(post).then(createdPost => dispatch(addPost(createdPost)))
}

const addComment = comment => ({
  type: types.ADD_COMMENT,
  comment,
})

export function createComment(parentPostId, values) {
  const comment = buildComment(parentPostId, values)
  return dispatch => ServerAPI.createComment(comment).then(createdComment => dispatch(addComment(createdComment)))
}

const removeObject = (objectType, id) => ({
  type: types.REMOVE_OBJECT,
  objectType,
  id,
})

export function deleteObject(objectType, id) {
  return dispatch => ServerAPI.deleteObject(objectType, id).then(() => dispatch(removeObject(objectType, id)))
}

const receiveComment = comment => ({
  type: types.RECEIVE_COMMENT,
  comment,
})

export function fetchCommentFromServer(commentId) {
  return dispatch => ServerAPI.getComment(commentId).then(comment => dispatch(receiveComment(comment)))
}

const modifyComment = comment => ({
  type: types.MODIFY_COMMENT,
  comment,
})

export function editComment(commentId, values) {
  const comment = buildEditComment(values)
  return dispatch => ServerAPI.editComment(commentId, comment).then(editedComment => dispatch(modifyComment(editedComment)))
}

const modifyPost = post => ({
  type: types.MODIFY_POST,
  post,
})

export function editPost(postId, values) {
  const post = buildEditPost(values)
  return dispatch => ServerAPI.editPost(postId, post).then(editedPost => dispatch(modifyPost(editedPost)))
}
