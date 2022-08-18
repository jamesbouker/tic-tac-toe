import { useMemo } from "react";
import { useGameContext } from "../../contexts/GameContext";
import Square from "../Square/Square";
import "./Board.css";

export default function Board() {
  const gameContext = useGameContext();
  const winningColorFromContext = gameContext?.winningColor ?? "";

  const winningColor = useMemo(() => {
    if (winningColorFromContext.length > 0) {
      return `${winningColorFromContext}-won`;
    }
    return "";
  }, [winningColorFromContext]);

  const grid = useMemo(() => {
    let squares = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        squares.push(<Square key={row + "" + col} row={row} col={col} />);
      }
    }
    return squares;
  }, []);

  return <div className={`board ${winningColor}`}>{grid}</div>;
}
