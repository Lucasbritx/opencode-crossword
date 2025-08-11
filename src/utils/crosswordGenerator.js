// Word database with clues
export const WORDS_DATABASE = [
  { word: 'REACT', clue: 'JavaScript library for building UIs', length: 5 },
  { word: 'JAVASCRIPT', clue: 'Programming language of the web', length: 10 },
  { word: 'HTML', clue: 'Markup language for web pages', length: 4 },
  { word: 'CSS', clue: 'Stylesheet language for web design', length: 3 },
  { word: 'NODE', clue: 'JavaScript runtime environment', length: 4 },
  { word: 'COMPONENT', clue: 'Reusable piece of React code', length: 9 },
  { word: 'STATE', clue: 'Data that can change in React', length: 5 },
  { word: 'PROPS', clue: 'Data passed to React components', length: 5 },
  { word: 'HOOK', clue: 'Special function in React', length: 4 },
  { word: 'API', clue: 'Application Programming Interface', length: 3 },
  { word: 'DATABASE', clue: 'Organized collection of data', length: 8 },
  { word: 'FUNCTION', clue: 'Block of reusable code', length: 8 },
  { word: 'ARRAY', clue: 'Ordered list of values', length: 5 },
  { word: 'OBJECT', clue: 'Collection of key-value pairs', length: 6 },
  { word: 'STRING', clue: 'Sequence of characters', length: 6 },
  { word: 'BOOLEAN', clue: 'True or false value', length: 7 },
  { word: 'LOOP', clue: 'Repeated execution of code', length: 4 },
  { word: 'CLASS', clue: 'Blueprint for creating objects', length: 5 },
  { word: 'METHOD', clue: 'Function inside a class', length: 6 },
  { word: 'VARIABLE', clue: 'Storage location with a name', length: 8 }
];

// Generate random words for the crossword
export const getRandomWords = (count = 5) => {
  const shuffled = [...WORDS_DATABASE].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Simple crossword generator (basic implementation for demonstration)
export const generateCrossword = (selectedWords) => {
  const gridSize = 15;
  const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
  const placedWords = [];
  
  // Start with the first word horizontally in the center
  if (selectedWords.length > 0) {
    const firstWord = selectedWords[0];
    const startRow = Math.floor(gridSize / 2);
    const startCol = Math.floor((gridSize - firstWord.length) / 2);
    
    for (let i = 0; i < firstWord.word.length; i++) {
      grid[startRow][startCol + i] = firstWord.word[i];
    }
    
    placedWords.push({
      ...firstWord,
      startRow,
      startCol,
      direction: 'across',
      number: 1
    });
  }
  
  // Try to place remaining words (simplified algorithm)
  let wordNumber = 2;
  for (let i = 1; i < selectedWords.length && i < 4; i++) {
    const word = selectedWords[i];
    let placed = false;
    
    // Try to find intersections with already placed words
    for (const placedWord of placedWords) {
      if (placed) break;
      
      for (let j = 0; j < placedWord.word.length; j++) {
        for (let k = 0; k < word.word.length; k++) {
          if (placedWord.word[j] === word.word[k]) {
            let newRow, newCol, direction;
            
            if (placedWord.direction === 'across') {
              // Place vertically
              direction = 'down';
              newRow = placedWord.startRow - k;
              newCol = placedWord.startCol + j;
            } else {
              // Place horizontally
              direction = 'across';
              newRow = placedWord.startRow + j;
              newCol = placedWord.startCol - k;
            }
            
            // Check if placement is valid
            if (newRow >= 0 && newCol >= 0 && 
                newRow + (direction === 'down' ? word.word.length - 1 : 0) < gridSize &&
                newCol + (direction === 'across' ? word.word.length - 1 : 0) < gridSize) {
              
              // Place the word
              for (let l = 0; l < word.word.length; l++) {
                const row = direction === 'down' ? newRow + l : newRow;
                const col = direction === 'across' ? newCol + l : newCol;
                grid[row][col] = word.word[l];
              }
              
              placedWords.push({
                ...word,
                startRow: newRow,
                startCol: newCol,
                direction,
                number: wordNumber++
              });
              
              placed = true;
              break;
            }
          }
        }
        if (placed) break;
      }
    }
  }
  
  return { grid, placedWords };
};