
const fs = require('fs');

console.log("AoC 2025 - Jour 2 - Exo 1  \n");



function parseSequence(range) {
    const [start, end] = range.split('-').map(Number);
    const sequence = [];
    let rangeCount = 0;
    let sumInvalidId = 0;
    for (let id = start; id <= end; id++) {
        const nbChar = id.toString().length;
        if( nbChar % 2 === 0  ) {  
          //console.log(`    -> ID ${id} has ${nbChar} characters`);
          const firstPart = Number(id.toString().slice(0, nbChar/2));
          const secondPart = Number(id.toString().slice(nbChar/2));
          if(firstPart.toString().length === nbChar/2 && secondPart.toString().length === nbChar/2) {
            //console.log(`    -> ID ${id} can be split into ${firstPart} and ${secondPart}`);
            if( Math.abs(firstPart - secondPart) === 0 ) {
              //console.log(`      -> ID ${id} is INVALID (difference is 0)`);
              sumInvalidId += id;
              rangeCount++;
            }
          }

      }

    }
    console.log(`Range ${range} -> Number of valid IDs: ${rangeCount}, Sum of invalid IDs: ${sumInvalidId}`);
    return [rangeCount, sumInvalidId];
  }

function splitIdAtPositions(id, nbChar, splitPos) {
    const idStr = id.toString();
    const parts = [];
    let start = 0;
    for(let pos = splitPos; pos < nbChar; pos += splitPos) {
      // console.log(`  start ${start} - pos ${pos}`);
      // console.log(`    -> slice ${idStr.slice(start, pos)}`);
      parts.push( Number(idStr.slice(start, pos)) );
      start = pos;
    }
    // console.log(`    -> slice ${idStr.slice(start)}`);
    parts.push( Number(idStr.slice(start)) );
    // console.log(`    -> ID ${id} split into ${splitPos} parts: ${parts.join(', ')}`);
    return parts;
}


function checkParts(parts, splitPos) {
    if(parts.map(p => p.toString().length === splitPos).every(v => v === true)) {
      return true;
    }
    return false;
}


function parseSequence2(range) {
    const [start, end] = range.split('-').map(Number);
    const sequence = [];
    let rangeCount = 0;
    let sumInvalidId = 0;
    const partsUniq = new Set();
    for (let id = start; id <= end; id++) {
        const nbChar = id.toString().length;
        for (let splitPos = 1; splitPos < nbChar; splitPos++) {
          if( nbChar % splitPos === 0  ) {
            //console.log(`  Trying split in ${nbChar/splitPos} for ID ${id}`);
            const parts = splitIdAtPositions(id, nbChar, splitPos);
            if(checkParts(parts, splitPos)) {
              // console.log(`    -> ID ${id} split into parts: ${parts.join(', ')}`);
              if(parts.every( (val, i, arr) => val === arr[0] )) {
                if(!partsUniq.has(id)) {
                    // console.log(`      -> ID ${id} is INVALID (all parts equal)`);
                    sumInvalidId += id;
                    rangeCount++;
                    partsUniq.add(id);
                }
              } 
            }
            
          }
      }
    }
    console.log(`Range ${range} -> Number of valid IDs: ${rangeCount}, Sum of invalid IDs: ${sumInvalidId}`);
    return [rangeCount, sumInvalidId];
  }

function run(input, part) {
    const idRanges = input.trim().split(',');
    let sumInvalidIdTotal = 0;
    idRanges.map(r => {
      if(part === 1) {
        const [rangeCount, sumInvalidId] = parseSequence(r);
        sumInvalidIdTotal += sumInvalidId;
      }
      if(part === 2) {
        const [rangeCount, sumInvalidId] = parseSequence2(r);
        sumInvalidIdTotal += sumInvalidId;
      }
    });
    console.log(`\n==> Total sum of invalid IDs for part ${part}: ${sumInvalidIdTotal} <==`);

}

// const testInput = fs.readFileSync('AoC_02/testInput.txt', 'utf8');
const testInput = fs.readFileSync('AoC_02/realInput.txt', 'utf8');
run(testInput,1);
run(testInput,2);