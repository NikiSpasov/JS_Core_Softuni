let createAndSort = (function orderRect() {
    let rectList = [];
    function createRect(rectangleArr) {
        for (let rectangle of rectangleArr) {
            let currentRect = {
                width: rectangle[0],
                height: rectangle[1],
                area: () => currentRect.width * currentRect.height,
                compareTo: (other) => {
                    let result = other.area() - currentRect.area();
                    return result || (other.width - currentRect.width);

                }
            };
            rectList.push(currentRect)
        }
        return rectList.sort((a,b) => a.compareTo(b))
    }
    return createRect;
})();
console.log(createAndSort([[1,20],[20,1],[5,3],[5,3]]));