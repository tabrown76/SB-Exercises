// add whatever parameters you deem necessary
function isSubsequence(str1, str2) {
    let str1Pointer = 0;

    for(let i = 0; i < str2.length; i++){
        if(str2[i] === str1[str1Pointer]) str1Pointer ++;
        if(str1Pointer === str1.length) return true;
    }
    return false;
}
