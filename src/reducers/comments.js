import * as ActionTypes from '../constants/ActionTypes'
import * as ObjectTypes from '../constants/ObjectTypes'

const initialState = {
  byId: {},
}

function comments(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_POST_COMMENTS:
      return {
        ...state,
        byId: action.comments.reduce((byId, comment) => {
            return {
              ...byId,
              [comment.id]: comment,
            }
          }, state.byId),
      }
    case ActionTypes.RECEIVE_COMMENT:
    case ActionTypes.MODIFY_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        }
      }
    case ActionTypes.RECEIVE_VOTE:
      if (action.objectType !== ObjectTypes.COMMENT_TYPE || !(action.id in state.byId)) {
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
    case ActionTypes.REMOVE_OBJECT:
      if (action.objectType !== ObjectTypes.COMMENT_TYPE || !(action.id in state.byId)) {
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

export default comments
