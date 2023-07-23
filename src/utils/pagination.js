/**
 * 
 * @param {Number} page page
 * @param {Number} limit limit of page.
 * @returns {startIndex, endIndex}
 */
export const displayItemPage = (page, limit) => {
  if (!page && !limit) return {startIndex: 0, endIndex: 0};
  return {
    startIndex: (page - 1) * limit,
    endIndex: ((page - 1) * limit) + limit,
  }
};