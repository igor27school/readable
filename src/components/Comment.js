import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { COMMENT_TYPE } from '../constants/ObjectTypes'
import Voter from './Voter'
import Deleter from './Deleter'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string,
      author: PropTypes.string,
      timestamp: PropTypes.number.isRequired,
      voteScore: PropTypes.number.isRequired,
      deleted: PropTypes.bool.isRequired,
      parentId: PropTypes.string.isRequired,
    }),
    commentId: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }
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
      <div>
        <Link to={`/edit/${category}/${comment.id}`}>Edit</Link>
        <Deleter objectType={COMMENT_TYPE} id={comment.id}/>
        <p>Body: {comment.body ? comment.body : 'Empty'}</p>
        <p>Author: {comment.author ? comment.author : 'Unknown'}</p>
        <p>Last modified: {(new Date(comment.timestamp)).toString()}</p>
        <p>
          Score: {comment.voteScore}
          <Voter objectType={COMMENT_TYPE} id={comment.id}/>
        </p>
      </div>
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
