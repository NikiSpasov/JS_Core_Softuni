function subtract() {
    let firstElement = document.getElementById("firstNumber").value;
    let secondElement = document.getElementById("secondNumber").value;
    let substraction = Number(firstElement) - Number(secondElement);
    let elementToInputTheResult = document.getElementById("result");
    elementToInputTheResult.textContent = substraction;
}