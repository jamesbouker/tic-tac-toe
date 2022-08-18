import { useEffect, useMemo } from "react";
import { useGameContext } from "../../contexts/GameContext";
import Board from "../Board/Board";
import "./Game.css";

export default function Game() {
  const gameContext = useGameContext();
  const winningColor = gameContext.winningColor;
  const player = gameContext.player;

  const color = useMemo(() => {
    return winningColor ?? (player === -1 ? "red" : "blue");
  }, [player, winningColor]);

  return (
    <div className="game">
      <h2
        style={{
          color: color,
        }}
      >
        {gameContext.winner === 0 && (
          <>{gameContext.player === -1 ? "Red" : "Blue"}'s turn!</>
        )}
        {gameContext.winner === -1 && <>RED WON</>}
        {gameContext.winner === 1 && <>BLUE WON</>}
        {gameContext.winner !== 0 && <ReplayButton />}
      </h2>
      <Board activePlayer />
    </div>
  );
}

function ReplayButton() {
  const gameContext = useGameContext();
  useEffect(() => {
    console.log("Replay button Mounted");

    return () => {
      console.log("Replay button un-Mounted");
    };
  }, []);
  return (
    <span style={{ float: "right" }}>
      <button onClick={gameContext.replay}>Replay</button>
    </span>
  );
}
