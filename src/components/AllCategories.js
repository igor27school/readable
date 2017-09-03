import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchCategoriesFromServer,
  fetchAllPostsFromServer,
} from '../actions'
import { SORT_BY_TIMESTAMPS } from '../utils/Helper'
import Sorter from './Sorter'
import PostSummary from './PostSummary'

class AllCategories extends Component {
  componentDidMount() {
    if (Object.keys(this.props.categories).length === 0) {
      this.props.fetchCategoriesFromServer().then(() => this.props.fetchAllPostsFromServer())
    } else if (!this.props.hasAllPosts) {
      this.props.fetchAllPostsFromServer()
    }
  }
  render() {
    const { sortOrder, categories, postsByScore, postsByTimestamp } = this.props
    const posts = sortOrder === SORT_BY_TIMESTAMPS ? postsByTimestamp : postsByScore
    return (
      <div>
        <Sorter/>
        <h2>Categories</h2>
        {categories.map(category => (
          <div key={category.path}>
            <Link
              to={`/categories/${category.path}`}
            >{category.name}</Link>
          </div>
        ))}
        <h2>Posts</h2>
        {posts.map(postId => (
          <PostSummary key={postId} postId={postId}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ sortOrder, categories }) {
  return {
    sortOrder,
    hasAllPosts: ('hasAllPosts' in categories),
    postsByScore: ('postsByScore' in categories) ? categories.postsByScore : [],
    postsByTimestamp: ('postsByTimestamp' in categories) ? categories.postsByTimestamp : [],
    categories: ('byId' in categories) ? Object.keys(categories.byId).map(category_path => ({
      ...categories.byId[category_path]
    })) : [],
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoriesFromServer: () => dispatch(fetchCategoriesFromServer()),
    fetchAllPostsFromServer: () => dispatch(fetchAllPostsFromServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)
