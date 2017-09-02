export const getProcessedCategories = categories => {
  return {
    hasAllPosts: ('hasAllPosts' in categories),
    categories: ('byId' in categories) ? Object.keys(categories.byId).map(category_path => ({
      ...categories.byId[category_path]
    })) : [],
  }
}
