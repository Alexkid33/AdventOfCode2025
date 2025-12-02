
const fs = require('fs');

console.log("AoC 2025 - Jour 1 - Exo 1  \n");

const testInput = fs.readFileSync('AoC_01/realInput.txt', 'utf8');
run(testInput);


function rotate(direction, nbClick, position) {
  let counter = 0;  
  if (direction === 'L') {
        counter = position - nbClick;
    } else if (direction === 'R') {
        counter = position + nbClick;
    }
    position = counter % 100;
    //console.log(`    -> counter ${counter}, position ${position}`);
    if (position > 99) position = position - 100;
    if (position < 0) position = 100 +position;
    return position;
  }

function run(input) {
    const lines = input.trim().split('\n');
    let count = 0;
    let currentPosition = 50;
    for (let i = 0; i < lines.length; i++) {
        const direction = lines[i][0];
        const nbClick = Number(lines[i].slice(1));
        //console.log(`Ligne ${i} : direction ${direction}, click ${nbClick}`);

        currentPosition = rotate(direction,nbClick, currentPosition);
        //console.log(`  -> Nouvelle position: ${currentPosition}`);
        if(currentPosition === 0) count++;
    }
    console.log("Number of time that 0 position is reached:", count);
}
