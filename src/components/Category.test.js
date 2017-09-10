import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { Category } from './Category'

jest.mock('../utils/ServerAPI')

describe('Category tests', () => {
  const setup = () => {
    const props = {
      hasCategories: true,
      category: {
        name: 'category1',
        path: 'category1',
        posts: ['post1', 'post2'],
        hasAllPosts: true,
      },
      categoryPath: 'testPath',
      postIds: ['post1', 'post2'],
      fetchCategoriesFromServer: jest.fn(),
      fetchCategoryPostsFromServer: jest.fn(),
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('Category matches the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<Category {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
