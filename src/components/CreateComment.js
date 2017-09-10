import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createComment } from '../actions/ActionCreators'

class CreateComment extends Component {
  static propTypes = {
    createComment: PropTypes.func.isRequired,
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const category = this.props.match.params.category
    const parentId = this.props.match.params.parent_id
    const values = serializeForm(e.target, { hash: true })
    // Basic form data validation
    if (!values.body || values.body.trim() === '') {
      alert('Say something!')
      return false
    }
    this.props.createComment(parentId, values)
    this.props.history.push(`/${category}/${parentId}`)
  }
  render() {
    const category = this.props.match.params.category
    const parentId = this.props.match.params.parent_id
    return (
      <div>
        <Link to={`/${category}/${parentId}`}>Close</Link>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="author" placeholder="Author"/>
          <textarea name="body" placeholder="Body"></textarea>
          <button>Publish</button>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createComment: (parentId, values) => dispatch(createComment(parentId, values)),
  }
}

export default connect(null, mapDispatchToProps)(CreateComment)
