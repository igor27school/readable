// Used for sorting posts and comments
export const SORT_BY_SCORES = "SORT_BY_SCORES"
export const SORT_BY_TIMESTAMPS = "SORT_BY_TIMESTAMPS"

// Used for voting for posts and comments
export const POST_TYPE = "POST_TYPE"
export const COMMENT_TYPE = "COMMENT_TYPE"
export const VOTE_UP = "VOTE_UP"
export const VOTE_DOWN = "VOTE_DOWN"

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
