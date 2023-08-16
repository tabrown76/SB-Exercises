const fs = require('fs');
const process = require('process');
const axios = require('axios');
const pathModule = require('path');

const argv = process.argv;

for(let i = 0; i < argv.length; i++){
    console.log(i, argv[i]);
}

let input;
let path, url;
const outIndex = process.argv.indexOf('--out');
let outputPath;

if(outIndex != -1){
    outputPath = process.argv[outIndex + 1];
    input = process.argv[outIndex + 2];
} else{
    input = process.argv[2];
}

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
        if(outputPath){
            const outputDir = pathModule.dirname(outputPath);

            if (!fs.existsSync(outputDir)) {
                console.error(`ERROR: Directory ${outputDir} does not exist.`);
                process.exit(1);
            }
            fs.writeFileSync(outputPath, data);
            console.log(`No output, but ${outputPath} contains contents of ${path}.`)
        } else{
            console.log(data);
        }
    })
}

if(path){
    cat(path);
}

async function webCat(url){
    try{
        const response = await axios.get(`${url}`);
        if(outputPath){
            fs.writeFileSync(outputPath, response.data);
            console.log(`No output, but ${outputPath} contains ${url}'s HTML.`)
        } else{
            console.log(response.data);
        }
    } catch (err){
        const outputDir = pathModule.dirname(outputPath);

        if (!fs.existsSync(outputDir)) {
            console.error(`ERROR: Directory ${outputDir} does not exist.`);
        } else{
            console.log('Error: Request failed with status code', err.response.status);
        }
        process.exit(1);
    }
}

if(url){
    webCat(url);
}
