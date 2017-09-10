import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { VOTE_UP, VOTE_DOWN } from '../constants/VoteTypes'
import { COMMENT_TYPE, POST_TYPE } from '../constants/ObjectTypes'
import { vote } from '../actions/ActionCreators'

/**
* @description This component is used in AllCategories, Category and PostDetails views. It allows the user to vote on the posts and comments.
*/
export class Voter extends Component {
  static propTypes = {
    objectType: PropTypes.oneOf([COMMENT_TYPE, POST_TYPE]).isRequired,
    id: PropTypes.string.isRequired,
    vote: PropTypes.func.isRequired,
  }
  render() {
    const {objectType, id, vote} = this.props
    return (
      <span>
        <button onClick={(event) => vote(objectType, id, VOTE_UP)}>UPVOTE</button>
        <button onClick={(event) => vote(objectType, id, VOTE_DOWN)}>DOWNVOTE</button>
      </span>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    vote: (objectType, id, voteType) => dispatch(vote(objectType, id, voteType)),
  }
}

export default connect(null, mapDispatchToProps)(Voter)
