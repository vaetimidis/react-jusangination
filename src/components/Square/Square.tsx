
interface ISquare {
    value: string,
    onSquareClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const Square = ({value, onSquareClick} : ISquare) => {
    return (
        <button className="square" onClick={onSquareClick}>{value}</button>
    )
}