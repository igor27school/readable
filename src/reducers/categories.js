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
          state.byId[category.path] = {
            ...category,
            posts: [],
          }
          state.allIds.push(category.path)
          return state
        },
        // Makes sure we over-write any previous categories stored
        { byId: {}, allIds: [], hasAllPosts: false }
      )
    case ActionTypes.RECEIVE_ALL_POSTS:
      // Can't receive posts if categories are unavailable
      // Don't want to receive them if hasAllPosts is already true
      if (state.allIds.length === 0 || state.hasAllPosts) {
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
        byId: state.allIds.reduce((categories, category) => {
          categories[category].posts = (category in categorizedPosts) ? categorizedPosts[category].map(post => post.id) : []
          return categories
        }, state.byId),
        hasAllPosts: true
      }
    case ActionTypes.RECEIVE_CATEGORY_POSTS:
      // If the provided category is not one of the categories, ignore it
      // If we already have all the posts, don't process
      if (!(action.categoryPath in state.byId) || state.hasAllPosts) {
        return state
      }
      state.byId[action.categoryPath].posts = action.posts.map(post => post.id)
      return state
    case ActionTypes.ADD_POST:
      const categoryPath = action.post.category
      if (categoryPath in state.byId) {
        state.byId[categoryPath].posts.push(action.post.id)
      }
      return state
    default:
      return state
  }
}

export default categories
