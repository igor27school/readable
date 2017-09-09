import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import { createComment } from '../actions/ActionCreators'

class CreateComment extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const { parentId } = this.props.match.params
    const values = serializeForm(e.target, { hash: true })
    this.props.createComment(parentId, values)
    this.props.history.push(`/posts/${parentId}`)
  }
  render() {
    const { parentId } = this.props.match.params
    return (
      <div>
        <Link to={`/posts/${parentId}`}>Close</Link>
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
