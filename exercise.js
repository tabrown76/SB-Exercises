function validAnagram(str1, str2){
    if(str1.length !== str2.length) return false;

    const str1Freq = freqCounter(str1);
    const str2Freq = freqCounter(str2);

    for(let el in str1Freq){
        if(!str2Freq[el]) return false;
        if(str1Freq[el] !== str2Freq[el]) return false;
    }

    return true;
}

function freqCounter(str){
    const freq = {};
    for(let char of str){
        freq[char] = freq[char] + 1 || 1;
    }
    return freq;
}

console.log(freqCounter('iwantpie'))
console.log(freqCounter('supersauce'))

console.log(validAnagram('asdf', 'fdsa'))