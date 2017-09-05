import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import { fetchCommentFromServer, editComment } from '../actions'

class EditComment extends Component {
  componentDidMount() {
    const { comments } = this.props
    const { commentId } = this.props.match.params
    if (!comments.byId || !(commentId in comments.byId)) {
      fetchCommentFromServer(commentId)
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { comments } = this.props
    const { commentId } = this.props.match.params
    const values = serializeForm(e.target, { hash: true })
    this.props.editComment(commentId, values)
    const parentId = comments.byId[commentId].parentId
    this.props.history.push(`/posts/${parentId}`)
  }
  render() {
    const { comments } = this.props
    const { commentId } = this.props.match.params
    const comment = comments.byId && comments.byId[commentId]
    if (!comment){
      return (
        <div>Comment id is invalid or the comment has been deleted: {commentId}</div>
      )
    } else if (comment.deleted) {
      return (
        <div>This comment has been deleted: {commentId}</div>
      )
    }
    const parentId = comment.parentId
    return (
      <div>
        <Link to={`/posts/${parentId}`}>Close</Link>
        <form onSubmit={this.handleSubmit}>
          <textarea name="body" defaultValue={comment.body}></textarea>
          <button>Submit Edits</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({comments}) {
  return {comments}
}

function mapDispatchToProps (dispatch) {
  return {
    editComment: (commentId, values) => dispatch(editComment(commentId, values)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
