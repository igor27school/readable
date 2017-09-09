import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { COMMENT_TYPE } from '../constants/ObjectTypes'
import Voter from './Voter'
import Deleter from './Deleter'

class Comment extends Component {
  render() {
    const { comment, commentId, category } = this.props
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
        <Deleter objectType={COMMENT_TYPE} id={comment.id}/>
        <Link to={`/edit/${category}/${comment.id}`}>Edit</Link>
        <span> {comment.author}</span>
        <span> {comment.body}</span>
        <span> Score: {comment.voteScore}</span>
        <Voter objectType={COMMENT_TYPE} id={comment.id}/>
      </h4>
    )
  }
}

function mapStateToProps ({ comments }, { commentId, category }) {
  return {
    comment: comments.byId[commentId],
    commentId,
    category,
  }
}

export default connect(mapStateToProps)(Comment)
