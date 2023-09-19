const ones = {
    "0": "",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine"
}

const teens = {
    "10": "ten",
    "11": "eleven",
    "12": "twelve",
    "13": "thirteen",
    "14": "fourteen",
    "15": "fifteen",
    "16": "sixteen",
    "17": "seventeen",
    "18": "eighteen",
    "19": "nineteen"
}

const tens = {
    "2": "twenty",
    "3": "thirty",
    "4": "forty",
    "5": "fifty"
}

const noonMidnight = {
    "12:00": "noon",
    "00:00": "midnight"
}

function timeWord(string) {
    let time = '';

    if(Object.keys(noonMidnight).includes(string)){
        time = noonMidnight[string];
        return time;
    } else{
        let pm = false;
        let [hours, minutes] = string.split(":");

        if(parseInt(hours) === 12){
            pm = true;
            time += hoursWord(hours);
        } else if(parseInt(hours) > 12){
            pm = true;
            let hourInt = hours - 12;
            let hourString = hourInt.toString();
            time += hoursWord(hourString);
        } else {
            time += hoursWord(hours);
        }

        time += minutesWord(minutes);

        time += pm ? ' pm' : ' am';

        return time;
    }
}

function hoursWord(string){
    let hours = '';

    if(string === '00') return 'twelve';

    if(Object.keys(teens).includes(string)){
        hours += teens[string];
    } else {
        let hourInt = parseInt(string);
        let hourStr = hourInt.toString();
        hours += ones[hourStr];
    }

    return hours;
}

function minutesWord(string){
    let minutes = '';

    if(string === '00') return " o'clock";

    const [tensPlace, onesPlace] = string.split('');

    if(parseInt(string) <20){
        if(Object.keys(teens).includes(string)){
            minutes += teens[string];
        } else{
            minutes += `oh ${ones[onesPlace]}`;
        }
    } else{
        minutes += `${tens[tensPlace]} ${ones[onesPlace]}`;
    }    

    return ` ${minutes}`;
}


module.exports = timeWord;