import reducer from './categories'
import * as ActionTypes from '../constants/ActionTypes'

describe('initialState tests', () => {
  it('default state should equal the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      byId:{},
      allIds: [],
      hasAllPosts: false,
    })
  })
})

describe('RECEIVE_CATEGORIES tests', () => {
  it('RECEIVE_CATEGORIES as first request should process', () => {
    expect(reducer(
      undefined,
      {
        type: ActionTypes.RECEIVE_CATEGORIES,
        categories: [
          {
            name: 'category 1',
            path: 'category1',
          },
          {
            name: 'category 2',
            path: 'category2',
          },
        ],
      })
    ).toEqual({
      byId: {
        category1: {
          name: 'category 1',
          path: 'category1',
          posts: [],
        },
        category2: {
          name: 'category 2',
          path: 'category2',
          posts: [],
        },
      },
      allIds: ['category1', 'category2'],
      hasAllPosts: false,
    })
  })

  it('RECEIVE_CATEGORIES should over-write existing state', () => {
    expect(reducer(
      {
        byIds: {'something': 'else'},
        allIds: ['something'],
      },
      {
        type: ActionTypes.RECEIVE_CATEGORIES,
        categories: [
          {
            name: 'category 1',
            path: 'category1',
          },
          {
            name: 'category 2',
            path: 'category2',
          },
        ],
      }
    )).toEqual({
      byId: {
        category1: {
          name: 'category 1',
          path: 'category1',
          posts: [],
        },
        category2: {
          name: 'category 2',
          path: 'category2',
          posts: [],
        },
      },
      allIds: ['category1', 'category2'],
      hasAllPosts: false,
    })
  })
})

describe('RECEIVE_ALL_POSTS tests', () => {
  it('RECEIVE_ALL_POSTS as first request should not change state', () => {
    expect(
      reducer(undefined, {
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
      byId:{},
      allIds: [],
      hasAllPosts: false,
    })
  })

  it('RECEIVE_ALL_POSTS should proceed when categories exist', () => {
    expect(reducer(
      {
        byId: {
          category1: {
            name: 'category 1',
            path: 'category1',
            posts: [],
          },
          category2: {
            name: 'category 2',
            path: 'category2',
            posts: [],
          },
        },
        allIds: ['category1', 'category2'],
        hasAllPosts: false,
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
      })
    ).toEqual({
      byId: {
        category1: {
          name: 'category 1',
          path: 'category1',
          posts: [
            'post1',
            'post2',
          ],
        },
        category2: {
          name: 'category 2',
          path: 'category2',
          posts: [],
        }
      },
      allIds: [
        'category1',
        'category2',
      ],
      hasAllPosts: true,
    })
  })
})

describe('RECEIVE_CATEGORY_POSTS tests', () => {
  it('RECEIVE_CATEGORY_POSTS for invalid category should not change state', () => {
    expect(reducer(
      {
        byId:{},
        allIds: [],
        hasAllPosts: false,
      },
      {
        type: ActionTypes.RECEIVE_CATEGORY_POSTS,
        categoryPath: 'category1',
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
      byId:{},
      allIds: [],
      hasAllPosts: false,
    })
  })

  it('RECEIVE_CATEGORY_POSTS should proceed when categories exist', () => {
    expect(reducer(
      {
        byId: {
          category1: {
            name: 'category 1',
            path: 'category1',
            posts: [],
          },
          category2: {
            name: 'category 2',
            path: 'category2',
            posts: [],
          },
        },
        allIds: ['category1', 'category2'],
        hasAllPosts: false,
      },
      {
        type: ActionTypes.RECEIVE_CATEGORY_POSTS,
        categoryPath: 'category1',
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
        category1: {
          name: 'category 1',
          path: 'category1',
          posts: [
            'post1',
            'post2',
          ],
        },
        category2: {
          name: 'category 2',
          path: 'category2',
          posts: [],
        }
      },
      allIds: [
        'category1',
        'category2',
      ],
      hasAllPosts: false,
    })
  })
})

describe('ADD_POST tests', () => {
  it('ADD_POST when category missing should not change state', () => {
    expect(reducer(
      {
        byId: {
          category2: {
            name: 'category 2',
            path: 'category2',
            posts: [],
          },
        },
        allIds: ['category2'],
        hasAllPosts: false,
      },
      {
        type: ActionTypes.ADD_POST,
        post: {
          id: 'post1',
          title: 'post1 title',
          body: 'post1 body',
          author: 'post1 author',
          category: 'category1',
          deleted: false,
        },
      })
    ).toEqual({
      byId: {
        category2: {
          name: 'category 2',
          path: 'category2',
          posts: [],
        },
      },
      allIds: ['category2'],
      hasAllPosts: false,
    })
  })

  it('ADD_POST should proceed when category exists', () => {
    expect(reducer(
      {
        byId: {
          category1: {
            name: 'category 1',
            path: 'category1',
            posts: [],
          },
          category2: {
            name: 'category 2',
            path: 'category2',
            posts: [],
          },
        },
        allIds: ['category1', 'category2'],
        hasAllPosts: false,
      },
      {
        type: ActionTypes.ADD_POST,
        post: {
          id: 'post1',
          title: 'post1 title',
          body: 'post1 body',
          author: 'post1 author',
          category: 'category1',
          deleted: false,
        },
      })
    ).toEqual({
      byId: {
        category1: {
          name: 'category 1',
          path: 'category1',
          posts: [
            'post1',
          ],
        },
        category2: {
          name: 'category 2',
          path: 'category2',
          posts: [],
        },
      },
      allIds: [
        'category1',
        'category2',
      ],
      hasAllPosts: false,
    })
  })
})
