import * as types from '../constants/ActionTypes'

export const changeSortOrder = sortBy => ({
  type: types.CHANGE_SORT_ORDER,
  sortBy,
})

export const modifyComment = comment => ({
  type: types.MODIFY_COMMENT,
  comment,
})

export const receiveAllPosts = posts => ({
  type: types.RECEIVE_ALL_POSTS,
  posts,
})

export const receiveCategories = categories => ({
  type: types.RECEIVE_CATEGORIES,
  categories,
})

export const receiveCategoryPosts = (categoryPath, posts) => ({
  type: types.RECEIVE_CATEGORY_POSTS,
  categoryPath,
  posts,
})

export const receiveComment = comment => ({
  type: types.RECEIVE_COMMENT,
  comment,
})

export const receivePost = (post) => ({
  type: types.RECEIVE_POST,
  post,
})

export const receivePostComments = (postId, comments) => ({
  type: types.RECEIVE_POST_COMMENTS,
  postId,
  comments,
})

export const receiveVote = (objectType, id, score) => ({
  type: types.RECEIVE_VOTE,
  objectType,
  id,
  score,
})

export const removeObject = (objectType, id) => ({
  type: types.REMOVE_OBJECT,
  objectType,
  id,
})
