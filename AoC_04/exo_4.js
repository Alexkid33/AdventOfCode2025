
const fs = require('fs');

console.log("AoC 2025 - Jour 4  \n");

const isRoll = (val) => val === '@';

function checkAround(grid, i, j, gridHeight, gridWidth) {
  let rollCount = 0;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      if (di === 0 && dj === 0) continue; // Skip the current roll
      const ni = i + di;
      const nj = j + dj;
      if (ni >= 0 && ni < gridHeight && nj >= 0 && nj < gridWidth) {
        if (isRoll(grid[ni][nj])) {
          rollCount++;
        }
      }
    }
  }
  // console.log(`    -> Roll at (${i},${j}) has ${rollCount} rolls around it.`); 
  return rollCount;
}    

function countRoll(grid) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  let totalAccesibleRolls = 0;
  for (let i = 0; i < gridHeight; i++) {
    for (let j = 0; j < gridWidth; j++) {
      const element = grid[i][j];
      if(isRoll(element)) {
        if(checkAround(grid,i,j,gridHeight, gridWidth) < 4){
          totalAccesibleRolls++;
        }
      }
    }
  }
  return totalAccesibleRolls;
}

function countRollIterate(grid) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  let totalAccesibleRolls = 0;
  let changes = true;
  const newGrid = [...grid];

  while (changes) {
    changes = false;
    //console.log(newGrid);

    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const element = newGrid[i][j];
        if(isRoll(element)) {
          if(checkAround(newGrid,i,j,gridHeight, gridWidth) < 4){
            totalAccesibleRolls++;
            newGrid[i][j] = '.'; 
            changes = true; 
          }
        }
      }
    }
  }
  
  return totalAccesibleRolls;
}

function run(input, part) {
    const rows = input.trim().split('\n');
    const grid = [];
    rows.forEach(line => {
        const array = line.trim().split('');
        grid.push(array);
    });
    // console.log(grid);
    if(part === 1) {
        console.log(`Number of accesible rolls in part ${part}: ${countRoll(grid,part)}`);
    }
    if(part === 2) {
        console.log(`Number of accesible rolls in part ${part}: ${countRollIterate(grid,part)}`);
    }

}

// const testInput = fs.readFileSync('AoC_04/testInput.txt', 'utf8');
const testInput = fs.readFileSync('AoC_04/realInput.txt', 'utf8');
run(testInput,1);
run(testInput,2);