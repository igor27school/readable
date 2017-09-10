import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { SORT_BY_TIMESTAMPS } from '../constants/SortOrders'
import { Sorter } from './Sorter'

jest.mock('../utils/ServerAPI')

describe('Sorter tests', () => {
  const setup = () => {
    const props = {
      sortOrder: SORT_BY_TIMESTAMPS,
      reSort: jest.fn(),
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('Sorter matches the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<Sorter {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
