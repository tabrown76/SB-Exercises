function curriedAdd(total) {
    if(total === undefined) return 0;

    function addNext(next){
        if(next === undefined) return total;
        total += next;
        return addNext;
    }

    return addNext;
}

module.exports = { curriedAdd };
