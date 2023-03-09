const myMap = new Map();
myMap.set(7, 'seven');
myMap.set('7', 'seven string');

const empty = [];
myMap.set(empty, 'empty array' );

myMap.get(7);

const add = (x, y) => x + y;
const mult = (x, y) => x *y y;

const funcCalls = new Map();
funcCalls.set(add, 1);
funcCalls.set(mult, 9);

funcCalls.get(add)
funcCalls.get(mult)

const bandData = [
    [3, "3 Doors Down"],
    ['three', 'Three Dog Night'],
    ['nine', 'Nine Inch Nails'],
    ['four', 'The Four Seasons'],
    [41, 'Sum 41']
];
const bandMap = new Map[bandData]; //turn array into map
[...bandMap] //turn map into array

bandMap.set(182, 'Blink-182').set('twenty', 'Matchbox Twenty');
bandMap.delete()
bandMap.has()
bandMap.clear()
bandMap.keys()
bandMap.values()
[...bandMap.keys()]

bandMap.forEach((val, key) => {
    console.log(key + '=>' + val);
})

for(let [key, value] of bandMap){
    console.log(key, '=', value);
}

const bannedHashTags = new Set(['nofilter', 'justsaying', 'winning', 'yolo']);

bannedHashTags.add('bestlife').add('selfie')
bannedHashTags.has()
bannedHashTags.delete()
bannedHashTags.clear()

function filterHashTags(tags){
    const bannedHashTags = new Set(['nofilter', 'justsaying', 'winning', 'yolo']);
    return tags.filter((tag) => !bannedHashTags.has(tag))
}

const ages = ['bunch of non-unique nums']
new Set(ages);
[...new Set(ages)] //turn set back into array