import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { EditPost } from './EditPost'

jest.mock('../utils/ServerAPI')

describe('EditPost tests', () => {
  const setup = () => {
    const props = {
      post: {
        id: 'testPostId',
        body: 'testing edit post',
        category: 'testCategory',
        deleted: false,
      },
      postId: 'testPostId',
      fetchPostFromServer: jest.fn(),
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('EditPost matches the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<EditPost {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
