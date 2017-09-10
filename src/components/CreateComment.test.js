import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { CreateComment } from './CreateComment'

jest.mock('../utils/ServerAPI')

describe('CreateComment tests', () => {
  const setup = () => {
    const props = {
      createComment: jest.fn(),
      match: {
        params: {
          category: 'testCategory',
          parent_id: 'testPostId',
        }
      }
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('CreateComment matches the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<CreateComment {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
