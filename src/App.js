import React, { useState, useEffect } from 'react';
import CrosswordGrid from './components/CrosswordGrid';
import CluesList from './components/CluesList';
import { getRandomWords, generateCrossword } from './utils/crosswordGenerator';
import './App.css';

function App() {
  const [gameData, setGameData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const initializeGame = () => {
    const selectedWords = getRandomWords(5);
    const crosswordData = generateCrossword(selectedWords);
    setGameData(crosswordData);
    setUserAnswers({});
    setSelectedCell(null);
    setIsComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCellChange = (row, col, value) => {
    const key = `${row}-${col}`;
    setUserAnswers(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const checkAnswers = () => {
    if (!gameData) return;

    let correct = 0;
    let total = 0;

    gameData.placedWords.forEach(word => {
      for (let i = 0; i < word.word.length; i++) {
        total++;
        const row = word.direction === 'down' ? word.startRow + i : word.startRow;
        const col = word.direction === 'across' ? word.startCol + i : word.startCol;
        const key = `${row}-${col}`;
        const userAnswer = userAnswers[key];
        const correctAnswer = word.word[i];
        
        if (userAnswer === correctAnswer) {
          correct++;
        }
      }
    });

    const percentage = ((correct / total) * 100).toFixed(1);
    alert(`You got ${correct}/${total} letters correct (${percentage}%)`);
    
    if (correct === total) {
      setIsComplete(true);
      alert('Congratulations! You completed the crossword!');
    }
  };

  const revealAnswers = () => {
    if (!gameData) return;

    const newAnswers = {};
    gameData.placedWords.forEach(word => {
      for (let i = 0; i < word.word.length; i++) {
        const row = word.direction === 'down' ? word.startRow + i : word.startRow;
        const col = word.direction === 'across' ? word.startCol + i : word.startCol;
        const key = `${row}-${col}`;
        newAnswers[key] = word.word[i];
      }
    });

    setUserAnswers(newAnswers);
    setIsComplete(true);
  };

  if (!gameData) {
    return <div className="loading">Loading crossword...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>React Crossword Game</h1>
        <p>Fill in the crossword puzzle using the clues below!</p>
      </header>
      
      <div className="game-container">
        <div className="grid-section">
          <CrosswordGrid
            grid={gameData.grid}
            placedWords={gameData.placedWords}
            userAnswers={userAnswers}
            onCellChange={handleCellChange}
            selectedCell={selectedCell}
            onCellClick={handleCellClick}
          />
        </div>
        
        <div className="clues-section">
          <CluesList placedWords={gameData.placedWords} />
        </div>
      </div>
      
      <div className="controls">
        <button onClick={initializeGame} className="btn btn-primary">
          New Game
        </button>
        <button onClick={checkAnswers} className="btn btn-secondary">
          Check Answers
        </button>
        <button onClick={revealAnswers} className="btn btn-warning">
          Reveal Solution
        </button>
      </div>
      
      {isComplete && (
        <div className="completion-message">
          🎉 Puzzle completed! Click "New Game" for another challenge.
        </div>
      )}
      
      <div className="improvement-notes">
        <h3>💡 Areas for Improvement:</h3>
        <ul>
          <li>Add difficulty levels (Easy, Medium, Hard)</li>
          <li>Implement better crossword generation algorithm</li>
          <li>Add timer and scoring system</li>
          <li>Save/load game progress</li>
          <li>Add hint system</li>
          <li>Implement word validation as you type</li>
          <li>Add keyboard navigation</li>
          <li>Create themed word collections</li>
          <li>Add multiplayer functionality</li>
          <li>Implement undo/redo functionality</li>
        </ul>
      </div>
    </div>
  );
}

export default App;