import { combineReducers } from 'redux'
import {
  compare,
  SORT_BY_SCORES,
  SORT_BY_TIMESTAMPS,
  POST_TYPE,
  COMMENT_TYPE,
  VOTE_UP,
} from '../utils/Helper'
import {
  CHANGE_SORT_ORDER,
  RECEIVE_CATEGORIES,
  RECEIVE_ALL_POSTS,
  RECEIVE_CATEGORY_POSTS,
  RECEIVE_POST,
  RECEIVE_POST_COMMENTS,
  RECEIVE_VOTE,
} from '../actions'

function categories(state={}, action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return {
        byId: action.categories.reduce((categories, category) => {
          categories[category.path] = category
          return categories
        }, {})
      }
    case RECEIVE_ALL_POSTS:
      const categorizedPosts = action.posts.reduce((categories, post) => {
        categories[post.category] = categories[post.category] ? categories[post.category].concat(post): [post]
        return categories
      }, {})
      return {
        ...state,
        postsByScore: action.posts.sort(compare(SORT_BY_SCORES)).map(post => post.id),
        postsByTimestamp: action.posts.sort(compare(SORT_BY_TIMESTAMPS)).map(post => post.id),
        byId: Object.keys(state.byId).reduce((categories, category) => {
          categories = {
            ...categories,
            [category]: {
              ...categories[category],
              postsByScore: (category in categorizedPosts) ? categorizedPosts[category].sort(compare(SORT_BY_SCORES)).map(post => post.id) : [],
              postsByTimestamp: (category in categorizedPosts) ? categorizedPosts[category].sort(compare(SORT_BY_TIMESTAMPS)).map(post => post.id) : [],
            }
          }
          return categories
        }, state.byId),
        hasAllPosts: true
      }
    case RECEIVE_CATEGORY_POSTS:
      // If the provided category is not one of the categories, ignore it
      if (!state.byId[action.categoryPath]) {
        return state
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.categoryPath]: {
            ...state.byId[action.categoryPath],
            postsByScore: action.posts.sort(compare(SORT_BY_SCORES)).map(post => post.id),
            postsByTimestamp: action.posts.sort(compare(SORT_BY_TIMESTAMPS)).map(post => post.id),
          }
        }
      }
    default:
      return state
  }
}

function posts(state={}, action) {
  switch(action.type) {
    case RECEIVE_ALL_POSTS:
    case RECEIVE_CATEGORY_POSTS:
      return {
        ...state,
        byId: action.posts.reduce((byId, post) => {
            byId[post.id] = post
            return byId
          }, state.byId ? state.byId : {})
      }
    case RECEIVE_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: action.post
        }
      }
    case RECEIVE_POST_COMMENTS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.postId]: {
            ...state.byId[action.postId],
            commentsByScore: action.comments.sort(compare(SORT_BY_SCORES)).map(comment => comment.id),
            commentsByTimestamp: action.comments.sort(compare(SORT_BY_TIMESTAMPS)).map(comment => comment.id),
          }
        }
      }
    case RECEIVE_VOTE:
      if (action.componentType !== POST_TYPE) {
        return state
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            voteScore: action.voteType === VOTE_UP ? state.byId[action.id].voteScore + 1 : state.byId[action.id].voteScore - 1,
          }
        }
      }
    default:
      return state
  }
}

function comments(state={}, action) {
  switch(action.type) {
    case RECEIVE_POST_COMMENTS:
      return {
        ...state,
        byId: action.comments.reduce((byId, comment) => {
            byId[comment.id] = comment
            return byId
          }, state.byId ? state.byId : {}),
      }
    case RECEIVE_VOTE:
      if (action.componentType !== COMMENT_TYPE) {
        return state
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            voteScore: action.voteType === VOTE_UP ? state.byId[action.id].voteScore + 1 : state.byId[action.id].voteScore - 1,
          }
        }
      }
    default:
      return state
  }
}

function sortOrder(state=SORT_BY_SCORES, action) {
  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return action.sortBy
    default:
      return state
  }
}

export default combineReducers({categories, posts, comments, sortOrder})
