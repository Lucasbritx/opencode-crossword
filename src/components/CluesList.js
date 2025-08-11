import React from 'react';
import './CluesList.css';

const CluesList = ({ placedWords }) => {
  const acrossClues = placedWords.filter(word => word.direction === 'across');
  const downClues = placedWords.filter(word => word.direction === 'down');

  return (
    <div className="clues-container">
      <div className="clues-section">
        <h3>Across</h3>
        <div className="clues-list">
          {acrossClues.map(word => (
            <div key={`across-${word.number}`} className="clue-item">
              <span className="clue-number">{word.number}.</span>
              <span className="clue-text">{word.clue}</span>
              <span className="clue-length">({word.length})</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="clues-section">
        <h3>Down</h3>
        <div className="clues-list">
          {downClues.map(word => (
            <div key={`down-${word.number}`} className="clue-item">
              <span className="clue-number">{word.number}.</span>
              <span className="clue-text">{word.clue}</span>
              <span className="clue-length">({word.length})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CluesList;