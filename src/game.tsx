import { useEffect, useState } from "react"
import { createBoard, toggle, nextGenerationOf } from "./game-of-life"
import "./game.css"

function Game() {
  const [isRunning, setIsRunning] = useState(false)
  const [board, setBoard] = useState(() => createBoard(40, 30))

  useEffect(() => {
    if (isRunning) {
      setTimeout(() => setBoard(nextGenerationOf(board)), 50)
    }
  })

  const handleClick = (x: number, y: number) => {
    if (!isRunning) {
      setBoard(toggle(board, x, y))
    }
  }

  return (
    <div className="mainContainer">
      <div className="board">
        {board[0].map((_, y) => (
          <Row key={y}>
            {board.map((_, x) => (
              <Cell key={`${y}-${x}`} isAlive={board[x][y]} onClick={() => handleClick(x, y)} />
            ))}
          </Row>
        ))}
      </div>
      <br />
      <button
        onClick={() => {
          setIsRunning(!isRunning)
        }}
      >
        {isRunning ? "Pause" : "Resume"}
      </button>
    </div>
  )
}

interface CellProps {
  isAlive: boolean
  onClick: () => void
}

function Cell(props: CellProps) {
  const className = props.isAlive ? "alive cell" : "dead cell"
  return <div className={className} onClick={props.onClick}></div>
}

interface RowProps {
  children: React.ReactNode
}

function Row(props: RowProps) {
  return <div className="row">{props.children}</div>
}

export default Game
