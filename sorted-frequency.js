function sortedFrequency(arr, val) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    let firstOccurrence = -1;
  
    while (leftIdx <= rightIdx) {
      let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
      let middleVal = arr[middleIdx];
  
      if (middleVal < val) {
        leftIdx = middleIdx + 1;
      } else if (middleVal > val) {
        rightIdx = middleIdx - 1;
      } else {
        firstOccurrence = middleIdx;
        rightIdx = middleIdx - 1;
      }
    }
  
    if (firstOccurrence === -1) {
      return -1;
    }
  
    let count = 0;
    let i = firstOccurrence;
    while (arr[i] === val) {
      count++;
      i++;
    }
  
    return count;
  }
  
  module.exports = sortedFrequency;
  