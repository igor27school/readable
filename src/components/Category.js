import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategoriesFromServer, fetchCategoryPostsFromServer } from '../actions/ActionCreators'
import { compare } from '../utils/Helper'
import Sorter from './Sorter'
import PostSummary from './PostSummary'

class Category extends Component {
  componentDidMount() {
    const {
      hasCategories,
      category,
      categoryPath,
      fetchCategoriesFromServer,
      fetchCategoryPostsFromServer,
    } = this.props
    if (!hasCategories) {
      // We need to fetch categories to know if the category provided is valid
      fetchCategoriesFromServer().then(() => fetchCategoryPostsFromServer(categoryPath))
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
    postIds: (match.params.category in categories.byId) ? categories.byId[match.params.category].posts.map(postId => posts.byId[postId]).filter(post => !post.deleted).sort(compare(sortOrder)).map(post => post.id) : 0
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoriesFromServer: () => dispatch(fetchCategoriesFromServer()),
    fetchCategoryPostsFromServer: (categoryPath) => dispatch(fetchCategoryPostsFromServer(categoryPath)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
