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
      categories,
      fetchCategoriesFromServer,
      fetchCategoryPostsFromServer,
    } = this.props
    const { categoryPath } = this.props.match.params
    if (categoryPath && categories.allIds.length === 0) {
      // We need to fetch categories to know if the category provided is valid
      fetchCategoriesFromServer().then(() => fetchCategoryPostsFromServer(categoryPath))
    } else if (!categories.hasAllPosts && (categoryPath in categories.byId) && !categories.byId[categoryPath].hasAllPosts) {
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
    const { sortOrder, categories, posts } = this.props
    const { categoryPath } = this.props.match.params
    const category = categories.byId && categories.byId[categoryPath]
    if (!category) {
      return (
        <h4>The category {categoryPath} does not exist</h4>
      )
    }
    const postIds = category.posts ? category.posts.map(postId => posts.byId[postId]).filter(post => !post.deleted).sort(compare(sortOrder)).map(post => post.id) : []
    return (
      <div>
        <h3>{category.name}</h3>
        <Sorter/>
        {posts && postIds.map(postId => (
          <PostSummary key={postId} postId={postId}/>
        ))}
        <h4><Link to='/create'>New Post</Link></h4>
        <h4><Link to='/'>View All Categories</Link></h4>
      </div>
    )
  }
}

function mapStateToProps ({ sortOrder, categories, posts }) {
  return {sortOrder, categories, posts}
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoriesFromServer: () => dispatch(fetchCategoriesFromServer()),
    fetchCategoryPostsFromServer: (categoryPath) => dispatch(fetchCategoryPostsFromServer(categoryPath)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
