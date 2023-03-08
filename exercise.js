//sameKeysAndValues
const createInstructor = (firstName, lastName) => {
    return {
        firstName,
        lastName
    };
}

//computedPropertyNames
let favoriteNumber = 42;

const instructor = {
    firstName: "Colt",
    [favoriteNumber]: "That is my favorite!"
};

//objectMethods
const instructor = {
    firstName: "Colt",
    sayHi() {
        return "Hi!";
    },
    sayBye() {
        return this.firstName + "says bye!";
    };
}

//createAnimal
const createAnimal = (species, verb, noise) => {
    return {
        species,
        [verb]() {
            return noise;    
        }
    };
}