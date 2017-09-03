import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategoriesFromServer, fetchCategoryPostsFromServer } from '../actions'
import PostSummary from './PostSummary'

class Category extends Component {
  componentDidMount() {
    const { categories } = this.props
    const { categoryPath } = this.props.match.params
    if (categoryPath && Object.keys(categories).length === 0) {
      // We need to fetch categories to know if the category provided is valid
      this.props.fetchCategoriesFromServer().then(() => this.props.fetchCategoryPostsFromServer(categoryPath))
    } else if (!('hasAllPosts' in categories) && (categoryPath in categories.byId) && !('postsByScore' in categories.byId[categoryPath])) {
      /* If:
      * 1) We haven't fetched all posts
      * 2) The category is valid
      * 3) We haven't fetched this category yet
      * then fetch it!
      */
      this.props.fetchCategoryPostsFromServer(categoryPath)
    }
  }
  render() {
    const { categories } = this.props
    const { categoryPath } = this.props.match.params
    const category = categories.byId && categories.byId[categoryPath]
    if (!category) {
      return (
        <h4>The category {categoryPath} does not exist</h4>
      )
    }
    return (
      <div>
        <h3>{category.name}</h3>
        {category.postsByScore && category.postsByScore.map(postId => (
          <PostSummary key={postId} postId={postId}/>
        ))}
        <h4><Link to='/'>View All Categories</Link></h4>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return {categories}
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoriesFromServer: () => dispatch(fetchCategoriesFromServer()),
    fetchCategoryPostsFromServer: (categoryPath) => dispatch(fetchCategoryPostsFromServer(categoryPath)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
