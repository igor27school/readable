import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  fetchCategoriesFromServer,
  fetchAllPostsFromServer,
} from '../actions/ActionCreators'
import { compare } from '../utils/Helper'
import Sorter from './Sorter'
import PostSummary from './PostSummary'

/**
* @description The main view displaying all the existing categories and posts.
*/
export class AllCategories extends Component {
  static propTypes = {
    hasCategories: PropTypes.bool.isRequired,
    hasAllPosts: PropTypes.bool.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        posts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        hasAllPosts: PropTypes.bool.isRequired,
      })
    ).isRequired,
    postIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    fetchCategoriesFromServer: PropTypes.func.isRequired,
    fetchAllPostsFromServer: PropTypes.func.isRequired,
  }
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
    const { categories, postIds } = this.props
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
          {postIds.map(postId => (
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
    postIds: posts.allIds.map(postId => posts.byId[postId]).filter(post => !post.deleted).sort(compare(sortOrder)).map(post => post.id),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoriesFromServer: () => dispatch(fetchCategoriesFromServer()),
    fetchAllPostsFromServer: () => dispatch(fetchAllPostsFromServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)
