import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { COMMENT_TYPE } from '../constants/ObjectTypes'
import { Deleter } from './Deleter'

jest.mock('../utils/ServerAPI')

describe('Deleter tests', () => {
  const setup = () => {
    const props = {
      objectType: COMMENT_TYPE,
      id: 'testComment',
      deleteObject: jest.fn(),
    }
    const renderer = new ShallowRenderer()
    return {
      props,
      renderer
    }
  }

  it('Deleter matches the snapshot', () => {
    const { renderer, props } = setup()
    renderer.render(<Deleter {...props}/>)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
