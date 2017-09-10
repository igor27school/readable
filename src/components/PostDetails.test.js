import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { PostDetails } from './PostDetails'

jest.mock('../utils/ServerAPI')

describe('PostDetails tests', () => {
  const setup = () => {
    const props = {
      post: {
        id: 'testPostId',
        title: 'Test Post Title',
        body: 'testing PostDetails',
        author: 'Test Post Author',
        category: 'testCategory',
        timestamp: 1234,
        deleted: false,
        comments: ['testComment1', 'testComment2'],
        hasAllComments: true,
      },
      postId: 'testPostId',
      commentIds: ['testComment1', 'testComment2'],
      fetchPostFromServer: jest.fn(),
      fetchPostCommentsFromServer: jest.fn(),
      history: {},
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('PostDetails matches the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<PostDetails {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
