/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() { 
    let chains = {};

    for(let i = 0; i < this.words.length; i++){
      let word = this.words[i];
      let nextWord = i === this.words.length - 1 ? null : this.words[i + 1];

      if(chains[word]){
        chains[word].push(nextWord);
      } else{
        chains[word] = [nextWord];
      }
    }
    return chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    if (this.words.length === 0) return '';
    let text = '';
    let chains = this.chains;
    let keyArray = Object.keys(chains);
    let startIndex = Math.floor(Math.random() * (keyArray.length -1));
    let startWord = keyArray[startIndex];
    
    text += startWord;

    for (let i = 1; i < numWords; i++) {
      let nextWordIndex = Math.floor(Math.random() * chains[startWord].length);
      let nextWord = chains[startWord][nextWordIndex];

      if(nextWord === null){
        break;
      }

      text += ` ${nextWord}`;
      startWord = nextWord;
    }
    return text;
  }
}

module.exports = MarkovMachine;