import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategoriesFromServer, fetchCategoryPostsFromServer } from '../actions'
import PostSummary from './PostSummary'

class Category extends Component {
  componentDidMount() {
    const {match, category_path, categories} = this.props
    // If the category path wasn't provided, try to get it from the URL
    const categoryPath = category_path ? category_path : match && match.params && match.params.category_path
    if (categoryPath && Object.keys(categories).length === 0) {
      // We need to fetch categories to know if the category provided is valid
      this.props.fetchCategoriesFromServer()
      this.props.fetchCategoryPostsFromServer(categoryPath)
    } else if (!('hasAllPosts' in categories) && categoryPath in categories.byId && !('posts' in categories.byId[categoryPath])) {
      console.log(categories)
      // If we haven't fetched all posts, the category is valid and we haven't
      // fetched this category yet, then fetch it
      this.props.fetchCategoryPostsFromServer(categoryPath)
    }
  }
  render() {
    const accessedDirectly = this.props.match && this.props.match.params && this.props.match.params.category_path
    const category_path = accessedDirectly ? this.props.match.params.category_path : this.props.category_path
    const category = this.props.categories.byId && this.props.categories.byId[category_path]
    if (!category) {
      return (
        <h4>The category {category_path} does not exist</h4>
      )
    }
    return (
      <div>
        <h3>
          {accessedDirectly && (
            <span>{category.path}</span>
          )}
          {!accessedDirectly && (
            <Link to={`/category/${category.path}`}>{category.path}</Link>
          )}
        </h3>
        {category.posts && category.posts.map(post_id => (
          <PostSummary key={post_id}/>
        ))}
        {accessedDirectly && (
          <h4><Link to='/'>View All Categories</Link></h4>
        )}
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  console.log(categories)
  return {categories}
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoriesFromServer: () => dispatch(fetchCategoriesFromServer()),
    fetchCategoryPostsFromServer: (category_path) => dispatch(fetchCategoryPostsFromServer(category_path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
