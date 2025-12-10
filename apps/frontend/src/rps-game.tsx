import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

type Choice = 'rock' | 'paper' | 'scissors';

const winRules: Record<Choice, Choice> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

// ✅ API base URL from Vite env
const API_URL = import.meta.env.VITE_API_URL;

export const RpsGame: React.FC = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const playRound = async (playerSelection: Choice) => {
    if (gameOver || loading) return;

    try {
      setLoading(true);

      const res = await axios.get<{ computerChoice: Choice }>(
        `${API_URL}/game/play`
      );

      const computerSelection = res.data.computerChoice;

      if (playerSelection === computerSelection) {
        setResult(`It's a tie! You both chose ${playerSelection}`);
        return;
      }

      // ✅ Player wins
      if (winRules[playerSelection] === computerSelection) {
        setPlayerScore(prev => {
          const newScore = prev + 1;
          if (newScore === 5) {
            setResult('🎉 You won the game!');
            setGameOver(true);
          } else {
            setResult(`You win! ${playerSelection} beats ${computerSelection}`);
          }
          return newScore;
        });
      } 
      // ✅ Computer wins
      else {
        setComputerScore(prev => {
          const newScore = prev + 1;
          if (newScore === 5) {
            setResult('😞 Computer won the game!');
            setGameOver(true);
          } else {
            setResult(`You lose! ${computerSelection} beats ${playerSelection}`);
          }
          return newScore;
        });
      }
    } catch (e) {
      console.error(e);
      setResult('❌ Backend error. Check API URL or server status.');
    } finally {
      setLoading(false);
    }
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setResult('');
    setGameOver(false);
  };

  return (
    <div className="game-box">
      <h1>Rock Paper Scissors</h1>

      <div className="scoreboard">
        <p>Player: {playerScore}</p>
        <p>Computer: {computerScore}</p>
      </div>

      <div className="buttons">
        <button onClick={() => playRound('rock')} disabled={gameOver || loading}>
          Rock
        </button>
        <button onClick={() => playRound('paper')} disabled={gameOver || loading}>
          Paper
        </button>
        <button onClick={() => playRound('scissors')} disabled={gameOver || loading}>
          Scissors
        </button>
      </div>

      <button id="reset" onClick={resetGame}>
        Reset Game
      </button>

      <div id="result">{loading ? '⌛ Playing...' : result}</div>
    </div>
  );
};
