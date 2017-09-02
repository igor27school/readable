import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES, RECEIVE_ALL_POSTS, RECEIVE_CATEGORY_POSTS } from '../actions'

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
        categories[post.category] = categories[post.category] ? categories[post.category].concat(post.id): [post.id]
        return categories
      }, {})
      return {
        ...state,
        byId: Object.keys(state.byId).reduce((categories, category) => {
          categories = {
            ...categories,
            [category]: {
              ...categories[category],
              posts: (category in categorizedPosts) ? categorizedPosts[category] : [],
            }
          }
          return categories
        }, state.byId),
        hasAllPosts: true
      }
    case RECEIVE_CATEGORY_POSTS:
      // If the provided category is not one of the categories, ignore it
      if (!state.byId[action.category_path]) {
        return state
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.category_path]: {
            ...state.byId[action.category_path],
            posts: action.posts.map(post => post.id)
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
        state[post.id] = post
        return state
      }, state)
    default:
      return state
  }
}

export default combineReducers({categories, posts})
