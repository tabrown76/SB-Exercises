function countZeroes(arr) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    
    while (leftIdx <= rightIdx) {
      let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
      let middleVal = arr[middleIdx];
      
      if (middleVal === 1) {
        leftIdx = middleIdx + 1;
      } else {
        rightIdx = middleIdx - 1;
      }
    }
    
    return arr.length - leftIdx;
  }
  
  module.exports = countZeroes;
  