define([], function () {
    "use strict";

    function onlineShop(selector) {
        let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
        $(selector).html(form);

        let productNameInput = $(".custom-select");
        let priceInput = $("#price");
        let quantityInput = $("#quantity");
        let submitButton = $("#submit");
        let totalSum = $("#sum");
        let capacityField = $("#capacity");

        $(productNameInput).on("keypress", function () {
            $(submitButton).removeAttr("disabled");
        });

        $(submitButton).on("click", function () {

            let currentTotal = 0;
            let name = productNameInput.val();
            let price = priceInput.val();
            let capacityInput = $("#capacity");
            let quantity = quantityInput.val();
            let currentPrice = Number(price);
            if (totalSum.val() !== "") {
                currentTotal = currentPrice + Number(totalSum.val());
                totalSum.val(currentTotal);
            } else {
                totalSum.val(currentPrice);
            }
            if (capacityInput.val() === "") {
                capacityInput.val(quantity);
            } else {
                let toBeAdd = Number(capacityInput.val()) + Number(quantity);
                capacityInput.val(toBeAdd);
            }
            if (Number(capacityInput.val()) === 150) {
                $(capacityField).val("full");
                $(capacityField).addClass('fullCapacity');
                $(submitButton).prop("disabled", true);
                productNameInput.prop('disabled', true);
                priceInput.prop('disabled', true);
                quantityInput.prop('disabled', true);
                return;
            }

            let liToAdd = $(`<li>Product: ${name} Price: ${price} Quantity: ${quantity}</li>`);
            $(".display").append(liToAdd);

            productNameInput.val("");
            priceInput.val(1);
            quantityInput.val(1);
            $(submitButton).prop("disabled", true);
        });

        function getNumberOfCurrentItems() {
            let a = $("ul li").length;
            return a;
        }
    }
});
//# sourceMappingURL=solution.js.map