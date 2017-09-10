import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { Comment } from './Comment'

jest.mock('../utils/ServerAPI')

describe('Comment tests', () => {
  const setup = () => {
    const props = {
      comment: {
        id: 'testId',
        body: 'test body',
        author: 'test author',
        timestamp: 1234,
        voteScore: 2,
        deleted: false,
        parentId: 'testPostId',
      },
      commentId: 'testId',
      category: 'testCategory',
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('Comment matches the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<Comment {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
