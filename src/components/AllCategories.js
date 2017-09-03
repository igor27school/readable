import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as CategoriesHelper from '../utils/CategoriesHelper'
import { fetchCategoriesFromServer, fetchAllPostsFromServer } from '../actions'
import PostSummary from './PostSummary'

class AllCategories extends Component {
  componentDidMount() {
    if (Object.keys(this.props.categories).length === 0) {
      this.props.fetchCategoriesFromServer()
      this.props.fetchAllPostsFromServer()
    } else if (!this.props.hasAllPosts) {
      this.props.fetchAllPostsFromServer()
    }
  }
  render() {
    return (
      <div>
        <h2>Categories</h2>
        {this.props.categories.map(category => (
          <div key={category.path}>
            <Link
              to={`/categories/${category.path}`}
            >{category.name}</Link>
          </div>
        ))}
        <h2>Posts</h2>
        {this.props.postsByScore.map(postId => (
          <PostSummary key={postId} postId={postId}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return CategoriesHelper.getProcessedCategories(categories)
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoriesFromServer: () => dispatch(fetchCategoriesFromServer()),
    fetchAllPostsFromServer: () => dispatch(fetchAllPostsFromServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)
