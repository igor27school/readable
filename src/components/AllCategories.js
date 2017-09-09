import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchCategoriesFromServer,
  fetchAllPostsFromServer,
} from '../actions/ActionCreators'
import { compare } from '../utils/Helper'
import Sorter from './Sorter'
import PostSummary from './PostSummary'

class AllCategories extends Component {
  componentDidMount() {
    const {
      hasCategories,
      hasAllPosts,
      fetchCategoriesFromServer,
      fetchAllPostsFromServer,
    } = this.props
    if (!hasCategories) {
      fetchCategoriesFromServer().then(() => fetchAllPostsFromServer())
    } else if (!hasAllPosts) {
      fetchAllPostsFromServer()
    }
  }
  render() {
    const { categories, posts } = this.props
    return (
      <div>
        <Sorter/>
        <h2>Categories</h2>
        {categories.map(category => (
          <div key={category.path}>
            <Link
              to={`/${category.path}`}
            >{category.name}</Link>
          </div>
        ))}
        <h2>Posts</h2>
        {posts.map(postId => (
          <PostSummary key={postId} postId={postId}/>
        ))}
        <h4><Link to='/create'>New Post</Link></h4>
      </div>
    )
  }
}

function mapStateToProps ({ sortOrder, categories, posts }) {
  return {
    hasCategories: categories.allIds.length > 0,
    hasAllPosts: categories.hasAllPosts,
    categories: categories.allIds.map(category => categories.byId[category]),
    posts: posts.allIds.map(postId => posts.byId[postId]).filter(post => !post.deleted).sort(compare(sortOrder)).map(post => post.id),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoriesFromServer: () => dispatch(fetchCategoriesFromServer()),
    fetchAllPostsFromServer: () => dispatch(fetchAllPostsFromServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)
