import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import { fetchCategoriesFromServer, createPost } from '../actions/ActionCreators'

class CreatePost extends Component {
  componentDidMount() {
    const { categories, fetchCategoriesFromServer } = this.props
    if (categories.length === 0) {
      fetchCategoriesFromServer()
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    this.props.createPost(values)
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <Link to="/">Close</Link>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" placeholder="Title"/>
          <input type="text" name="author" placeholder="Author"/>
          <textarea name="body" placeholder="Body"></textarea>
          <select defaultValue="none" name="category">
            <option value="none" disabled>Select category</option>
            {this.props.categories.map((category) => (
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
    categories: ('byId' in categories) ? Object.keys(categories.byId).map(category_path => categories.byId[category_path]) : [],
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoriesFromServer: () => dispatch(fetchCategoriesFromServer()),
    createPost: (values) => dispatch(createPost(values)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
