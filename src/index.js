import Foods from "./food";
import {choice, remove} from "./helpers";

function main(){
    let food = choice(Foods);

    console.log(`I'd like one ${food}, please.`);
    console.log(`Here you go: ${food}`);
    console.log(`Delicious! May I have another?`);

    remove(Foods, food);

    console.log(`I'm sorry, we're all out. We have ${Foods.length} other options, however.`);
}

window.main = main;