import uuid from 'uuid/v1'

// Used for sorting posts and comments
export const SORT_BY_SCORES = "SORT_BY_SCORES"
export const SORT_BY_TIMESTAMPS = "SORT_BY_TIMESTAMPS"

export const compare = sortBy => (a, b) => {
  switch (sortBy) {
    case SORT_BY_SCORES:
      return b.voteScore - a.voteScore
    case SORT_BY_TIMESTAMPS:
      return b.timestamp - a.timestamp
    default:
      console.log("Didn't get a valid comparison property")
      return 0
  }
}

export const buildComment = (parentPostId, {author, body}) => ({
  id: uuid(),
  timestamp: Date.now(),
  author,
  body,
  parentId: parentPostId,
})

export const buildPost = ({title, author, body, category}) => ({
  id: uuid(),
  timestamp: Date.now(),
  title,
  author,
  body,
  category,
})

export const buildEditComment = ({body}) => ({
  timestamp: Date.now(),
  body,
})

export const buildEditPost = ({title, body}) => ({
  title,
  body,
})
