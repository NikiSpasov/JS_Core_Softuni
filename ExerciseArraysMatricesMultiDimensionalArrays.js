//1. Print an Array with a given Delimiter
function printArray (arrStr) {
    let delimeter = arrStr.slice(arrStr.length - 1);
    arrStr.splice(arrStr.length - 1, 1);
    //or
    //arrStr.pop()
    console.log(arrStr.join(delimeter));
}

//02. Print every N-th Element from an Array
function printEveryNElement (arrStr) {
    let nStep = Number(arrStr.pop());
    for (let i = 0; i < arrStr.length; i+=nStep) {
        console.log(arrStr[i]);
    }
}

//3. Add and Remove Elements from Array
function addRemoveElFromArr (arrStr) {
    let result = [];
    const initialNum = 1;
    let num = 0;

    for (let str of arrStr) {
        if (str === "add") {
            result.push(initialNum + num);
            num++;
        } else if (str == "remove") {
            result.pop();
            num++;
        }
    }
    result.length > 0 ? console.log(result.join("\n")) : console.log("Empty");
}

//04. Rotate Array
function rotateArray (arrStrings) {
    let rotationCount = Number(arrStrings.pop());
    for (let i = 0; i < rotationCount; i++) {
        let lastElement = arrStrings[arrStrings.length -1];
        arrStrings.length -= 1;
        arrStrings.unshift(lastElement);
    }
console.log(arrStrings.join(" "));
}

//05. Extract Increasing Subsequence from Array
function incrElements (arrNum) {
    // let max = arrNum[0];
    // let result = [];
    // result.push(arrNum[0]);
    // for (let i = 1; i < arrNum.length; i++) {
    //      if (arrNum[i] > arrNum[i - 1] && max <= arrNum[i]) {
    //         result.push(arrNum[i]);
    //         max = arrNum[i];
    //     }
    // }
    //
    // console.log(result.join("\n"));

    console.log(arrNum.filter((e, i) =>
        e >= Math.max.apply(null, arrNum.slice(0, i)))
        .join('\n'));
}

//06. Sort Array
function sortArray (arrStr) {
    arrStr = arrStr.sort(function(a, b)
    {
        if (a.length !== b.length) {
            return a.length > b.length
        } else {
            return a[0].toLowerCase() > b[0].toLowerCase();
        }
    });
    console.log(arrStr.join("\n"));
}

//07. Magic Matrices
function magicMatrices (matrix) {

    console.log(checkSums());

    function checkSums () {
        let initialSum = matrix[0].reduce((a, b) => a + b);

        for (let i = 1; i < matrix.length; i++) {
            let currentSum = matrix[i].reduce((a, b) => a + b);
            if (initialSum !== currentSum) {
                return false;
            }
        }
        for (let i = 0; i < matrix.length; i++) {
            let currentSum = 0;
            for (let j = 0; j < matrix[i].length; j++) {
                currentSum += matrix[j][i];
            }
            if (currentSum !== initialSum) {
                return false;
            }
        }
        return true;
    }
}

//08. Print spiral matrix

function printSpiralFilledMatrix(rows, cols) {
    let matrix = createMatrix();
    fillMatrix();

    console.log(matrix.map(row => row.join(' ')).join('\n'));

    function fillMatrix(currentValue = 1, startIndex = 0) {
        // Left to Right
        for (let i = startIndex; i < matrix[startIndex].length - startIndex; i++) {
            matrix[startIndex][i] = currentValue++;
        }

        // Top to Bottom
        for (let i = startIndex + 1; i < matrix.length - startIndex; i++) {
            matrix[i][matrix[i].length - 1 - startIndex] = currentValue++;
        }

        // Right to Left
        for (let i = matrix.length - 2 - startIndex; i > startIndex; i--) {
            matrix[matrix.length - 1 - startIndex][i] = currentValue++;
        }

        // Bottom to Top
        for (let i = matrix.length - 1 - startIndex; i > startIndex; i--) {
            matrix[i][startIndex] = currentValue++;
        }

        if (currentValue <= matrix.length * matrix[0].length) {
            startIndex++;
            fillMatrix(currentValue, startIndex);
        }
    }

    function createMatrix() {
        let matrix = [];

        for (let i = 0; i < rows; i++) {
            matrix.push(new Array(cols));
        }

        return matrix;
    }
}
//09. DiagonalAttack
function printDiagonalAttack(matrix) {
    matrix = matrix
        .map(row => row.split(' ').map(Number));

    let mainDiagonalSum = matrix.map((row, rowIndex) =>
        row.filter((e, colIndex) => rowIndex === colIndex))
        .reduce((a, b) => Number(a) + Number(b))

    let secondaryDiagonalSum = matrix
        .map((row, rowIndex) => row.filter((e, colIndex) => colIndex === row.length - 1 - rowIndex))
        .reduce((a, b) => Number(a) + Number(b));

    let isDiagonal = (row, col) => row === col || col === matrix[row].length - 1 - row;

    mainDiagonalSum !== secondaryDiagonalSum
        ? console.log(matrix.map(row => row.join(' ')).join('\n'))
        : console.log(matrix.map((row, rowIndex) => row
            .map((e, colIndex) => isDiagonal(rowIndex, colIndex)
                ? e
                : mainDiagonalSum)
            .join(' '))
            .join('\n'));
}

//10. Orbit
function printOrbitOfPoint(params) {
    [matrixRows, matrixCols, x, y] = params;

    let matrix = createMatrix();
    let currentValue = 1;
    matrix[x][y] = currentValue;

    setLayers();
    console.log(matrix.map(row => row.join(' ')).join('\n'));

    function setLayers() {
        // Above & Below
        let upRow = x - currentValue;
        let downRow = x + currentValue;
        let upDownCol = Math.max(y - currentValue, 0);

        while (upDownCol < matrixCols && upDownCol <= y + currentValue) {
            if (upRow >= 0) {
                matrix[upRow][upDownCol] = currentValue + 1;
            }

            if (downRow < matrixRows) {
                matrix[downRow][upDownCol] = currentValue + 1;
            }

            upDownCol++;
        }

        // Left & Right
        let leftRightRow = Math.max(x - currentValue, 0);
        let rightCol = y + currentValue;
        let leftCol = y - currentValue;

        while (leftRightRow < matrixRows && leftRightRow <= x + currentValue) {
            if (rightCol < matrixCols) {
                matrix[leftRightRow][rightCol] = currentValue + 1;
            }

            if (leftCol >= 0) {
                matrix[leftRightRow][leftCol] = currentValue + 1;
            }

            leftRightRow++;
        }

        // Check if it is completed
        currentValue++;

        if (currentValue >= matrixRows && currentValue >= matrixCols) {
            return;
        }

        setLayers();
    }

    function createMatrix() {
        let matrix = [];

        for (let i = 0; i < matrixRows; i++) {
            matrix.push(new Array(matrixCols));
        }

        return matrix;
    }
}
