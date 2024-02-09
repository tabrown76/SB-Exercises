// add whatever parameters you deem necessary
function constructNote(str1, str2) {
    if(str1.length > str2.length) return false

    const str1Freq = makeFreqCounter(str1);
    const str2Freq = makeFreqCounter(str2);
    
    for(let el in str1Freq){
        if(!str2Freq[el]) return false;
        if(str1Freq[el] > str2Freq[el]) return false;
    }
    return true
}

function makeFreqCounter(str){
    const freq = {};

    for(let char of str){
        freq[char] = freq[char] + 1 || 1;
    }
    return freq;
}