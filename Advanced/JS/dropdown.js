function addItem () {
    let textToBeAdded = document.getElementById("newItemText").value;
    let valueToBeAdded = document.getElementById("newItemValue").value;

    let optionElement = document.createElement("option");
    optionElement.textContent = textToBeAdded;
    optionElement.value = valueToBeAdded;

    let selectElement = document.getElementById("menu");
    selectElement.appendChild(optionElement);

    document.getElementById("newItemText").value = "";
    document.getElementById("newItemValue").value = "";
}