import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPostFromServer, fetchPostCommentsFromServer } from '../actions'
import { compare } from '../utils/Helper'
import { POST_TYPE } from '../constants/ObjectTypes'
import Sorter from './Sorter'
import Voter from './Voter'
import Comment from './Comment'
import Deleter from './Deleter'

class PostDetails extends Component {
  componentDidMount() {
    const { posts } = this.props
    const { postId } = this.props.match.params
    if (postId && (!posts.byId || !(postId in posts.byId))) {
      this.props.fetchPostFromServer(postId).then(() => this.props.fetchPostCommentsFromServer(postId))
    } else if (postId && !('comments' in posts.byId[postId])) {
      this.props.fetchPostCommentsFromServer(postId)
    }
  }
  render() {
    const { sortOrder, posts, comments } = this.props
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
    const commentIds = post.comments ? post.comments.map(commentId => comments.byId[commentId]).filter(comment => !comment.deleted).sort(compare(sortOrder)).map(comment => comment.id) : []
    return (
      <div>
        <h2>
          <Deleter
            objectType={POST_TYPE}
            id={postId}
            history={this.props.history}
          />
          <Link to={`/edit/posts/${post.id}`}>Edit</Link>
          <span> {post.title}</span>
          <span> Score: {post.voteScore}</span>
          <Voter objectType={POST_TYPE} id={postId}/>
        </h2>
        <h3>{post.body}</h3>
        <h3>{post.author}</h3>
        <h3>{(new Date(post.timestamp)).toString()}</h3>
        {post.comments && post.comments.length > 0 && (
          <h3> Number of {post.comments.length === 1 ? 'comment' : 'comments'}: {post.comments.length}</h3>
        )}
        <Sorter/>
        {commentIds.map(commentId => (
          <Comment key={commentId} commentId={commentId}/>
        ))}
        <h4><Link to={`/create/${postId}`}>New Comment</Link></h4>
        <h4><Link to={`/categories/${post.category}`}>View {post.category} Category</Link></h4>
        <h4><Link to='/'>View All Categories</Link></h4>
      </div>
    )
  }
}

function mapStateToProps ({ sortOrder, posts, comments }) {
  return {sortOrder, posts, comments }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostFromServer: (postId) => dispatch(fetchPostFromServer(postId)),
    fetchPostCommentsFromServer: (postId) => dispatch(fetchPostCommentsFromServer(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
