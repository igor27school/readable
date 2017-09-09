import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPostFromServer, fetchPostCommentsFromServer } from '../actions/ActionCreators'
import { compare } from '../utils/Helper'
import { POST_TYPE } from '../constants/ObjectTypes'
import Sorter from './Sorter'
import Voter from './Voter'
import Comment from './Comment'
import Deleter from './Deleter'

class PostDetails extends Component {
  componentDidMount() {
    const { post, postId } = this.props
    if (!post) {
      this.props.fetchPostFromServer(postId).then(() => this.props.fetchPostCommentsFromServer(postId))
    } else if (post && !post.hasAllComments) {
      this.props.fetchPostCommentsFromServer(postId)
    }
  }
  render() {
    const { post, postId, commentIds } = this.props
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
        <h2>
          <Deleter
            objectType={POST_TYPE}
            id={post.id}
            history={this.props.history}
          />
          <Link to={`/edit/${post.id}`}>Edit</Link>
          <span> {post.title}</span>
          <span> Score: {post.voteScore}</span>
          <Voter objectType={POST_TYPE} id={post.id}/>
        </h2>
        <h3>{post.body}</h3>
        <h3>{post.author}</h3>
        <h3>{(new Date(post.timestamp)).toString()}</h3>
        <h3> Number of comments: {post.comments.length}</h3>
        <Sorter/>
        {commentIds.map(commentId => (
          <Comment key={commentId} category={post.category} commentId={commentId}/>
        ))}
        <h4><Link to={`/create/${post.category}/${post.id}`}>New Comment</Link></h4>
        <h4><Link to={`/${post.category}`}>View {post.category} Category</Link></h4>
        <h4><Link to='/'>View All Categories</Link></h4>
      </div>
    )
  }
}

function mapStateToProps ({ sortOrder, posts, comments }, { match }) {
  return {
    post: posts.byId[match.params.post_id],
    postId: match.params.post_id,
    commentIds: (match.params.post_id in posts.byId) ? posts.byId[match.params.post_id].comments.map(commentId => comments.byId[commentId]).filter(comment => !comment.deleted).sort(compare(sortOrder)).map(comment => comment.id) : [],
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostFromServer: (postId) => dispatch(fetchPostFromServer(postId)),
    fetchPostCommentsFromServer: (postId) => dispatch(fetchPostCommentsFromServer(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
