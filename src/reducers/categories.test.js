import * as Actions from '../actions/Actions'
import reducer from './categories'

// Disable warnings since we are testing how reducer handles unexpected conditions
console.warn = jest.fn()

const initialTestState = {
  byId:{},
  allIds: [],
  hasAllPosts: false,
}

describe('initialState tests', () => {
  it('default state should equal the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialTestState)
  })
})

describe('RECEIVE_CATEGORIES tests', () => {
  it('RECEIVE_CATEGORIES as first request should process', () => {
    expect(reducer(
      initialTestState,
      Actions.receiveCategories([
        {
          name: 'category 1',
          path: 'category1',
        },
        {
          name: 'category 2',
          path: 'category2',
        },
      ]))
    ).toEqual({
      byId: {
        category1: {
          name: 'category 1',
          path: 'category1',
          posts: [],
          hasAllPosts: false,
        },
        category2: {
          name: 'category 2',
          path: 'category2',
          posts: [],
          hasAllPosts: false,
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
      Actions.receiveCategories([
          {
            name: 'category 1',
            path: 'category1',
          },
          {
            name: 'category 2',
            path: 'category2',
          },
        ]
      ))
    ).toEqual({
      byId: {
        category1: {
          name: 'category 1',
          path: 'category1',
          posts: [],
          hasAllPosts: false,
        },
        category2: {
          name: 'category 2',
          path: 'category2',
          posts: [],
          hasAllPosts: false,
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
      reducer(undefined, Actions.receiveAllPosts([
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
    ).toEqual(initialTestState)
  })

  it('RECEIVE_ALL_POSTS should proceed when categories exist', () => {
    expect(reducer(
      {
        byId: {
          category1: {
            name: 'category 1',
            path: 'category1',
            posts: [],
            hasAllPosts: false,
          },
          category2: {
            name: 'category 2',
            path: 'category2',
            posts: [],
            hasAllPosts: false,
          },
        },
        allIds: ['category1', 'category2'],
        hasAllPosts: false,
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
        category1: {
          name: 'category 1',
          path: 'category1',
          posts: [
            'post1',
            'post2',
          ],
          hasAllPosts: true,
        },
        category2: {
          name: 'category 2',
          path: 'category2',
          posts: [],
          hasAllPosts: true,
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
    expect(reducer(initialTestState,
      Actions.receiveCategoryPosts('category1',
        [
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
    ).toEqual(initialTestState)
  })

  it('RECEIVE_CATEGORY_POSTS should proceed when categories exist', () => {
    expect(reducer(
      {
        byId: {
          category1: {
            name: 'category 1',
            path: 'category1',
            posts: [],
            hasAllPosts: false,
          },
          category2: {
            name: 'category 2',
            path: 'category2',
            posts: [],
            hasAllPosts: false,
          },
        },
        allIds: ['category1', 'category2'],
        hasAllPosts: false,
      },
      Actions.receiveCategoryPosts('category1',
        [
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
        category1: {
          name: 'category 1',
          path: 'category1',
          posts: [
            'post1',
            'post2',
          ],
          hasAllPosts: true,
        },
        category2: {
          name: 'category 2',
          path: 'category2',
          posts: [],
          hasAllPosts: false,
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

describe('RECEIVE_POST tests', () => {
  it('RECEIVE_POST when category missing should not change state', () => {
    expect(reducer(
      {
        byId: {
          category2: {
            name: 'category 2',
            path: 'category2',
            posts: [],
            hasAllPosts: false,
          },
        },
        allIds: ['category2'],
        hasAllPosts: false,
      },
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
        category2: {
          name: 'category 2',
          path: 'category2',
          posts: [],
          hasAllPosts: false,
        },
      },
      allIds: ['category2'],
      hasAllPosts: false,
    })
  })

  it('RECEIVE_POST should proceed when category exists', () => {
    expect(reducer(
      {
        byId: {
          category1: {
            name: 'category 1',
            path: 'category1',
            posts: [],
            hasAllPosts: false,
          },
          category2: {
            name: 'category 2',
            path: 'category2',
            posts: [],
            hasAllPosts: false,
          },
        },
        allIds: ['category1', 'category2'],
        hasAllPosts: false,
      },
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
        category1: {
          name: 'category 1',
          path: 'category1',
          posts: [
            'post1',
          ],
          hasAllPosts: false,
        },
        category2: {
          name: 'category 2',
          path: 'category2',
          posts: [],
          hasAllPosts: false,
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
