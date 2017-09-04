import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VOTE_UP, VOTE_DOWN } from '../utils/Helper'
import { vote } from '../actions'

class Voter extends Component {
  render() {
    const {componentType, id, vote} = this.props
    return (
      <div>
        <button onClick={(event) => vote(componentType, id, VOTE_UP)}>UPVOTE</button>
        <button onClick={(event) => vote(componentType, id, VOTE_DOWN)}>DOWNVOTE</button>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    vote: (componentType, id, voteType) => dispatch(vote(componentType, id, voteType)),
  }
}

export default connect(null, mapDispatchToProps)(Voter)
