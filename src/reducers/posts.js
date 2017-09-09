import * as ActionTypes from '../constants/ActionTypes'
import * as ObjectTypes from '../constants/ObjectTypes'

const initialState = {
  byId: {},
  allIds: [],
}

function posts(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_ALL_POSTS:
    case ActionTypes.RECEIVE_CATEGORY_POSTS:
      return action.posts.reduce((state, post) => {
        if (post.id in state.byId) {
          return state
        }
        return {
          ...state,
          byId: {
            ...state.byId,
            [post.id]: {
              ...post,
              hasAllComments: false,
              comments: [],
            }
          },
          allIds: state.allIds.concat([post.id])
        }
      }, state)
    case ActionTypes.RECEIVE_POST:
      if (!action.post.id) {
        console.warn('Receiving post, but the post.id is undefined')
        return state
      }
      if (action.post.id in state.byId) {
        return {
          ...state,
          byId: {
            ...state.byId,
            [action.post.id]: {
              ...state.byId[action.post.id],
              // Passed values will override the existing values
              ...action.post,
            }
          }
        }
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: {
            ...action.post,
            comments: [],
            hasAllComments: false,
          }
        },
        allIds: state.allIds.concat([action.post.id])
      }
    case ActionTypes.RECEIVE_POST_COMMENTS:
      if (!(action.postId in state.byId)) {
        console.warn('Receiving post comments, but the postId is not found')
        return state
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.postId]: {
            ...state.byId[action.postId],
            comments: action.comments.map(comment => comment.id),
            hasAllComments: true,
          }
        }
      }
    case ActionTypes.RECEIVE_COMMENT:
      if (!(action.comment.parentId in state.byId)) {
        console.warn('Receiving comment, but the postId is not found')
        return state
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.parentId]: {
            ...state.byId[action.comment.parentId],
            comments: state.byId[action.comment.parentId].comments.concat([action.comment.id])
          }
        }
      }
    case ActionTypes.REMOVE_OBJECT:
      if (action.objectType !== ObjectTypes.POST_TYPE || !(action.id in state.byId)) {
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
        }
      }
    case ActionTypes.RECEIVE_VOTE:
      if (action.objectType !== ObjectTypes.POST_TYPE || !(action.id in state.byId)) {
        return state
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            voteScore: action.score,
          }
        }
      }
    default:
      return state
  }
}

export default posts
