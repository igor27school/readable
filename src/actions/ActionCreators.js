import * as ServerAPI from '../utils/ServerAPI'
import { buildComment, buildPost, buildEditComment, buildEditPost } from '../utils/Helper'
import * as Actions from './Actions'

export function createComment(parentPostId, values) {
  const comment = buildComment(parentPostId, values)
  return dispatch => ServerAPI.createComment(comment).then(createdComment => dispatch(Actions.receiveComment(createdComment)))
}

export function createPost(values) {
  const post = buildPost(values)
  return dispatch => ServerAPI.createPost(post).then(createdPost => dispatch(Actions.receivePost(createdPost)))
}

export function deleteObject(objectType, id) {
  return dispatch => ServerAPI.deleteObject(objectType, id).then(() => dispatch(Actions.removeObject(objectType, id)))
}

export function editComment(commentId, values) {
  const comment = buildEditComment(values)
  return dispatch => ServerAPI.editComment(commentId, comment).then(editedComment => dispatch(Actions.modifyComment(editedComment)))
}

export function editPost(postId, values) {
  const post = buildEditPost(values)
  return dispatch => ServerAPI.editPost(postId, post).then(editedPost => dispatch(Actions.receivePost(editedPost)))
}

export function fetchAllPostsFromServer() {
  return dispatch => ServerAPI.getAllPosts().then(posts => dispatch(Actions.receiveAllPosts(posts)))
}

export function fetchCategoriesFromServer() {
  return dispatch => ServerAPI.getCategories().then(categories => dispatch(Actions.receiveCategories(categories)))
}

export function fetchCategoryPostsFromServer(categoryPath) {
  return dispatch => ServerAPI.getCategoryPosts(categoryPath).then(posts => dispatch(Actions.receiveCategoryPosts(categoryPath, posts)))
}

export function fetchCommentFromServer(commentId) {
  return dispatch => ServerAPI.getComment(commentId).then(comment => dispatch(Actions.receiveComment(comment)))
}

export function fetchPostCommentsFromServer(postId) {
  return dispatch => ServerAPI.getPostComments(postId).then(comments => dispatch(Actions.receivePostComments(postId, comments)))
}

export function fetchPostFromServer(postId) {
  return dispatch => ServerAPI.getPost(postId).then(post => dispatch(Actions.receivePost(post)))
}

export function reSort(sortBy) {
  return dispatch => dispatch(Actions.changeSortOrder(sortBy))
}

export function vote(objectType, id, voteType) {
  return dispatch => ServerAPI.sendVote(objectType, id, voteType).then(object => dispatch(Actions.receiveVote(objectType, id, object.voteScore)))
}
