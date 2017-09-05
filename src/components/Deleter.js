import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteObject } from '../actions'

class Deleter extends Component {
  handleClick = () => {
    const {objectType, id, deleteObject} = this.props
    deleteObject(objectType, id)
  }
  render() {
    return (
      <button onClick={this.handleClick}>Remove</button>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deleteObject: (objectType, id) => dispatch(deleteObject(objectType, id)),
  }
}

export default connect(null, mapDispatchToProps)(Deleter)
