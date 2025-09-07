import React, { useState, useEffect } from 'react';

interface TicTacToeProps {
  onExit: () => void;
}

type Player = 'X' | 'O';
type SquareValue = Player | null;


const calculateWinner = (squares: Array<SquareValue>): Player | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Square: React.FC<{ value: SquareValue; onClick: () => void; }> = ({ value, onClick }) => {
    const color = value === 'X' ? 'text-orange-400' : 'text-cyan-400';
    return (
        <button className="w-20 h-20 flex items-center justify-center text-4xl font-bold rounded-lg transition-colors bg-neutral-800/50" onClick={onClick}>
            <span className={color}>{value}</span>
        </button>
    );
};


const TicTacToe: React.FC<{ onExit: () => void; }> = ({ onExit }) => {
  const [board, setBoard] = useState<Array<SquareValue>>(Array(9).fill(null));
  const [player, setPlayer] = useState<Player>('X'); // Current turn player
  const [difficulty, setDifficulty] = useState<'easy' | 'tough' | null>(null);
  const winner = calculateWinner(board);
  const isBoardFull = board.every(Boolean);

  const human: Player = 'X';
  const bot: Player = 'O';

  // Bot move logic
  useEffect(() => {
    if (winner || isBoardFull || player !== bot || !difficulty) return;

    const timeoutId = setTimeout(() => {
        let botMove: number;
        if (difficulty === 'easy') {
            const emptySquares = board.map((sq, i) => sq === null ? i : -1).filter(i => i !== -1);
            botMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        } else { // tough
            botMove = findBestMove(board);
        }
        
        if (botMove !== -1) {
          handleClick(botMove);
        }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [player, board, winner, isBoardFull, difficulty]);


  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = player;
    setBoard(newBoard);
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setDifficulty(null);
  }

  const findBestMove = (currentBoard: SquareValue[]): number => {
      let bestVal = -Infinity;
      let bestMove = -1;

      for(let i = 0; i < 9; i++) {
          if (currentBoard[i] === null) {
              currentBoard[i] = bot;
              let moveVal = minimax(currentBoard, 0, false);
              currentBoard[i] = null;
              if (moveVal > bestVal) {
                  bestMove = i;
                  bestVal = moveVal;
              }
          }
      }
      return bestMove;
  }

  /**
   * This is the core of the "tough" AI. It uses the minimax algorithm to find the best possible move.
   * How it blocks the player:
   * 1. It simulates every possible move for both itself (the bot) and the player.
   * 2. It scores the outcome of each simulation: +10 for a bot win, -10 for a player win, 0 for a draw.
   * 3. The bot's goal is to get the highest score possible.
   * 4. If the player has a winning move, the AI sees that this path leads to a -10 score.
   * 5. If there's another move that leads to a draw (0) or a bot win (+10), the AI will choose that move instead,
   *    effectively blocking the player's winning move because it avoids the -10 outcome.
   */
  const minimax = (currentBoard: SquareValue[], depth: number, isMax: boolean): number => {
      const score = evaluate(currentBoard);
      if (score === 10) return score - depth;
      if (score === -10) return score + depth;
      if (!currentBoard.includes(null)) return 0;

      if (isMax) { // Bot's turn (Maximizer)
          let best = -Infinity;
          for (let i = 0; i < 9; i++) {
              if (currentBoard[i] === null) {
                  currentBoard[i] = bot;
                  best = Math.max(best, minimax(currentBoard, depth + 1, !isMax));
                  currentBoard[i] = null;
              }
          }
          return best;
      } else { // Player's turn (Minimizer)
          let best = Infinity;
          for (let i = 0; i < 9; i++) {
              if (currentBoard[i] === null) {
                  currentBoard[i] = human;
                  best = Math.min(best, minimax(currentBoard, depth + 1, !isMax));
                  currentBoard[i] = null;
              }
          }
          return best;
      }
  }

  const evaluate = (b: SquareValue[]): number => {
      const winner = calculateWinner(b);
      if (winner === bot) return 10;
      if (winner === human) return -10;
      return 0;
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull) {
    status = 'Draw!';
  } else {
    status = `Next player: ${player}`;
  }

  if (!difficulty) {
      return (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 backdrop-blur-md bg-black/50 text-white">
              <h2 className="text-2xl font-bold mb-6">Choose Difficulty</h2>
              <button onClick={() => setDifficulty('easy')} className="mb-4 w-40 px-4 py-2 rounded-lg bg-orange-600/80 hover:bg-orange-500/80 transition-colors">
                  Easy
              </button>
              <button onClick={() => setDifficulty('tough')} className="w-40 px-4 py-2 rounded-lg bg-orange-600/80 hover:bg-orange-500/80 transition-colors">
                  Tough
              </button>
               <button onClick={onExit} className="mt-8 px-4 py-2 rounded-lg bg-orange-600/80 hover:bg-orange-500/80 transition-colors text-sm">
                  Back to Home
              </button>
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

      <h2 className="text-2xl font-bold mb-4">Tic-Tac-Toe</h2>
      <div className="mb-4 text-lg">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, i) => (
          <Square key={i} value={board[i]} onClick={() => player === 'X' && handleClick(i)} />
        ))}
      </div>
      <button onClick={resetGame} className="mt-6 px-4 py-2 rounded-lg bg-orange-600/80 hover:bg-orange-500/80 transition-colors">
        New Game
      </button>
    </div>
  );
};

export default TicTacToe;
