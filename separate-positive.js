// add whatever parameters you deem necessary
function separatePositive(arr) {
    let start = 0;
    let end = arr.length - 1;

    while (start < end) {
        if (arr[start] < 0 && arr[end] > 0) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        } else {
            if (arr[start] > 0) start++; 
            if (arr[end] < 0) end--; 
        }
    }
    return arr;
}

console.log(separatePositive([2, -1, -3, 6, -8, 10]));