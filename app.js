const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
    let results = [];

    for(let i = 0; i < fruit.length; i++){
        if(fruit[i].toLowerCase().includes(str.toLowerCase())){
        results.push(fruit[i]);
        }    
    }
	return results;
}

function searchHandler(e) {
	const results = search(e.target.value);
    showSuggestions(results, e.target.value);
}

function showSuggestions(results, inputVal) {
    suggestions.innerHTML = '';

    if(inputVal.length > 0 && results.length > 0){
        const regex = new RegExp(inputVal, 'gi');

        for(let i = 0; i < results.length; i++){
            const li = document.createElement('li');
            li.classList.add('has-suggestions');
            const bold = results[i].replace(regex, '<strong>$&</strong>');
            li.innerHTML = bold;
            suggestions.appendChild(li);
        }
    } else {
        const li = document.createElement('li');
        li.innerText = 'No results found.';
        li.classList.add('has-suggestions');
        suggestions.appendChild(li);
    }
}

function useSuggestion(e) {
	input.value = e.target.innerText;
    suggestions.innerHTML = '';
}

window.addEventListener('load', function() {
    document.querySelector('input').value = '';
  });
input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
