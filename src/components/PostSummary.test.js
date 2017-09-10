import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { PostSummary } from './PostSummary'

jest.mock('../utils/ServerAPI')

describe('PostSummary tests', () => {
  const setup = () => {
    const props = {
      post: {
        id: 'testPostId',
        title: 'Test Post Title',
        body: 'testing PostSummary',
        author: 'Test Post Author',
        category: 'testCategory',
        timestamp: 1234,
        deleted: false,
        comments: ['testComment1', 'testComment2'],
        hasAllComments: true,
      },
      postId: 'testPostId',
      numberComments: 2,
      fetchPostFromServer: jest.fn(),
      fetchPostCommentsFromServer: jest.fn(),
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('PostSummary matches the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<PostSummary {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
