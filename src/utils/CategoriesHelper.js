export const getCategoriesArray = categories => {
  if (Object.keys(categories).length === 0) {
    return {categories: []}
  }
  return {
    categories: Object.keys(categories.byId).map(category_path => ({
      ...categories.byId[category_path]
    }))
  }
}
