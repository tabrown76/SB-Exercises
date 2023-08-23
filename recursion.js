/** product: calculate the product of an array of numbers. */

function product(nums) {
  // let product = nums[0];
  // for(let i = 1; i <= nums.length - 1; i++){
  //   product *= nums[i];
  // }
  // return product;

  if (nums.length === 0) {
    return 1;
  }
  if (nums.length === 1) {
    return nums[0];
  }

  return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  // let longest = 0;
  // for(let i = 0; i <= words.length - 1; i++){
  //   if(words[i].length > longest){
  //     longest = words[i].length;
  //   }
  // }
  // return longest;

  let longestWord = 0;
  if(words.length === 0) return longestWord;
  
  if(words[0].length > longestWord){
    longestWord = words[0].length;
  }
  return Math.max(longestWord, longest(words.slice(1)));
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  // let newStr = '';
  // for(let i = 0; i <= str.length -1; i++){
  //   if(i % 2 === 0){
  //     newStr += str[i];
  //   };
  // }
  // return newStr;
  let newStr = '';
  if(str.length === 0) return '';
  newStr += str[0];
  
  return newStr += everyOther(str.slice(2));
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  // const reversedStr = str.split('').reverse().join('');
  // return str === reversedStr;
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {
  // for(let i = 0; i <= arr.length - 1; i++){
  //   if(arr[i] === val) return i;
  // }
  // return -1;
  if(arr.length === 0) return -1;
  if(arr[0] === val) return 0;
  const indexInRest = findIndex(arr.slice(1), val);
  if (indexInRest === -1) return -1;
  return indexInRest + 1;}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  // return str.split('').reverse().join('');
  if(str.length === 0) return '';
  let lastIndex = str.length -1;
  let reversedStr = ''
  reversedStr += str[lastIndex];
  return reversedStr + revString(str.slice(0, -1));
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let strArray = [];

  for (let key of Object.keys(obj)) {
    if (typeof obj[key] === 'string') {
      strArray.push(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) { 
      strArray = strArray.concat(gatherStrings(obj[key]));
    }
  }

  return strArray;
}


/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {
  // for(let i = 0; i <= arr.length -1; i++){
  //   if(arr[i] === val) return i;
  // }
  // return -1;
  if(arr.length === 0) return -1;
  if(arr[0] === val) return 0;
  const indexInRest = findIndex(arr.slice(1), val);
  if (indexInRest === -1) return -1;
  return indexInRest + 1;
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
