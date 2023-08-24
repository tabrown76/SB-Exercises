const fs = require('fs');
const process = require('process');
const axios = require('axios');

let path = process.argv[2];

async function puttinItAllTogether(){
    try {
        let urls = await readFile(path);
    
        const promises = urls.map(async (url) => {
            const data = await getHTML(url);
            
            if(data === undefined){
                console.log(`DNS error for ${url}.`);
            } else {
                await writeFile(url, data)
                console.log(`File for ${url} successfully written to /HTML`);
            }            
        })
        await Promise.all(promises);
    } catch(err) {
        console.error('ERROR:', err);
        process.exit(1);
    }
}

function readFile(path){
    return new Promise((resolve, reject) => {
        fs.readFile(`./${path}`, 'utf-8', (err, data)=> {
            if(err){
                console.error('ERROR:', err);
                reject(err);
                return;
            }
            const urls = data.split('\n').filter(url => url.trim() !== '');
    
            resolve(urls);
        })
    })
}

async function getHTML(url){
    try {
        const res = await axios.get(`${url}`);
        return res.data;
    } catch(err){
        if(err.code === 'ENOTFOUND'){
            return;
        } else {
            console.error('ERROR:', err.request);
            return err;
        }
    }
}

function writeFile(url, data){
    let fileName = new URL(`${url}`).hostname;
    return new Promise((resolve, reject) => {
        fs.writeFile(`${`HTML/${fileName}`}`, data, 'utf8', (err) => {
            if (err) {
              console.error('ERROR:', err);
              reject(err);
              return;
            }
            resolve();
        })
    })
}

puttinItAllTogether();