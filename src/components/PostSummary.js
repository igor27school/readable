import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPostFromServer } from '../actions'

class PostSummary extends Component {
  componentDidMount() {
    const { posts, postId } = this.props
    if (postId && (!posts.byId || !(postId in posts.byId))) {
      this.props.fetchPostFromServer(postId)
    }
  }
  render() {
    const { posts, postId } = this.props
    const post = posts.byId[postId]
    if (!post){
      return (
        <div>Invalid post id: {postId}</div>
      )
    }
    return (
      <div>
        <Link to={`/posts/${postId}`}>{post.title}</Link>
        <span> Score: {post.voteScore}</span>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary)
