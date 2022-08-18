import "./App.css";
import Game from "./components/Game/Game";
import { GameContextProvider } from "./contexts/GameContext";

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <GameContextProvider>
        <Game />
      </GameContextProvider>
    </div>
  );
}

export default App;
