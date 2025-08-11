import React from 'react';
import './CrosswordGrid.css';

const CrosswordGrid = ({ grid, placedWords, userAnswers, onCellChange, selectedCell, onCellClick }) => {
  const gridSize = grid.length;

  const getCellNumber = (row, col) => {
    const word = placedWords.find(w => 
      w.startRow === row && w.startCol === col
    );
    return word ? word.number : null;
  };

  const isCellActive = (row, col) => {
    return placedWords.some(word => {
      if (word.direction === 'across') {
        return row === word.startRow && 
               col >= word.startCol && 
               col < word.startCol + word.word.length;
      } else {
        return col === word.startCol && 
               row >= word.startRow && 
               row < word.startRow + word.word.length;
      }
    });
  };

  const getCellValue = (row, col) => {
    const key = `${row}-${col}`;
    return userAnswers[key] || '';
  };

  return (
    <div className="crossword-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => {
            const isActive = isCellActive(rowIndex, colIndex);
            const cellNumber = getCellNumber(rowIndex, colIndex);
            const isSelected = selectedCell && 
                             selectedCell.row === rowIndex && 
                             selectedCell.col === colIndex;
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`grid-cell ${isActive ? 'active' : 'inactive'} ${isSelected ? 'selected' : ''}`}
                onClick={() => isActive && onCellClick(rowIndex, colIndex)}
              >
                {cellNumber && <span className="cell-number">{cellNumber}</span>}
                {isActive && (
                  <input
                    type="text"
                    maxLength="1"
                    value={getCellValue(rowIndex, colIndex)}
                    onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value.toUpperCase())}
                    className="cell-input"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CrosswordGrid;