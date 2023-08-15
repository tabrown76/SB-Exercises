async function getRandomNumberFact(){   
  try{
    for(let i = 0; i < 3; i++){
      const url = `http://numbersapi.com/${Math.floor(Math.random() * 100)}?json`;
      const response = await axios.get(url);
      const fact = response.data.text;
      document.getElementById('number').innerHTML += `<li>${fact}</li>`;
    }
  } catch(err){
    console.error('There was an error!', err);
  }
}
  
getRandomNumberFact()

async function getMultipleFacts(numbers = [94, 94, 94, 94]) {
  try {
    const promises = numbers.map(number => 
      axios.get(`http://numbersapi.com/${number}?json`)
        .then(response => response.data)
    );

    const facts = await Promise.all(promises);
    facts.forEach(fact => {
      document.getElementById('fact').innerHTML += `<li>${fact.text}</li>`;
    });
  } catch (err) {
    return console.error('There was an error!', err);
  }
}

getMultipleFacts();
  

async function getDeck(){
  const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

  try {
    const response = await axios.get(url);
    return response.data.deck_id;
  } catch (err) {
    return console.error('There was an error!', err);
  }
}

async function singleCard(){
  try {
    const deck_id = await getDeck();
    const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
    const response = await axios.get(url);
    const card = response.data.cards[0];
    document.getElementById('card').innerHTML = `<p>${card.value} of ${card.suit}</p>`;
  } catch (err){
    return console.error('There was an error!', err);
  }
}

singleCard();

async function twoCards() {
  try {
    const deck_id = await getDeck();
    const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
    
    const response1 = await axios.get(url);
    const card1 = response1.data.cards[0];

    const response2 = await axios.get(url);
    const card2 = response2.data.cards[0];
    
    document.getElementById('cards').innerHTML += `<p>${card1.value} of ${card1.suit}</p>`;
    document.getElementById('cards').innerHTML += `<p>${card2.value} of ${card2.suit}</p>`;
  } catch (err) {
    console.error('There was an error!', err);
  }
}

twoCards();

let deck_id;

async function starterDeck(){
  const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

  try {
    const response = await axios.get(url)
    deck_id = response.data.deck_id;
  } catch (err){
    return console.error('There was an error!', err);
  }
}

async function drawCard(){
  if (!deck_id) return;

  const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;

  try{
    const response = await axios.get(url)

    if (response.data.remaining === 0) {
      document.getElementById('btn').disabled = true;
      alert('No more cards left in the deck!');
      return;
    }
    
    const card = response.data.cards[0];
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardImage.className = 'card';
    document.getElementById('all-cards').appendChild(cardImage);
  } catch (err) {
    return console.error('There was an error!', err);
  }
}

document.getElementById('btn').addEventListener('click', drawCard)

starterDeck();