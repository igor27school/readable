import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import { fetchPostFromServer, editPost } from '../actions'

class EditPost extends Component {
  componentDidMount() {
    const { posts, fetchPostFromServer } = this.props
    const { postId } = this.props.match.params
    if (postId && (!posts.byId || !(postId in posts.byId))) {
      fetchPostFromServer(postId)
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { postId } = this.props.match.params
    const values = serializeForm(e.target, { hash: true })
    this.props.editPost(postId, values)
    this.props.history.push(`/posts/${postId}`)
  }
  render() {
    const { posts } = this.props
    const { postId } = this.props.match.params
    const post = posts.byId && posts.byId[postId]
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
        <Link to="/">Close</Link>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" defaultValue={post.title}/>
          <textarea name="body" defaultValue={post.body}></textarea>
          <button>Submit Edits</button>
        </form>
      </div>

    )
  }
}

function mapStateToProps ({ posts }) {
  return {posts}
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostFromServer: (postId) => dispatch(fetchPostFromServer(postId)),
    editPost: (postId, values) => dispatch(editPost(postId, values)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
