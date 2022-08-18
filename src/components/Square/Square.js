import { useMemo } from "react";
import { useGameContext } from "../../contexts/GameContext";
import "./Square.css";

export default function Square({ row, col }) {
  const gameContext = useGameContext();
  const board = gameContext.board;

  const color = useMemo(() => {
    if (board[row][col] === -1) {
      return "red";
    } else if (board[row][col] === 1) {
      return "blue";
    }
  }, [col, board, row]);

  return (
    <div
      key={row + "" + col}
      className={`square ${color}`}
      onClick={() => {
        gameContext.clicked(row, col);
      }}
    ></div>
  );
}
