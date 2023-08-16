const fs = require('fs');
const process = require('process');
const path = process.argv[2];

const argv = process.argv;

for(let i = 0; i < argv.length; i++){
    console.log(i, argv[i]);
}

function cat(path){
    fs.readFile(`./${path}`, 'utf-8', (err, data)=> {
        if(err){
            console.log('ERROR:', err);
            process.exit(1);
        }
        console.log(data);
    })
}

cat(path);