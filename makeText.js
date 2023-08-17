    /** Command-line tool to generate Markov text. */

    const MarkovMachine = require('./markov');
    const fs = require('fs');
    const process = require('process');
    const axios = require('axios');

    const inputType = process.argv[2];
    let path, url;

    if(inputType === 'file'){
        path = process.argv[3];
    } else if(inputType === 'url'){
        url = process.argv[3];
    } else {
        console.error("node makeText.js input type(file or url) input")
        process.exit(1);
    }

    function fileToMM(path){
        fs.readFile(`./${path}`, 'utf-8', (err, data)=> {
            if(err){
                console.log('ERROR:', err);
                process.exit(1);
            }
            let mm = new MarkovMachine(data);
            let fileMM = mm.makeText();

            console.log(fileMM);
        })
    }

    if(path){
        fileToMM(path);
    }

    async function urlToMM(url){
        try{
            const response = await axios.get(`${url}`);
            let mm = new MarkovMachine(response.data);
            let urlMM = mm.makeText();

            console.log(urlMM);
        } catch (err){
            console.log('Error: Request failed with status code', err.response.status);
            process.exit(1);
        }
    }

    if(url){
        urlToMM(url);
    }