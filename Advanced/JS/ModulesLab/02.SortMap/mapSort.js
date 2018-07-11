function mapSort (mapInput, sortFunc) {
    if (sortFunc === undefined) {
        let currentMap = new Map;
        [...mapInput.keys()].sort((a,b) => a > b)
            .forEach(k =>
                currentMap.set(k, mapInput.get(k)));

       return currentMap;
    }
    return mapInput.sort(sortFunc());
}
module.exports = {mapSort};