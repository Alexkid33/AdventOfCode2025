
const fs = require('fs');

console.log("AoC 2025 - Jour 3  \n");



function getMaxJoltage(bank) {
  const batteryVals = bank.split('').map(x => Number(x));
  // console.log(` -> Bank batteries: ${batteryVals}`);
  const batteriesWithoutLast = batteryVals.slice(0, batteryVals.length - 1);
  const firstMaxDigit = Math.max(...batteriesWithoutLast);
  const firstMaxDigitId = batteriesWithoutLast.indexOf(firstMaxDigit);
  // console.log(`    -> First max digit (excluding last): ${firstMaxDigit}`);
  const batteriesAfterFirstMax = batteryVals.slice(firstMaxDigitId + 1);
  const secondMaxDigit = Math.max(...batteriesAfterFirstMax);
  // console.log(`    -> Second max digit (after first max): ${secondMaxDigit}`);
  const joltage = Number(`${firstMaxDigit}${secondMaxDigit}`);
  console.log(`    -> Joltage for bank ${bank}: ${joltage}`);
  return joltage;
}


// 1 - je regarde dans les 4 1er et je prend le plsu grand
// 2 - à partir du nouvel index, je regarde les 11 suivants et je prends le plus grand
// 3 - à partir du nouvel index je regarde parmis les 10 suivants...



function findNextDigit(batteriesValues, startIdx, searchLength) {
  const batteriesInitValues = batteriesValues.slice(startIdx, batteriesValues.length - searchLength+1);
  const digit = Math.max(...batteriesInitValues);
  const id = batteriesInitValues.indexOf(digit);

  return [digit, id+1];
}

function getMaxJoltage2(bank) {
  const batteryVals = bank.split('').map(x => Number(x));
  let ouput = '';
  let startId = 0;
  let searchLength = 12;
  let [lastDigit, lastId] = findNextDigit(batteryVals,startId,searchLength);
  //console.log(`    -> Starting with lastDigit ${lastDigit}, lastId ${lastId}`);
  ouput += lastDigit;

  while(searchLength > 1) {
    searchLength = searchLength - 1;
    startId = lastId;
    //console.log(`    -> Searching for next digits... in range ${startId}  ${searchLength}`);
    const [digit, id] = findNextDigit(batteryVals, startId,searchLength);
    ouput += digit;
    lastId = startId + id;
    //console.log(` output: ${ouput}`);
  }
  console.log(`    -> Joltage for bank ${bank}: ${ouput}`);

  return Number(ouput);
}

function run(input, part) {
    const banks = input.trim().split('\n');
    let sumJoltage = 0;
    banks.map(i => {
      if(part === 1) {
        sumJoltage += getMaxJoltage(i);
      }
      if(part === 2) {
        sumJoltage += getMaxJoltage2(i);
      }
    });
    console.log(`\n==> Total sum joltage ${part}: ${sumJoltage} <==`);

}

//const testInput = fs.readFileSync('AoC_03/testInput.txt', 'utf8');
const testInput = fs.readFileSync('AoC_03/realInput.txt', 'utf8');
run(testInput,1);
run(testInput,2);