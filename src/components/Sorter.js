import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reSort } from '../actions/ActionCreators'
import { SORT_BY_SCORES, SORT_BY_TIMESTAMPS } from '../constants/SortOrders'

class Sorter extends Component {
  render() {
    return (
      <select
        defaultValue={this.props.sortOrder}
        onChange={event => this.props.reSort(event.target.value)}
      >
        <option value={SORT_BY_SCORES}>Sort by highest score</option>
        <option value={SORT_BY_TIMESTAMPS}>Sort by most recent</option>
      </select>
    )
  }
}

function mapStateToProps ({ sortOrder }) {
  return {sortOrder}
}

function mapDispatchToProps (dispatch) {
  return {
    reSort: (sortBy) => dispatch(reSort(sortBy)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sorter)
