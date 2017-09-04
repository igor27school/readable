import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { POST_TYPE } from '../utils/Helper'
import { fetchPostFromServer, fetchPostCommentsFromServer } from '../actions'
import Voter from './Voter'

class PostSummary extends Component {
  componentDidMount() {
    const { posts, postId } = this.props
    if (postId && (!posts.byId || !(postId in posts.byId))) {
      this.props.fetchPostFromServer(postId).then(() => this.props.fetchPostCommentsFromServer(postId))
    } else if (postId && !('commentsByScore' in posts.byId[postId])) {
      this.props.fetchPostCommentsFromServer(postId)
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
        {post.commentsByScore && post.commentsByScore.length > 0 && (
          <span> Number of {post.commentsByScore.length === 1 ? 'comment' : 'comments'}: {post.commentsByScore.length}</span>
        )}
        <Voter componentType={POST_TYPE} id={postId}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary)
