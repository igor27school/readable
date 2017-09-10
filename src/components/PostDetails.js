import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchPostFromServer, fetchPostCommentsFromServer } from '../actions/ActionCreators'
import { compare } from '../utils/Helper'
import { POST_TYPE } from '../constants/ObjectTypes'
import Sorter from './Sorter'
import Voter from './Voter'
import Comment from './Comment'
import Deleter from './Deleter'

class PostDetails extends Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string,
      author: PropTypes.string,
      category: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      deleted: PropTypes.bool.isRequired,
      comments: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      hasAllComments: PropTypes.bool.isRequired,
    }),
    postId: PropTypes.string.isRequired,
    commentIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    fetchPostFromServer: PropTypes.func.isRequired,
    fetchPostCommentsFromServer: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { post, postId } = this.props
    if (!post) {
      this.props.fetchPostFromServer(postId).then(res => res && this.props.fetchPostCommentsFromServer(postId))
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
        <Link to={`/edit/${post.id}`}>Edit Post</Link>
        <Deleter
          objectType={POST_TYPE}
          id={post.id}
          // History needed to redirect to main page after the post is deleted
          history={this.props.history}
        />
        <h2>{post.title}</h2>
        <h3>Content: {post.body ? post.body : 'Empty'}</h3>
        <h3>Author: {post.author ? post.author : 'Unknown'}</h3>
        <h3>Time posted: {(new Date(post.timestamp)).toString()}</h3>
        <h3>Number of comments: {commentIds.length}</h3>
        <h3>
          Score: {post.voteScore}
          <Voter objectType={POST_TYPE} id={post.id}/>
        </h3>
        <h2>COMMENTS</h2>
        <Sorter/>
        <ul>
        {commentIds.map(commentId => (
          <li key={commentId}>
            <Comment category={post.category} commentId={commentId}/>
          </li>
        ))}
        </ul>
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
