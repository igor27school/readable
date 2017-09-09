import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  byId: {},
  allIds: [],
  hasAllPosts: false,
}

function categories(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_CATEGORIES:
      return action.categories.reduce((state, category) => {
          return {
            ...state,
            byId: {
              ...state.byId,
              [category.path]: {
                ...category,
                posts: [],
                hasAllPosts: false,
              }
            },
            allIds: state.allIds.concat([category.path])
          }
        },
        initialState
      )
    case ActionTypes.RECEIVE_ALL_POSTS:
      // Can't receive posts if categories are unavailable
      // Don't want to receive them if hasAllPosts is already true
      if (state.allIds.length === 0 || state.hasAllPosts) {
        console.warn('Receiving all posts, but either categories are empty or hasAllPosts is already true')
        return state
      }
      const categorizedPosts = action.posts.reduce((categories, post) => {
        if (!(post.category in categories)) {
          categories[post.category] = []
        }
        categories[post.category].push(post)
        return categories
      }, {})
      return {
        ...state,
        byId: state.allIds.reduce((byId, category) => {
          return {
            ...byId,
            [category]: {
              ...byId[category],
              posts: (category in categorizedPosts) ? categorizedPosts[category].map(post => post.id) : [],
              hasAllPosts: true,
            }
          }
        }, state.byId),
        hasAllPosts: true
      }
    case ActionTypes.RECEIVE_CATEGORY_POSTS:
      // If the provided category is not one of the categories, ignore it
      // If we already have all the posts, don't process
      if (!(action.categoryPath in state.byId) || state.hasAllPosts) {
        console.warn('Receiving category posts, but the categoryPath is not found OR we already have all the posts')
        return state
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.categoryPath]: {
            ...state.byId[action.categoryPath],
            posts: action.posts.map(post => post.id),
            hasAllPosts: true,
          },
        },
      }
    case ActionTypes.RECEIVE_POST:
      if (!(action.post.category in state.byId)) {
        return state
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.category]: {
            ...state.byId[action.post.category],
            posts: state.byId[action.post.category].posts.concat([action.post.id]),
          },
        },
      }
    default:
      return state
  }
}

export default categories
