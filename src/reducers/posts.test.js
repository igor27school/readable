import * as ObjectTypes from '../constants/ObjectTypes'
import * as VoteTypes from '../constants/VoteTypes'
import * as Actions from '../actions/Actions'
import reducer from './posts'

// Disable warnings since we are testing how reducer handles unexpected conditions
console.warn = jest.fn()

const initialTestState = {
  byId: {},
  allIds: [],
}

describe('initialState tests', () => {
  it('default state should equal the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialTestState)
  })
})

describe('RECEIVE_ALL_POSTS (and RECEIVE_CATEGORY_POSTS) tests', () => {
  it('RECEIVE_ALL_POSTS should process as first request', () => {
    expect(reducer(
      initialTestState,
      Actions.receiveAllPosts([
          {
            id: 'post1',
            title: 'post1 title',
            body: 'post1 body',
            author: 'post1 author',
            category: 'category1',
            deleted: false,
          },
          {
            id: 'post2',
            title: 'post2 title',
            body: 'post2 body',
            author: 'post2 author',
            category: 'category1',
            deleted: false,
          },
        ])
      )
    ).toEqual({
      byId: {
        post1: {
          id: 'post1',
          title: 'post1 title',
          body: 'post1 body',
          author: 'post1 author',
          category: 'category1',
          deleted: false,
          hasAllComments: false,
          comments: [],
        },
        post2: {
          id: 'post2',
          title: 'post2 title',
          body: 'post2 body',
          author: 'post2 author',
          category: 'category1',
          deleted: false,
          hasAllComments: false,
          comments: [],
        },
      },
      allIds: ['post1', 'post2'],
    })
  })

  it('RECEIVE_ALL_POSTS should not over-write existing posts', () => {
    expect(reducer(
      {
        byId: {post1: 'initial value'},
        allIds: ['post1'],
      },
      Actions.receiveAllPosts([
          {
            id: 'post1',
            title: 'post1 title',
            body: 'post1 body',
            author: 'post1 author',
            category: 'category1',
            deleted: false,
          },
          {
            id: 'post2',
            title: 'post2 title',
            body: 'post2 body',
            author: 'post2 author',
            category: 'category1',
            deleted: false,
          },
        ])
      )
    ).toEqual({
      byId: {
        post1: 'initial value',
        post2: {
          id: 'post2',
          title: 'post2 title',
          body: 'post2 body',
          author: 'post2 author',
          category: 'category1',
          deleted: false,
          hasAllComments: false,
          comments: [],
        },
      },
      allIds: ['post1', 'post2'],
    })
  })
})

describe('RECEIVE_POST tests', () => {
  it('RECEIVE_POST should process new posts', () => {
    expect(reducer(initialTestState,
      Actions.receivePost({
          id: 'post1',
          title: 'post1 title',
          body: 'post1 body',
          author: 'post1 author',
          category: 'category1',
          deleted: false,
        })
      )
    ).toEqual({
      byId: {
        post1: {
          id: 'post1',
          title: 'post1 title',
          body: 'post1 body',
          author: 'post1 author',
          category: 'category1',
          deleted: false,
          hasAllComments: false,
          comments: [],
        },
      },
      allIds: ['post1'],
    })
  })

  it('RECEIVE_POST should modify existing post', () => {
    expect(reducer(
      {
        byId: {
          post1: {
            id: 'post1',
            title: 'post1 original title',
            body: 'post1 original body',
            author: 'post1 original author',
            category: 'category1',
            deleted: false,
            comments: [],
          },
        },
        allIds: ['post1'],
      },
      Actions.receivePost({
          id: 'post1',
          title: 'post1 new title',
          body: 'post1 new body',
          author: 'post1 new author',
          category: 'category1',
          deleted: false,
        })
      )
    ).toEqual({
      byId: {
        post1: {
          id: 'post1',
          title: 'post1 new title',
          body: 'post1 new body',
          author: 'post1 new author',
          category: 'category1',
          deleted: false,
          comments: [],
        },
      },
      allIds: ['post1'],
    })
  })
})

describe('RECEIVE_POST_COMMENTS tests', () => {
  it('RECEIVE_POST_COMMENTS should do nothing when post is missing', () => {
    expect(reducer(initialTestState,
      Actions.receivePostComments('post1',
        [
          {
            id: 'comment1',
            body: 'comment1 body',
          },
          {
            id: 'comment2',
            body: 'comment2 body',
          }
        ])
      )
    ).toEqual(initialTestState)
  })

  it('RECEIVE_POST_COMMENTS should receive comments', () => {
    expect(reducer(
      {
        byId: {
          post1: {
            id: 'post1',
            title: 'post1 title',
            body: 'post1 body',
            author: 'post1 author',
            category: 'category1',
            deleted: false,
            comments: [],
          },
        },
        allIds: ['post1'],
      },
      Actions.receivePostComments('post1',
        [
          {
            id: 'comment1',
            body: 'comment1 body',
          },
          {
            id: 'comment2',
            body: 'comment2 body',
          }
        ])
      )
    ).toEqual({
      byId: {
        post1: {
          id: 'post1',
          title: 'post1 title',
          body: 'post1 body',
          author: 'post1 author',
          category: 'category1',
          deleted: false,
          hasAllComments: true,
          comments: ['comment1', 'comment2'],
        },
      },
      allIds: ['post1'],
    })
  })
})

describe('RECEIVE_COMMENT tests', () => {
  it('RECEIVE_COMMENT should do nothing when post is missing', () => {
    expect(reducer(initialTestState,
      Actions.receiveComment({
          id: 'comment1',
          body: 'comment1 body',
          parentId: 'post1',
        })
      )
    ).toEqual(initialTestState)
  })

  it('RECEIVE_COMMENT should receive the comment', () => {
    expect(reducer(
      {
        byId: {
          post1: {
            id: 'post1',
            body: 'post1 body',
            comments: [],
            hasAllComments: false,
          },
        },
        allIds: ['post1'],
      },
      Actions.receiveComment({
          id: 'comment1',
          body: 'comment1 body',
          parentId: 'post1',
        })
      )
    ).toEqual({
      byId: {
        post1: {
          id: 'post1',
          body: 'post1 body',
          comments: ['comment1'],
          hasAllComments: false,
        },
      },
      allIds: ['post1'],
    })
  })
})

describe('REMOVE_OBJECT tests', () => {
  it('REMOVE_OBJECT should do nothing when the object is a comment', () => {
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
      Actions.removeObject(ObjectTypes.POST_TYPE, 'post1'))
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
          post1: {
            id: 'post1',
            voteScore: 1,
          },
        },
        allIds: ['post1'],
      },
      Actions.receiveVote(ObjectTypes.COMMENT_TYPE, 'post1', 0))
    ).toEqual({
      byId: {
        post1: {
          id: 'post1',
          voteScore: 1,
        },
      },
      allIds: ['post1'],
    })
  })

  it('RECEIVE_VOTE should process vote', () => {
    expect(reducer(
      {
        byId: {
          post1: {
            id: 'post1',
            voteScore: 1,
          },
        },
        allIds: ['post1'],
      },
      Actions.receiveVote(ObjectTypes.POST_TYPE, 'post1', 0))
    ).toEqual({
      byId: {
        post1: {
          id: 'post1',
          voteScore: 0,
        },
      },
      allIds: ['post1'],
    })
  })
})
