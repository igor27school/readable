import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { COMMENT_TYPE } from '../constants/ObjectTypes'
import { Voter } from './Voter'

jest.mock('../utils/ServerAPI')

describe('Voter tests', () => {
  const setup = () => {
    const props = {
      objectType: COMMENT_TYPE,
      id: 'testCommentId',
      vote: jest.fn(),
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('Voter matches the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<Voter {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
