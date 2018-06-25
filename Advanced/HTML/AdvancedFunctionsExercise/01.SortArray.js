function solve(arrNum, sortMethod) {

    let sortAsc = (a, b) => a - b;
    let sortDesc = (a, b) =>  b - a;

    let sortingStrategies = {
        "asc": sortAsc,
        "desc": sortDesc
    };
    return arrNum.sort(sortingStrategies[sortMethod]);
}

solve([14, 7, 17, 6, 8], "asc");