import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchCommentFromServer, editComment } from '../actions/ActionCreators'

class EditComment extends Component {
  static propTypes = {
    comment: PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      parentId: PropTypes.string.isRequired,
      deleted: PropTypes.bool.isRequired,
    }),
    commentId: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    fetchCommentFromServer: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { comment, commentId, fetchCommentFromServer } = this.props
    if (!comment) {
      fetchCommentFromServer(commentId)
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { comment, commentId, category, editComment } = this.props
    const values = serializeForm(e.target, { hash: true })
    editComment(commentId, values)
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
    fetchCommentFromServer: commentId => dispatch(fetchCommentFromServer(commentId)),
    editComment: (commentId, values) => dispatch(editComment(commentId, values)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
