import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import { fetchCommentFromServer, editComment } from '../actions/ActionCreators'

class EditComment extends Component {
  componentDidMount() {
    const { comment, commentId } = this.props
    if (!comment) {
      fetchCommentFromServer(commentId)
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { comment, commentId, category } = this.props
    const values = serializeForm(e.target, { hash: true })
    this.props.editComment(commentId, values)
    this.props.history.push(`/${category}/${comment.parentId}`)
  }
  render() {
    const { comment, commentId, category } = this.props
    if (!comment){
      return (
        <div>Comment id is invalid or the comment has been deleted: {commentId}</div>
      )
    } else if (comment.deleted) {
      return (
        <div>This comment has been deleted: {commentId}</div>
      )
    }
    return (
      <div>
        <Link to={`/${category}/${comment.parentId}`}>Close</Link>
        <form onSubmit={this.handleSubmit}>
          <textarea name="body" defaultValue={comment.body}></textarea>
          <button>Submit Edits</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ comments }, { match }) {
  return {
    comment: comments.byId[match.params.comment_id],
    commentId: match.params.comment_id,
    category: match.params.category,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editComment: (commentId, values) => dispatch(editComment(commentId, values)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
