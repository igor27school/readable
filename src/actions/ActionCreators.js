import * as ServerAPI from '../utils/ServerAPI'
import { buildComment, buildPost, buildEditComment, buildEditPost } from '../utils/Helper'
import * as Actions from './Actions'

export function createComment(parentPostId, values) {
  const comment = buildComment(parentPostId, values)
  return dispatch => ServerAPI.createComment(comment).then(createdComment => dispatch(Actions.receiveComment(createdComment))).catch(err => console.error(err))
}

export function createPost(values) {
  const post = buildPost(values)
  return dispatch => ServerAPI.createPost(post).then(createdPost => dispatch(Actions.receivePost(createdPost))).catch(err => console.error(err))
}

export function deleteObject(objectType, id) {
  return dispatch => ServerAPI.deleteObject(objectType, id).then(() => dispatch(Actions.removeObject(objectType, id))).catch(err => console.error(err))
}

export function editComment(commentId, values) {
  const comment = buildEditComment(values)
  return dispatch => ServerAPI.editComment(commentId, comment).then(editedComment => dispatch(Actions.modifyComment(editedComment))).catch(err => console.error(err))
}

export function editPost(postId, values) {
  const post = buildEditPost(values)
  return dispatch => ServerAPI.editPost(postId, post).then(editedPost => dispatch(Actions.modifyPost(editedPost))).catch(err => console.error(err))
}

export function fetchAllPostsFromServer() {
  return dispatch => ServerAPI.getAllPosts().then(posts => dispatch(Actions.receiveAllPosts(posts))).catch(err => console.error(err))
}

export function fetchCategoriesFromServer() {
  return dispatch => ServerAPI.getCategories().then(categories => {
      dispatch(Actions.receiveCategories(categories))
      return categories
  }).catch(err => console.error(err))
}

export function fetchCategoryPostsFromServer(categoryPath) {
  return dispatch => ServerAPI.getCategoryPosts(categoryPath).then(posts => dispatch(Actions.receiveCategoryPosts(categoryPath, posts))).catch(err => console.error(err))
}

export function fetchCommentFromServer(commentId) {
  return dispatch => ServerAPI.getComment(commentId).then(comment => dispatch(Actions.receiveComment(comment))).catch(err => console.error(err))
}

export function fetchPostCommentsFromServer(postId) {
  return dispatch => ServerAPI.getPostComments(postId).then(comments => dispatch(Actions.receivePostComments(postId, comments))).catch(err => console.error(err))
}

export function fetchPostFromServer(postId) {
  return dispatch => ServerAPI.getPost(postId).then(post => dispatch(Actions.receivePost(post))).catch(err => console.error(err))
}

export function reSort(sortBy) {
  return dispatch => dispatch(Actions.changeSortOrder(sortBy))
}

export function vote(objectType, id, voteType) {
  return dispatch => ServerAPI.sendVote(objectType, id, voteType).then(object => dispatch(Actions.receiveVote(objectType, id, object.voteScore))).catch(err => console.error(err))
}
