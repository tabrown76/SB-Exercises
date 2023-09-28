
function choice(items){
    let randomIdx = Math.floor(Math.random() * items.length);

    return items[randomIdx];
}

function remove(items, item){
    let idx = items.indexOf(item);
    
    if(idx !== -1){
        items.splice(idx, 1)
        return item;
    }

    return undefined;
}

export {choice, remove};