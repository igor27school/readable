import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { POST_TYPE } from '../constants/ObjectTypes'
import { fetchPostFromServer, fetchPostCommentsFromServer } from '../actions/ActionCreators'
import Voter from './Voter'
import Deleter from './Deleter'

class PostSummary extends Component {
  componentDidMount() {
    const { post, postId } = this.props
    if (!post) {
      this.props.fetchPostFromServer(postId).then(() => this.props.fetchPostCommentsFromServer(postId))
    } else if (post && !post.hasAllComments) {
      this.props.fetchPostCommentsFromServer(postId)
    }
  }
  render() {
    const { post, postId } = this.props
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
        <Deleter objectType={POST_TYPE} id={post.id}/>
        <Link to={`/edit/${post.id}`}>Edit</Link>
        <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
        <span> Author: {post.author}</span>
        <span> Score: {post.voteScore}</span>
        <span> Number of comments: {post.comments.length}</span>
        <Voter objectType={POST_TYPE} id={post.id}/>
      </div>
    )
  }
}

function mapStateToProps ({ posts }, { postId }) {
  return {
    post: posts.byId[postId],
    postId,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostFromServer: (postId) => dispatch(fetchPostFromServer(postId)),
    fetchPostCommentsFromServer: (postId) => dispatch(fetchPostCommentsFromServer(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary)
