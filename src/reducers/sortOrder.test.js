import reducer from './sortOrder'
import { CHANGE_SORT_ORDER } from '../constants/ActionTypes'
import { SORT_BY_SCORES, SORT_BY_TIMESTAMPS } from '../constants/SortOrders'
import { changeSortOrder } from '../actions/Actions'

// Disable warnings since we are testing how reducer handles unexpected conditions
console.warn = jest.fn()

describe('initialState tests', () => {
  it('default state should equal the initial state', () => {
    expect(reducer(undefined, {})).toEqual(SORT_BY_SCORES)
  })
})

describe('CHANGE_SORT_ORDER tests', () => {
  it('state should change when requested', () => {
    expect(reducer(SORT_BY_SCORES, changeSortOrder(SORT_BY_TIMESTAMPS))).toEqual(SORT_BY_TIMESTAMPS)
  })

  it('state should change the other way', () => {
    expect(reducer(SORT_BY_TIMESTAMPS, changeSortOrder(SORT_BY_SCORES))).toEqual(SORT_BY_SCORES)
  })
})
