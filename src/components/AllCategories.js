import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CategoriesHelper from '../utils/CategoriesHelper'
import { fetchCategoriesFromServer, fetchAllPostsFromServer } from '../actions'
import Category from './Category'

class AllCategories extends Component {
  componentDidMount() {
    if (Object.keys(this.props.categories).length === 0) {
      this.props.fetchCategoriesFromServer()
      this.props.fetchAllPostsFromServer()
    } else if (!this.props.categories.hasAllPosts) {
      this.props.fetchAllPostsFromServer()
    }
  }
  render() {
    return (
      <div>
        {this.props.categories.map(category => (
          <Category key={category.path} category_path={category.path}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return CategoriesHelper.getCategoriesArray(categories)
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoriesFromServer: () => dispatch(fetchCategoriesFromServer()),
    fetchAllPostsFromServer: () => dispatch(fetchAllPostsFromServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)
