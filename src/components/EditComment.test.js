import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { EditComment } from './EditComment'

jest.mock('../utils/ServerAPI')

describe('EditComment tests', () => {
  const setup = () => {
    const props = {
      comment: {
        id: 'testCommentId',
        body: 'testing adding comment',
        parentId: 'testPostId',
        deleted: false,
      },
      commentId: 'testCommentId',
      category: 'testCategory',
      fetchCommentFromServer: jest.fn(),
      editComment: jest.fn(),
      history: {},
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('EditComment matches the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<EditComment {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
