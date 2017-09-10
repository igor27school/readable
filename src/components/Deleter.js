import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { COMMENT_TYPE, POST_TYPE } from '../constants/ObjectTypes'
import { deleteObject } from '../actions/ActionCreators'

class Deleter extends Component {
  static propTypes = {
    objectType: PropTypes.oneOf([COMMENT_TYPE, POST_TYPE]).isRequired,
    id: PropTypes.string.isRequired,
    deleteObject: PropTypes.func.isRequired,
    history: PropTypes.object,
  }
  handleClick = () => {
    const {objectType, id, deleteObject, history} = this.props
    deleteObject(objectType, id)
    if (history) {
      history.push('/')
    }
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
