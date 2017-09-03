import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostFromServer, fetchPostCommentsFromServer } from '../actions'
import Comment from './Comment'

class PostDetails extends Component {
  componentDidMount() {
    const { posts } = this.props
    const { postId } = this.props.match.params
    if (postId && (!posts.byId || !(postId in posts.byId))) {
      // TODO: enforce strict order of operations
      this.props.fetchPostFromServer(postId)
      this.props.fetchPostCommentsFromServer(postId)
    } else if (postId && !('commentsByScore' in posts.byId[postId])) {
      this.props.fetchPostCommentsFromServer(postId)
    }
  }
  render() {
    const { posts } = this.props
    const { postId } = this.props.match.params
    const post = posts.byId && posts.byId[postId]
    if (!post){
      return (
        <div>Invalid post id: {postId}</div>
      )
    }
    return (
      <div>
        <h2>{post.title}<span> Score: {post.voteScore}</span></h2>
        {post.commentsByScore && post.commentsByScore.map(commentId => (
          <Comment key={commentId} commentId={commentId}/>
        ))}
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
    fetchPostCommentsFromServer: (postId) => dispatch(fetchPostCommentsFromServer(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
