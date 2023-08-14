function getRandomNumberFact(){
  const url = `http://numbersapi.com/${Math.floor(Math.random() * 100)}?json`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const fact = data.text;

      document.getElementById('number').innerHTML += `<li>${fact}</li>`;
    });
}

getRandomNumberFact()
  .then(getRandomNumberFact)
  .then(getRandomNumberFact)
  .catch(err => console.error('There was an error!', err));


function getMultipleFacts(){
  const url = 'http://numbersapi.com/94?json';
  const promises = Array(4).fill(fetch(url).then(response => response.json()));

  return Promise.all(promises)
    .then(facts => {
      facts.forEach(fact => {
        document.getElementById('fact').innerHTML +=`<li>${fact.text}</li>`;
      })
    })
    .catch(err => console.error('There was an error!', err));
}

getMultipleFacts();

function getDeck(){
  const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data.deck_id;
    })
    .catch(err => console.error('There was an error!', err));
}

function singleCard(){
  getDeck()
    .then(deck_id => {
      const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
      
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          const card = data.cards[0];

          document.getElementById('card').innerHTML = `<p>${card.value} of ${card.suit}</p>`;
        })
      })
    .catch(err => console.error('There was an error!', err));
}

singleCard();

function twoCards(){
  getDeck()
    .then(deck_id => {
      const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          card1 = data.cards[0];
        })
        .then(() => fetch(url))
        .then(response => response.json())
        .then(data => {
          card2 = data.cards[0];
        })
        .then(() =>{
          document.getElementById('cards').innerHTML += `<p>${card1.value} of ${card1.suit}</p>`
          document.getElementById('cards').innerHTML += `<p>${card2.value} of ${card2.suit}</p>`
        })
        .catch(err => console.error('There was an error!', err));
    })
}

twoCards();

let deck_id;

function starterDeck(){
  const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      deck_id = data.deck_id;
    })
    .catch(err => console.error('There was an error!', err));
}

function drawCard(){
  if (!deck_id) return;

  const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.remaining === 0) {
        document.getElementById('btn').disabled = true;
        alert('No more cards left in the deck!');
        return;
      }

      const card = data.cards[0];
      const cardImage = document.createElement('img');
      cardImage.src = card.image;
      cardImage.className = 'card';
      document.getElementById('all-cards').appendChild(cardImage);
    })
    .catch(err => console.error('There was an error!', err));
}

document.getElementById('btn').addEventListener('click', drawCard)

starterDeck();