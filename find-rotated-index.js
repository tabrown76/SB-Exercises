function findRotatedIndex(arr, int) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
  
    while (leftIdx <= rightIdx) {
      let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
      let middleVal = arr[middleIdx];
  
      if (middleVal === int) {
        return middleIdx;
      }
  
      if (arr[leftIdx] <= middleVal) {
        // Left side is sorted
        if (int >= arr[leftIdx] && int < middleVal) {
          rightIdx = middleIdx - 1;
        } else {
          leftIdx = middleIdx + 1;
        }
      } else {
        // Right side is sorted
        if (int > middleVal && int <= arr[rightIdx]) {
          leftIdx = middleIdx + 1;
        } else {
          rightIdx = middleIdx - 1;
        }
      }
    }
  
    return -1;
  }
  
  module.exports = findRotatedIndex;
  