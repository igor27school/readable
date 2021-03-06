import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchCategoriesFromServer, fetchCategoryPostsFromServer } from '../actions/ActionCreators'
import { compare } from '../utils/Helper'
import Sorter from './Sorter'
import PostSummary from './PostSummary'

/**
* @description Category view displaying all of the posts in the provided category.
*/
export class Category extends Component {
  static propTypes = {
    hasCategories: PropTypes.bool.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      posts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      hasAllPosts: PropTypes.bool.isRequired,
    }),
    categoryPath: PropTypes.string.isRequired,
    postIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    fetchCategoriesFromServer: PropTypes.func.isRequired,
    fetchCategoryPostsFromServer: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const {
      hasCategories,
      category,
      categoryPath,
      fetchCategoriesFromServer,
      fetchCategoryPostsFromServer,
    } = this.props
    if (!hasCategories) {
      // We need to fetch categories validate the category provided
      fetchCategoriesFromServer().then(categories => {
        // Don't fetch posts if the category is invalid
        if (categories.filter(category => category.path === categoryPath).length > 0) {
          fetchCategoryPostsFromServer(categoryPath)
        }
      })
    } else if (category && !category.hasAllPosts) {
      this.props.fetchCategoryPostsFromServer(categoryPath)
    }
  }
  render() {
    const { category, categoryPath, postIds } = this.props
    if (!category) {
      return (
        <h4>The category {categoryPath} does not exist</h4>
      )
    }
    return (
      <div>
        <h2>{category.name.toUpperCase()}</h2>
        <Sorter/>
        <ul>
          {postIds.map(postId => (
            <li key={postId}>
              <PostSummary postId={postId}/>
            </li>
          ))}
        </ul>
        <h4><Link to='/create'>New Post</Link></h4>
        <h4><Link to='/'>View All Categories</Link></h4>
      </div>
    )
  }
}

function mapStateToProps ({ sortOrder, categories, posts }, { match }) {
  return {
    hasCategories: categories.allIds.length > 0,
    category: categories.byId[match.params.category],
    categoryPath: match.params.category,
    postIds: (match.params.category in categories.byId) ? categories.byId[match.params.category].posts.map(postId => posts.byId[postId]).filter(post => !post.deleted).sort(compare(sortOrder)).map(post => post.id) : []
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoriesFromServer: () => dispatch(fetchCategoriesFromServer()),
    fetchCategoryPostsFromServer: categoryPath => dispatch(fetchCategoryPostsFromServer(categoryPath)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
