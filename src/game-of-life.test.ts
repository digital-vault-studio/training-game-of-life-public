import { createBoard, toggle, nextGenerationOf } from "./game-of-life"

test("can create a board", () => {
  const width = 60
  const height = 40
  let board = createBoard(width, height)

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      expect(board[x][y]).toBe(false)
    }
  }
})

test("can toggle cells independently", () => {
  let board = createBoard(5, 5)

  let newBoard = toggle(board, 1, 1)
  expect(newBoard[1][1]).toBe(true)
  expect(newBoard[1][2]).toBe(false)
  expect(newBoard[2][1]).toBe(false)

  expect(newBoard).not.toBe(board)
})

test("Any live cell with fewer than two live neighbours dies, as if by underpopulation", () => {
  // |_|_|_|_|_|
  // |_|_|_|_|_|
  // |_|_|A|_|_|  // Both, A and B have only one neighbour
  // |_|B|_|_|_|  // therefore they will die in the next generation
  // |_|_|_|_|_|

  let board = createBoard(5, 5)

  board = toggle(board, 2, 2)
  board = toggle(board, 1, 3)
  let nextBoard = nextGenerationOf(board)

  expect(nextBoard[2][2]).toBe(false)
  expect(nextBoard[1][3]).toBe(false)
  expect(nextBoard).not.toBe(board)
})

// test('Any live cell with exactly two live neighbours lives on to the next generation', () => {
//
// });

// test('Any live cell with exactly three live neighbours remains alive in the next generation', () => {
//
// });

// test('Any dead cell with exactly three live neighbours lives as if by reproduction', () => {
//
// });

// test('Any live cell with more than three live neighbours dies, as if by overpopulation', () => {
//
// });
