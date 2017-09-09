import { CHANGE_SORT_ORDER } from '../constants/ActionTypes'
import { SORT_BY_SCORES } from '../constants/SortOrders'

function sortOrder(state=SORT_BY_SCORES, action) {
  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return action.sortBy
    default:
      return state
  }
}

export default sortOrder
