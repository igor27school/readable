import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostFromServer, fetchPostCommentsFromServer } from '../actions'
import { SORT_BY_TIMESTAMPS } from '../utils/Helper'
import Sorter from './Sorter'
import Comment from './Comment'

class PostDetails extends Component {
  componentDidMount() {
    const { posts } = this.props
    const { postId } = this.props.match.params
    if (postId && (!posts.byId || !(postId in posts.byId))) {
      this.props.fetchPostFromServer(postId).then(() => this.props.fetchPostCommentsFromServer(postId))
    } else if (postId && !('commentsByScore' in posts.byId[postId])) {
      this.props.fetchPostCommentsFromServer(postId)
    }
  }
  render() {
    const { sortOrder, posts } = this.props
    const { postId } = this.props.match.params
    const post = posts.byId && posts.byId[postId]
    if (!post){
      return (
        <div>Invalid post id: {postId}</div>
      )
    }
    const comments = sortOrder === SORT_BY_TIMESTAMPS ? post.commentsByTimestamp : post.commentsByScore
    return (
      <div>
        <h2>{post.title}<span> Score: {post.voteScore}</span></h2>
        <Sorter/>
        {comments && comments.map(commentId => (
          <Comment key={commentId} commentId={commentId}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ sortOrder, posts }) {
  return {sortOrder, posts}
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostFromServer: (postId) => dispatch(fetchPostFromServer(postId)),
    fetchPostCommentsFromServer: (postId) => dispatch(fetchPostCommentsFromServer(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
