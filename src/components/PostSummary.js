import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { POST_TYPE } from '../constants/ObjectTypes'
import { fetchPostFromServer, fetchPostCommentsFromServer } from '../actions/ActionCreators'
import Voter from './Voter'
import Deleter from './Deleter'

/**
* @description This component is used in AllCategories and Category views. It displays the information releavant to a particular post, including the number of comments the post has.
*/
export class PostSummary extends Component {
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
    numberComments: PropTypes.number.isRequired,
    fetchPostFromServer: PropTypes.func.isRequired,
    fetchPostCommentsFromServer: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { post, postId } = this.props
    if (!post) {
      this.props.fetchPostFromServer(postId).then(() => this.props.fetchPostCommentsFromServer(postId))
    } else if (post && !post.hasAllComments) {
      this.props.fetchPostCommentsFromServer(postId)
    }
  }
  render() {
    const { post, postId, numberComments } = this.props
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
        <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
        <p>
          <Link to={`/edit/${post.id}`}>Edit</Link>
          <Deleter objectType={POST_TYPE} id={post.id}/>
        </p>
        <p> Category: {post.category} </p>
        <p>Author: {post.author ? post.author : 'Unknown'}</p>
        <p>Time posted: {(new Date(post.timestamp)).toString()}</p>
        <p>Number of comments: {numberComments}</p>
        <p>
          Score: {post.voteScore}
          <Voter objectType={POST_TYPE} id={post.id}/>
        </p>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments }, { postId }) {
  return {
    post: posts.byId[postId],
    postId,
    numberComments: (postId in posts.byId) ? posts.byId[postId].comments.map(commentId => comments.byId[commentId]).filter(comment => !comment.deleted).length : 0
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostFromServer: (postId) => dispatch(fetchPostFromServer(postId)),
    fetchPostCommentsFromServer: (postId) => dispatch(fetchPostCommentsFromServer(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary)
