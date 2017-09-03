import React, { Component } from 'react'
import { connect } from 'react-redux'

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
      <div>{comment.body}</div>
    )
  }
}

function mapStateToProps ({ comments }) {
  return {comments}
}

export default connect(mapStateToProps)(Comment)
