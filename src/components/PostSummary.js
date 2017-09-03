import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPostFromServer } from '../actions'

class PostSummary extends Component {
  componentDidMount() {
    const {match, posts} = this.props
    const accessedDirectly = match && match.params && match.params.post_id
    const postId = accessedDirectly ? match.params.post_id : this.props.postId
    if (postId && (!posts.byId || !(postId in posts.byId))) {
      this.props.fetchPostFromServer(postId)
    }
  }
  render() {
    const {match, posts} = this.props
    const accessedDirectly = match && match.params && match.params.post_id
    const postId = accessedDirectly ? match.params.post_id : this.props.postId
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
    fetchPostFromServer: (post_id) => dispatch(fetchPostFromServer(post_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary)
