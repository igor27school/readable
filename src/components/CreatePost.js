import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import { fetchCategoriesFromServer, createPost } from '../actions/ActionCreators'

class CreatePost extends Component {
  componentDidMount() {
    const { hasCategories, fetchCategoriesFromServer } = this.props
    if (!hasCategories) {
      fetchCategoriesFromServer()
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    console.log(values)
    // Basic form data validation
    if (values.category === 'none') {
      alert('Please fill out the category!')
      return false
    }
    if (!values.title || values.title.trim() === '') {
      alert('Please include a proper title!')
      return false
    }
    this.props.createPost(values)
    this.props.history.push('/')
  }
  render() {
    const { categories } = this.props
    return (
      <div>
        <Link to="/">Close</Link>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" placeholder="Title"/>
          <input type="text" name="author" placeholder="Author"/>
          <textarea name="body" placeholder="Body"></textarea>
          <select defaultValue="none" name="category">
            <option value="none" disabled>Select category</option>
            {categories.map((category) => (
              <option
                key={category.name}
                value={category.name}
              >{category.name}</option>
            ))}
          </select>
          <button>Publish</button>
        </form>
      </div>

    )
  }
}

function mapStateToProps ({ categories }) {
  return {
    hasCategories: categories.allIds.length > 0,
    categories: categories.allIds.map(category => categories.byId[category]),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoriesFromServer: () => dispatch(fetchCategoriesFromServer()),
    createPost: (values) => dispatch(createPost(values)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
