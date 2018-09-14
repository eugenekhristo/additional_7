const expect = require('chai').expect;
const solver = require('./solver.js')


describe('Test suite for SudokuSolver puzzle', () => {
  const board = [
    [0, 9, 0, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 9, 6, 0, 4, 8, 5],
    [0, 0, 0, 5, 8, 1, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 0],
    [5, 1, 7, 2, 0, 0, 9, 0, 0],
    [6, 0, 2, 0, 0, 0, 3, 7, 0],
    [1, 0, 0, 8, 0, 4, 0, 2, 0],
    [7, 0, 6, 0, 0, 0, 8, 1, 0],
    [3, 0, 0, 0, 9, 0, 0, 0, 0]
  ];

  let emptyPositions

  describe('1) #getEmptyPositions()', () => {
    it('Should return array of subarray cells that are empty([row, col])', () => {
      const expectedPositions = [
        [0,0],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],
        [1,2],[1,5],[2,0],[2,1],[2,2],[2,6],[2,7],[2,8],[3,0],
        [3,1],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[4,4],[4,5],
        [4,7],[4,8],[5,1],[5,3],[5,4],[5,5],[5,8],[6,1],[6,2],
        [6,4],[6,6],[6,8],[7,1],[7,3],[7,4],[7,5],[7,8],[8,1],
        [8,2],[8,3],[8,5],[8,6],[8,7],[8,8]
      ];

      emptyPositions = solver.getEmptyPositions(board)
      expect(emptyPositions).has.lengthOf(expectedPositions.length)
      expect(emptyPositions).to.eql(expectedPositions)
    });
  });

  describe('2) #checkRow()', () => {
    it('Should check if a particular value is valid for a given row', () => {
      expect(solver.checkRow(board, 0, 2)).to.be.ok
      expect(solver.checkRow(board, 0, 9)).to.not.be.ok
    })
  })

  describe('3) #checkCol()', () => {
    it('Should check if a particular value is valid for a given col', () => {
      expect(solver.checkCol(board, 0, 2)).to.be.ok
      expect(solver.checkCol(board, 0, 5)).to.not.be.ok
    })
  })

  describe('4) #check3x3Square()', () => {
    it('Should check if a particular value is valid for its square', () => {
      expect(solver.check3x3Square(board, 3, 2, 3)).to.be.ok
      expect(solver.check3x3Square(board, 3, 2, 5)).to.not.be.ok

      expect(solver.check3x3Square(board, 8, 7, 3)).to.be.ok
      expect(solver.check3x3Square(board, 8, 7, 8)).to.not.be.ok
    })
  })

  describe('5) #checkValue()', () => {
    it('Should check if a particular value is valid depending on boards row, col and square', () => {
      expect(solver.checkValue(board, 0, 0, 8)).to.be.ok
      expect(solver.checkValue(board, 0, 0, 7)).to.not.be.ok

      expect(solver.checkValue(board, 7, 4, 5)).to.be.ok
      expect(solver.checkValue(board, 7, 4, 1)).to.not.be.ok
    })
  })

  describe('6) #solveSudoku()', () => {
    it('Should return solved sudoku puzzle', () => {
      const expectedSolution = [
        [8, 9, 5, 7, 4, 2, 1, 3, 6],
        [2, 7, 1, 9, 6, 3, 4, 8, 5],
        [4, 6, 3, 5, 8, 1, 7, 9, 2],
        [9, 3, 4, 6, 1, 7, 2, 5, 8],
        [5, 1, 7, 2, 3, 8, 9, 6, 4],
        [6, 8, 2, 4, 5, 9, 3, 7, 1],
        [1, 5, 9, 8, 7, 4, 6, 2, 3],
        [7, 4, 6, 3, 2, 5, 8, 1, 9],
        [3, 2, 8, 1, 9, 6, 5, 4, 7]
      ];

      expect(solver.solveSudoku(board)).to.eql(expectedSolution)
    })
  })
});
