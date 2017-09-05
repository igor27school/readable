import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VOTE_UP, VOTE_DOWN } from '../utils/Helper'
import { vote } from '../actions'

class Voter extends Component {
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
