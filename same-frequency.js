// add whatever parameters you deem necessary
function sameFrequency(num1, num2) {
    const num1Freq = makeFreqCounter(num1);
    const num2Freq = makeFreqCounter(num2);

    for(let el in num1Freq){
        if(!num2Freq[el]) return false;
        else if(num1Freq[el] !== num2Freq[el]) return false;
    }

    return true
}

function makeFreqCounter(num){
    let obj = {};
    let digits = num.toString().split('');

    for(let digit of digits){
        obj[digit] = obj[digit] + 1 || 1;
    }

    return obj;
}