import React, { Component } from 'react'
import { connect } from 'react-redux'
import { COMMENT_TYPE } from '../utils/Helper'
import Voter from './Voter'

class Comment extends Component {
  render() {
    const { comments, commentId } = this.props
    const comment = comments.byId && comments.byId[commentId]
    if (!comment){
      return (
        <div>Invalid comment id: {commentId}</div>
      )
    }
    return (
      <div>
        <h4>{comment.body}
          <span> Score: {comment.voteScore}</span>
          <Voter componentType={COMMENT_TYPE} id={commentId}/>
        </h4>
      </div>
    )
  }
}

function mapStateToProps ({ comments }) {
  return {comments}
}

export default connect(mapStateToProps)(Comment)
