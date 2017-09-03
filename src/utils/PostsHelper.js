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
