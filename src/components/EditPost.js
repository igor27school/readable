import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import { fetchPostFromServer, editPost } from '../actions/ActionCreators'

class EditPost extends Component {
  componentDidMount() {
    const { post, postId, fetchPostFromServer } = this.props
    if (!post) {
      fetchPostFromServer(postId)
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { post } = this.props
    const values = serializeForm(e.target, { hash: true })
    this.props.editPost(post.id, values)
    this.props.history.push(`/${post.category}/${post.id}`)
  }
  render() {
    const { post, postId } = this.props
    if (!post){
      return (
        <div>Post id is invalid or the post has been deleted: {postId}</div>
      )
    } else if (post.deleted) {
      return (
        <div>This post has been deleted: {postId}</div>
      )
    }
    return (
      <div>
        <Link to={`/${post.category}/${post.id}`}>Close</Link>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" defaultValue={post.title}/>
          <textarea name="body" defaultValue={post.body}></textarea>
          <button>Submit Edits</button>
        </form>
      </div>

    )
  }
}

function mapStateToProps ({ posts }, { match }) {
  return {
    post: posts.byId[match.params.post_id],
    postId: match.params.post_id,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostFromServer: (postId) => dispatch(fetchPostFromServer(postId)),
    editPost: (postId, values) => dispatch(editPost(postId, values)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
