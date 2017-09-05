import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { POST_TYPE } from '../utils/Helper'
import { fetchPostFromServer, fetchPostCommentsFromServer } from '../actions'
import Voter from './Voter'
import Deleter from './Deleter'

class PostSummary extends Component {
  componentDidMount() {
    const { posts, postId } = this.props
    if (postId && (!posts.byId || !(postId in posts.byId))) {
      this.props.fetchPostFromServer(postId).then(() => this.props.fetchPostCommentsFromServer(postId))
    } else if (postId && !('comments' in posts.byId[postId])) {
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
    } else if (post.deleted) {
      return (
        <div>This post has been deleted: {postId}</div>
      )
    }
    return (
      <div>
        <Deleter objectType={POST_TYPE} id={postId}/>
        <Link to={`/edit/posts/${post.id}`}>Edit</Link>
        <Link to={`/posts/${postId}`}>{post.title}</Link>
        <span> Score: {post.voteScore}</span>
        {post.comments && post.comments.length > 0 && (
          <span> Number of {post.comments.length === 1 ? 'comment' : 'comments'}: {post.comments.length}</span>
        )}
        <Voter objectType={POST_TYPE} id={postId}/>
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostFromServer: (postId) => dispatch(fetchPostFromServer(postId)),
    fetchPostCommentsFromServer: (postId) => dispatch(fetchPostCommentsFromServer(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary)
