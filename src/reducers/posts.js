import * as ActionTypes from '../constants/ActionTypes'
import * as ObjectTypes from '../constants/ObjectTypes'
import * as VoteTypes from '../constants/VoteTypes'

const initialState = {
  byId: {},
  allIds: [],
}

function posts(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_ALL_POSTS:
    case ActionTypes.RECEIVE_CATEGORY_POSTS:
      return action.posts.reduce((state, post) => {
        if (!(post.id in state.byId)) {
          state.byId[post.id] = {
            ...post,
            comments: [],
          }
          state.allIds.push(post.id)
        }
        return state
      }, state)
    case ActionTypes.RECEIVE_POST:
    case ActionTypes.ADD_POST:
    case ActionTypes.MODIFY_POST:
      if (!action.post.id) {
        return state
      }
      if (action.post.id in state.byId) {
        state.byId[action.post.id] = {
          ...action.post,
          comments: state.byId[action.post.id].comments,
        }
      } else {
        state.byId[action.post.id] = {
          ...action.post,
          comments: [],
        }
        state.allIds.push(action.post.id)
      }
      return state
    case ActionTypes.RECEIVE_POST_COMMENTS:
      if (!(action.postId in state.byId)) {
        return state
      }
      state.byId[action.postId].comments = action.comments.map(comment => comment.id)
      return state
    case ActionTypes.RECEIVE_VOTE:
      if (action.objectType !== ObjectTypes.POST_TYPE || !(action.id in state.byId)) {
        return state
      }
      state.byId[action.id].voteScore = action.voteType === VoteTypes.VOTE_UP ?
          state.byId[action.id].voteScore + 1 :
          state.byId[action.id].voteScore - 1
      return state
    case ActionTypes.ADD_COMMENT:
    case ActionTypes.RECEIVE_COMMENT:
      if (!(action.comment.parentId in state.byId)) {
        return state
      }
      state.byId[action.comment.parentId].comments.push(action.comment.id)
      return state
    case ActionTypes.REMOVE_OBJECT:
      if (action.objectType !== ObjectTypes.POST_TYPE || !(action.id in state.byId)) {
        return state
      }
      state.byId[action.id].delted = true
      return state
    default:
      return state
  }
}

export default posts
