import reducer from './posts'
import * as ActionTypes from '../constants/ActionTypes'

describe('initialState tests', () => {
  it('default state should equal the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      byId:{},
      allIds: [],
    })
  })
})

describe('RECEIVE_ALL_POSTS (and RECEIVE_CATEGORY_POSTS) tests', () => {
  it('RECEIVE_ALL_POSTS should process as first request', () => {
    expect(reducer(
      undefined,
      {
        type: ActionTypes.RECEIVE_ALL_POSTS,
        posts: [
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
        ],
      })
    ).toEqual({
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
        post2: {
          id: 'post2',
          title: 'post2 title',
          body: 'post2 body',
          author: 'post2 author',
          category: 'category1',
          deleted: false,
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
      {
        type: ActionTypes.RECEIVE_ALL_POSTS,
        posts: [
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
        ],
      }
    )).toEqual({
      byId: {
        post1: 'initial value',
        post2: {
          id: 'post2',
          title: 'post2 title',
          body: 'post2 body',
          author: 'post2 author',
          category: 'category1',
          deleted: false,
          comments: [],
        },
      },
      allIds: ['post1', 'post2'],
    })
  })
})
