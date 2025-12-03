
const fs = require('fs');

console.log("AoC 2025 - Jour 1 - Exo 1  \n");



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

  function rotate2(direction, nbClick, position) {
    let counter = 0;  
    let nbZero = 0;
    let newPosition = position;
    if (direction === 'L') {
          counter = position - nbClick;
      } else if (direction === 'R') {
          counter = position + nbClick;
      }
      newPosition = counter % 100;
      nbZero = Math.abs(Math.trunc(counter / 100));
      if(position !== 0 && Math.sign(counter) !== Math.sign(position)) nbZero+= 1;

      if (newPosition > 99) newPosition = newPosition - 100;
      if (newPosition < 0) newPosition = 100 + newPosition;
      //console.log(`    ->  position ${position}, rotation ${direction}${nbClick} ==> counter ${counter},newPosition ${newPosition}, nbZero ${nbZero}`);
      return [newPosition, nbZero];
    }

function run(input, part) {
    const lines = input.trim().split('\n');
    let count = 0;
    let currentPosition = 50;
    let nbZero = 0;
    for (let i = 0; i < lines.length; i++) {
        const direction = lines[i][0];
        const nbClick = Number(lines[i].slice(1));
        //console.log(`Ligne ${i} : direction ${direction}, click ${nbClick}`);
        if(part ===1){
          currentPosition = rotate(direction,nbClick, currentPosition);
          //console.log(`  -> Nouvelle position: ${currentPosition}`);
          if(currentPosition === 0) count++;
       }
       if(part ===2){
          [currentPosition, nbZero] = rotate2(direction,nbClick, currentPosition);
          //if(currentPosition === 0) count++;
          count += nbZero;
       }
    }
    console.log("Part ",part," - Number of time that 0 position is reached:", count);
}

//const testInput = fs.readFileSync('AoC_01/testInput.txt', 'utf8');
const testInput = fs.readFileSync('AoC_01/realInput.txt', 'utf8');
run(testInput,1);
run(testInput,2);