import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { AllCategories } from './AllCategories'

jest.mock('../utils/ServerAPI')

describe('AllCategories tests', () => {
  const setup = () => {
    const props = {
      hasCategories: true,
      hasAllPosts: true,
      categories: [
        {
          name: 'category1',
          path: 'category1',
          posts: ['post1', 'post2'],
          hasAllPosts: true,
        },
        {
          name: 'category2',
          path: 'category2',
          posts: [],
          hasAllPosts: true,
        },
      ],
      postIds: ['post1', 'post2'],
      fetchCategoriesFromServer: jest.fn(),
      fetchAllPostsFromServer: jest.fn(),
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('AllCategories matches the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<AllCategories {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
