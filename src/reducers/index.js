import { combineReducers } from 'redux'
import { SORT_BY_SCORES } from '../utils/Helper'
import * as types from '../constants/ActionTypes'
import * as objectTypes from '../constants/ObjectTypes'
import * as voteTypes from '../constants/VoteTypes'
import categories from './categories'
import posts from './posts'

function comments(state={}, action) {
  switch(action.type) {
    case types.RECEIVE_POST_COMMENTS:
      return {
        ...state,
        byId: action.comments.reduce((byId, comment) => {
            byId[comment.id] = comment
            return byId
          }, state.byId ? state.byId : {}),
      }
    case types.RECEIVE_VOTE:
      if (action.objectType !== objectTypes.COMMENT_TYPE) {
        return state
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            voteScore: action.voteType === voteTypes.VOTE_UP ? state.byId[action.id].voteScore + 1 : state.byId[action.id].voteScore - 1,
          }
        }
      }
    case types.ADD_COMMENT:
    case types.RECEIVE_COMMENT:
    case types.MODIFY_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        }
      }
    case types.REMOVE_OBJECT:
      if (action.objectType !== objectTypes.COMMENT_TYPE) {
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
    case types.CHANGE_SORT_ORDER:
      return action.sortBy
    default:
      return state
  }
}

export default combineReducers({categories, posts, comments, sortOrder})
