const fs = require('fs');
const process = require('process');
const axios = require('axios');

const argv = process.argv;

for(let i = 0; i < argv.length; i++){
    console.log(i, argv[i]);
}

const input = process.argv[2];
let path, url;

if(input.endsWith('.txt')){
    path = input;
} else{
    url = input;
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

if(path){
    cat(path);
}

async function webCat(url){
    try{
        const response = await axios.get(`${url}`);
        console.log(response.data);
    } catch (err){
        console.log('Error: Request failed with status code', err.response.status);
        process.exit(1);
    }
}

if(url){
    webCat(url);
}