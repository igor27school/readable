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
        <h2>CATEGORIES</h2>
        <ul>
          {categories.map(category => (
            <li key={category.path}>
              <Link
                to={`/${category.path}`}
              >{category.name}</Link>
            </li>
          ))}
        </ul>
        <h2>POSTS</h2>
        <Sorter/>
        <ul>
          {posts.map(postId => (
            <li key={postId}>
              <PostSummary postId={postId}/>
            </li>
          ))}
        </ul>
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
