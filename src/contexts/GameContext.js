import { createContext, useContext, useEffect, useMemo, useState } from "react";

const DEFAULT_BOARD = () => [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export const GameContext = createContext({
  player: -1,
  setPlayer: (number) => {},
  winner: 0,
  board: DEFAULT_BOARD(),
  clicked: (row, col) => {},
  winningColor: "",
  replay: () => {},
});

export function useGameContext() {
  return useContext(GameContext);
}

export function GameContextProvider(props) {
  const [winner, setWinner] = useState(0);
  const [player, setPlayer] = useState(-1);
  const [board, setBoard] = useState(DEFAULT_BOARD());

  const winningColor = useMemo(() => {
    if (winner === -1) {
      return "red";
    } else if (winner === 1) {
      return "blue";
    }
    return null;
  }, [winner]);

  useEffect(() => {
    document.body.style.color = winningColor ?? "black";
  }, [winningColor]);

  function replay() {
    setWinner(0);
    setPlayer(-1);
    setBoard(DEFAULT_BOARD());
  }

  const contextValue = {
    player,
    setPlayer,
    winner,
    board,
    clicked,
    winningColor,
    replay,
  };

  function checkRows() {
    for (let row = 0; row < 3; row++) {
      let sum = 0;
      for (let col = 0; col < 3; col++) {
        sum += board[row][col];
      }
      if (Math.abs(sum) === 3) {
        setWinner(Math.sign(sum));
        return;
      }
    }
  }

  function checkCols() {
    for (let col = 0; col < 3; col++) {
      let sum = 0;
      for (let row = 0; row < 3; row++) {
        sum += board[row][col];
      }
      if (Math.abs(sum) === 3) {
        setWinner(Math.sign(sum));
        return;
      }
    }
  }

  function checkDiags() {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += board[i][i];
    }
    if (Math.abs(sum) === 3) {
      setWinner(Math.sign(sum));
      return;
    }

    sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += board[2 - i][i];
    }
    if (Math.abs(sum) === 3) {
      setWinner(Math.sign(sum));
    }
  }

  function checkGameOver() {
    checkRows();
    checkCols();
    checkDiags();
  }

  function clicked(row, col) {
    if (board[row][col] !== 0 || winner !== 0) {
      return;
    }

    let temp = [...board];
    temp[row][col] = player;

    // Update managed state
    setBoard(temp);
    setPlayer(player * -1);
    checkGameOver();
  }

  return (
    <GameContext.Provider value={contextValue}>
      {props.children}
    </GameContext.Provider>
  );
}
