/**
 * @typedef {Object} Config
 * @property {Array<number>} verticesVect
 * @property {Array<Array<number>>} innerLinesVect
 */

/**
 * @type {Array<Config>}
 */
const configs = [
  {
    verticesVect: [6, 1, 2, 3],
    innerLinesVect: [
      [0, 5],
      [4, 5],
      [3, 4],
      [0, 6],
      [1, 6],
      [1, 2],
      [2, 3],
      [0, 3]
    ]
  },
  {
    verticesVect: [3, 4, 5, 6],
    innerLinesVect: [
      [0, 2],
      [6, 1],
      [1, 2],
      [0, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [0, 6]
    ]
  },
  {
    verticesVect: [0, 6, 1, 2],
    innerLinesVect: [
      [0, 4],
      [6, 5],
      [2, 3],
      [3, 4],
      [4, 5],
      [1, 6],
      [1, 2]
    ]
  },
  {
    verticesVect: [0, 1, 2, 3],
    innerLinesVect: [
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 1],
      [0, 5],
      [1, 2],
      [2, 3],
      [0, 3],
      [0, 1]
    ]
  },
  {
    verticesVect: [0, 4, 5, 6, 1, 2],
    innerLinesVect: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [6, 1],
      [5, 6],
      [0, 4]
    ]
  }
];

module.exports = configs;
