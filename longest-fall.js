// add whatever parameters you deem necessary
function longestFall(arr) {
    let currentLongestFall = 1;
    let longestFall = 1;
    let previousDigit = arr[0];

    if(arr.length === 0){
        return 0;
    }

    for(let i = 0; i < arr.length; i++){
        if(arr[i] < previousDigit){
            currentLongestFall++;
            longestFall = Math.max(longestFall, currentLongestFall + 1); 
        } else {
            currentLongestFall = 0; 
        }
        previousDigit = arr[i];
    }
    return longestFall;
}

console.log(longestFall([5, 4, 4, 4, 3, 2]))
console.log(longestFall([9, 8, 7, 6, 5, 6, 4, 2, 1]))