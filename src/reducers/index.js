import { combineReducers } from 'redux'
import {
  SORT_BY_SCORES,
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
  ADD_COMMENT,
  ADD_POST,
  REMOVE_OBJECT,
} from '../actions'

function initializedIfNeededState(state) {
  return state.byId ? state : {
    byId: {},
    allIds: [],
  }
}

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
        categories[post.category] = categories[post.category] ? categories[post.category].concat([post]): [post]
        return categories
      }, {})
      return {
        ...state,
        byId: Object.keys(state.byId).reduce((categories, category) => {
          categories = {
            ...categories,
            [category]: {
              ...categories[category],
              posts: (category in categorizedPosts) ? categorizedPosts[category].map(post => post.id) : [],
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
            posts: action.posts.map(post => post.id),
          }
        }
      }
    case ADD_POST:
      const categoryPath = action.post.category
      return {
        ...state,
        byId: {
          ...state.byId,
          [categoryPath]: {
            ...state.byId[categoryPath],
            posts: state.byId[categoryPath].posts ? state.byId[categoryPath].posts.concat([action.post.id]) : [action.post.id],
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
      return action.posts.reduce((state, post) => {
        if (!(post.id in state.byId)) {
          state.byId[post.id] = post
          state.allIds = state.allIds.concat([post.id])
        }
        return state
      }, state.byId ? state : {byId: {}, allIds:[]})
    case RECEIVE_POST:
      if (!action.post.id) {
        return state
      }
      state = initializedIfNeededState(state)
      if (!(action.post.id in state.byId)) {
        return {
          ...state,
          byId: {
            ...state.byId,
            [action.post.id]: action.post
          },
          allIds: state.allIds.concat([action.post.id]),
        }
      }
      return state
    case RECEIVE_POST_COMMENTS:
      state = initializedIfNeededState(state)
      if (!(action.postId in state.byId)) {
        return state
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.postId]: {
            ...state.byId[action.postId],
            comments: action.comments.map(comment => comment.id),
          }
        }
      }
    case RECEIVE_VOTE:
      if (action.objectType !== POST_TYPE) {
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
    case ADD_POST:
      state = initializedIfNeededState(state)
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: action.post
        },
        allIds: state.allIds.concat([action.post.id])
      }
    case ADD_COMMENT:
      state = initializedIfNeededState(state)
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.parentId]: {
            ...state.byId[action.comment.parentId],
            comments: state.byId[action.comment.parentId].comments.concat([action.comment.id]),
          }
        },
      }
    case REMOVE_OBJECT:
    if (action.objectType !== POST_TYPE) {
      return state
    }
    return {
      ...state,
      byId: {
        ...state.byId,
        [action.id]: {
          ...state.byId[action.id],
          deleted: true,
        }
      },
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
      if (action.objectType !== COMMENT_TYPE) {
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
    case ADD_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        }
      }
    case REMOVE_OBJECT:
      if (action.objectType !== COMMENT_TYPE) {
        return state
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            deleted: true,
          }
        },
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
