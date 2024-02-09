// add whatever parameters you deem necessary
function countPairs(arr, num) {
    let numOfComplements = 0;
    let arrMap = new Map();

    for(let i = 0; i < arr.length; i++){
        let complement = num - arr[i];

        if(arrMap.get(complement)) numOfComplements ++;
        arrMap.set(arr[i], true);
    }

    return numOfComplements;
}
