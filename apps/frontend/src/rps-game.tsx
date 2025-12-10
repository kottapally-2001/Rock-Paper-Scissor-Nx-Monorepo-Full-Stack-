import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

type Choice = 'rock' | 'paper' | 'scissors';

const winRules: Record<Choice, Choice> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

export const RpsGame: React.FC = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const playRound = async (playerSelection: Choice) => {
    if (gameOver) return;

    try {
      const res = await axios.get<{ computerChoice: Choice }>('http://localhost:3000/game/play');
      const computerSelection = res.data.computerChoice;

      if (playerSelection === computerSelection) {
        setResult(`It's a tie! You both chose ${playerSelection}`);
        return;
      }

      if (winRules[playerSelection] === computerSelection) {
        const newScore = playerScore + 1;
        setPlayerScore(newScore);
        setResult(`You win! ${playerSelection} beats ${computerSelection}`);
        if (newScore === 5) {
          setResult('🎉 You won the game!');
          setGameOver(true);
        }
      } else {
        const newScore = computerScore + 1;
        setComputerScore(newScore);
        setResult(`You lose! ${computerSelection} beats ${playerSelection}`);
        if (newScore === 5) {
          setResult('😞 Computer won the game!');
          setGameOver(true);
        }
      }
    } catch (e) {
      console.error(e);
      setResult('Error contacting the backend. Is it running on port 3000?');
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
        <p id="player-score">Player: {playerScore}</p>
        <p id="computer-score">Computer: {computerScore}</p>
      </div>

      <div className="buttons">
        <button onClick={() => playRound('rock')} disabled={gameOver}>Rock</button>
        <button onClick={() => playRound('paper')} disabled={gameOver}>Paper</button>
        <button onClick={() => playRound('scissors')} disabled={gameOver}>Scissors</button>
      </div>

      <button id="reset" onClick={resetGame}>Reset Game</button>

      <div id="result">{result}</div>
    </div>
  );
};
