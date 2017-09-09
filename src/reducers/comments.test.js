import * as ObjectTypes from '../constants/ObjectTypes'
import * as Actions from '../actions/Actions'
import reducer from './comments'

// Disable warnings since we are testing how reducer handles unexpected conditions
console.warn = jest.fn()

const initialTestState = { byId:{} }

describe('initialState tests', () => {
  it('default state should equal the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialTestState)
  })
})

describe('RECEIVE_POST_COMMENTS tests', () => {
  it('RECEIVE_POST_COMMENTS as first request should process', () => {
    expect(reducer(initialTestState,
      Actions.receivePostComments('post1', [
          {
            id: 'comment1',
            body: 'comment1 body',
            parentId: 'post1',
          },
          {
            id: 'comment2',
            body: 'comment2 body',
            parentId: 'post1',
          },
        ])
      )
    ).toEqual({
      byId:{
        comment1: {
          id: 'comment1',
          body: 'comment1 body',
          parentId: 'post1',
        },
        comment2: {
          id: 'comment2',
          body: 'comment2 body',
          parentId: 'post1',
        },
      },
    })
  })

  it('RECEIVE_POST_COMMENTS should over-write existing state', () => {
    expect(reducer(
      {
        byId: {
          comment1: {
            id: 'comment1',
            body: 'comment1 old body',
            parentId: 'post1',
          },
          comment3: {
            id: 'comment3',
            body: 'comment3 body',
          },
        },
      },
      Actions.receivePostComments('post1', [
          {
            id: 'comment1',
            body: 'comment1 new body',
            parentId: 'post1',
          },
          {
            id: 'comment2',
            body: 'comment2 body',
            parentId: 'post1',
          },
        ])
      )
    ).toEqual({
      byId:{
        comment1: {
          id: 'comment1',
          body: 'comment1 new body',
          parentId: 'post1',
        },
        comment2: {
          id: 'comment2',
          body: 'comment2 body',
          parentId: 'post1',
        },
        comment3: {
          id: 'comment3',
          body: 'comment3 body',
        },
      },
    })
  })
})

describe('RECEIVE_COMMENT tests', () => {
  it('RECEIVE_COMMENT should process', () => {
    expect(reducer(
      initialTestState,
      Actions.receiveComment({
          id: 'comment1',
          body: 'comment1 body',
          parentId: 'post1',
        })
      )
    ).toEqual({
      byId:{
        comment1: {
          id: 'comment1',
          body: 'comment1 body',
          parentId: 'post1',
        },
      },
    })
  })

  it('RECEIVE_COMMENT should over-write existing one', () => {
    expect(reducer(
      {
        byId: {
          comment1: {
            id: 'comment1',
            body: 'comment1 old body',
            parentId: 'post1',
          },
        },
      },
      Actions.receiveComment({
          id: 'comment1',
          body: 'comment1 new body',
          parentId: 'post1',
        })
      )
    ).toEqual({
      byId:{
        comment1: {
          id: 'comment1',
          body: 'comment1 new body',
          parentId: 'post1',
        },
      },
    })
  })
})

describe('REMOVE_OBJECT tests', () => {
  it('REMOVE_OBJECT should do nothing when the object is a post', () => {
    expect(reducer(
      {
        byId: {
          post1: {
            id: 'post1',
            body: 'post1 body',
            deleted: false,
            comments: ['comment1'],
          },
        },
        allIds: ['post1'],
      },
      Actions.removeObject(ObjectTypes.POST_TYPE, 'post1'))
    ).toEqual({
      byId: {
        post1: {
          id: 'post1',
          body: 'post1 body',
          deleted: false,
          comments: ['comment1'],
        },
      },
      allIds: ['post1'],
    })
  })

  it('REMOVE_OBJECT should remove the object', () => {
    expect(reducer(
      {
        byId: {
          post1: {
            id: 'post1',
            body: 'post1 body',
            deleted: false,
            comments: ['comment1'],
          },
        },
        allIds: ['post1'],
      },
      Actions.removeObject(ObjectTypes.COMMENT_TYPE, 'post1'))
    ).toEqual({
      byId: {
        post1: {
          id: 'post1',
          body: 'post1 body',
          comments: ['comment1'],
          deleted: true,
        },
      },
      allIds: ['post1'],
    },)
  })
})

describe('RECEIVE_VOTE tests', () => {
  it('RECEIVE_VOTE should do nothing when the object is a comment', () => {
    expect(reducer(
      {
        byId: {
          comment1: {
            id: 'comment1',
            voteScore: 1,
          },
        },
      },
      Actions.receiveVote(ObjectTypes.POST_TYPE, 'comment1', 0))
    ).toEqual({
      byId: {
        comment1: {
          id: 'comment1',
          voteScore: 1,
        },
      },
    })
  })

  it('RECEIVE_VOTE should process vote', () => {
    expect(reducer(
      {
        byId: {
          comment1: {
            id: 'comment1',
            voteScore: 1,
          },
        },
      },
      Actions.receiveVote(ObjectTypes.COMMENT_TYPE, 'comment1', 0))
    ).toEqual({
      byId: {
        comment1: {
          id: 'comment1',
          voteScore: 0,
        },
      },
    })
  })
})
