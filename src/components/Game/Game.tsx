import { useState } from "react"
import { Board } from "../Board/Board"

export const Game = () => {

    // const [xIsNext, setXIsNext] = useState<boolean>(true)
    const [history, setHistory] = useState<string[] | any[]>([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState<number>(0)

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove]

    const handlePlay = (nextSquares: string[]) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
    }

    const jumpTo = (nextMove: number) => {
        setCurrentMove(nextMove)
    }

    const moves = history.map((_, move) => {
        let description;

        if (move > 0) {
            description = "Go to Move #" + move
        } else {
            description = "Go to start"
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    )
}