import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { COMMENT_TYPE } from '../constants/ObjectTypes'
import Voter from './Voter'
import Deleter from './Deleter'

class Comment extends Component {
  render() {
    const { comments, commentId } = this.props
    const comment = comments.byId && comments.byId[commentId]
    if (!comment){
      return (
        <div>Invalid comment id: {commentId}</div>
      )
    } else if (comment.deleted) {
      return (
        <div>This comment has been deleted: {commentId}</div>
      )
    }
    return (
      <h4>
        <Deleter objectType={COMMENT_TYPE} id={commentId}/>
        <Link to={`/edit/comments/${comment.id}`}>Edit</Link>
        <span> {comment.author}</span>
        <span> {comment.body}</span>
        <span> Score: {comment.voteScore}</span>
        <Voter objectType={COMMENT_TYPE} id={commentId}/>
      </h4>
    )
  }
}

function mapStateToProps ({ comments }) {
  return {comments}
}

export default connect(mapStateToProps)(Comment)
