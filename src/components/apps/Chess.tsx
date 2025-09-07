import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

interface ChessProps {
  onExit: () => void;
}

const ChessGame: React.FC<ChessProps> = ({ onExit }) => {
  const [game, setGame] = useState(new Chess());
  const [status, setStatus] = useState('Choose your side to begin.');
  const [playerColor, setPlayerColor] = useState<'w' | 'b' | null>(null);

  // Bot move logic
  useEffect(() => {
    // Make a move if it's the bot's turn
    if (playerColor && game.turn() !== playerColor && !game.isGameOver()) {
      const timeoutId = setTimeout(makeRandomMove, 500);
      return () => clearTimeout(timeoutId);
    }
    updateStatus();
  }, [game, playerColor]);


  function updateStatus() {
    if (!playerColor) {
        setStatus('Choose your side to begin.');
        return;
    }

    let newStatus = '';
    const turn = game.turn() === 'w' ? 'White' : 'Black';

    if (game.isCheckmate()) {
      newStatus = `Checkmate! ${turn === 'White' ? 'Black' : 'White'} wins.`;
    } else if (game.isDraw()) {
      newStatus = 'Draw!';
    } else {
      newStatus = `${turn} to move`;
      if (game.inCheck()) {
        newStatus += ' - Check!';
      }
    }
    setStatus(newStatus);
  }

  function makeAMove(move: any) {
    try {
      const gameCopy = new Chess(game.fen());
      const result = gameCopy.move(move);
      if (result) {
        setGame(gameCopy);
        return result;
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    // Prevent moves if game is over or it's not the player's turn
    if (game.isGameOver() || game.turn() !== playerColor) return false;

    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to a queen for simplicity
    });

    return move !== null;
  }
  
  function resetGame() {
    setGame(new Chess());
    setPlayerColor(null);
  }

  const startGame = (color: 'w' | 'b') => {
    resetGame(); // Reset board state
    setPlayerColor(color);
    // If player chooses black, bot (white) makes the first move.
    if (color === 'b') {
        const newGame = new Chess();
        const possibleMoves = newGame.moves();
        const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        newGame.move(move);
        setGame(newGame);
    }
  }
  
  const boardStyles = {
    darkSquare: '#333',
    lightSquare: '#666',
  };

  // Render setup screen if no color is chosen yet
  if (!playerColor) {
    return (
       <div className="w-full h-full flex flex-col items-center justify-center p-4 backdrop-blur-md bg-black/50 text-white">
            <div className="absolute top-4 left-4">
                <button onClick={onExit} className="px-3 py-1 rounded-md bg-orange-600/80 hover:bg-orange-500/80 transition-colors text-sm">
                &lt; Home
                </button>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-orange-400">Play Chess</h2>
            <p className="mb-6 opacity-80">Choose your side:</p>
            <div className="flex gap-4">
                 <button onClick={() => startGame('w')} className="w-40 px-4 py-2 rounded-lg bg-orange-600/80 hover:bg-orange-500/80 transition-colors">
                    Play as White
                </button>
                <button onClick={() => startGame('b')} className="w-40 px-4 py-2 rounded-lg bg-orange-600/80 hover:bg-orange-500/80 transition-colors">
                    Play as Black
                </button>
            </div>
       </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 backdrop-blur-md bg-black/50 text-white">
      <div className="absolute top-4 left-4">
        <button onClick={onExit} className="px-3 py-1 rounded-md bg-orange-600/80 hover:bg-orange-500/80 transition-colors text-sm">
          &lt; Home
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-orange-400">Chess</h2>
      <p className="text-sm opacity-80 mb-2 h-5">{status}</p>

      <div className="w-[320px] h-[320px] shadow-2xl rounded-md overflow-hidden border-2 border-neutral-700">
        <Chessboard
          // FIX: The 'react-chessboard' component uses the 'position' prop to set the board state, not 'boardPosition'.
          position={game.fen()}
          onPieceDrop={onDrop}
          boardOrientation={playerColor === 'b' ? 'black' : 'white'}
          boardWidth={320}
          customDarkSquareStyle={{ backgroundColor: boardStyles.darkSquare }}
          customLightSquareStyle={{ backgroundColor: boardStyles.lightSquare }}
        />
      </div>

      <p className="text-xs text-center mt-2 opacity-60">Note: The bot makes random moves. A 1500-rated AI is in development.</p>
      
      <button onClick={resetGame} className="mt-4 px-4 py-2 rounded-lg bg-orange-600/80 hover:bg-orange-500/80 transition-colors">
        New Game
      </button>
    </div>
  );
};

export default ChessGame;