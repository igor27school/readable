import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { CreatePost } from './CreatePost'

jest.mock('../utils/ServerAPI')

describe('CreatePost tests', () => {
  const setup = () => {
    const props = {
      hasCategories: true,
      categories: [
        {
          name: 'category1',
          path: 'category1',
        },
        {
          name: 'category2',
          path: 'category2',
        },
      ],
      fetchCategoriesFromServer: jest.fn(),
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('CreatePost matches the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<CreatePost {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
