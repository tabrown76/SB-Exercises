function findRotationCount(arr) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
  
    while (leftIdx < rightIdx) {
      let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
  
      if (arr[middleIdx] > arr[rightIdx]) {
        // The smallest element is in the right part
        leftIdx = middleIdx + 1;
      } else {
        // The smallest element is in the left part or is the current middle element
        rightIdx = middleIdx;
      }
    }
  
    return leftIdx;
  }
  
  module.exports = findRotationCount;
  