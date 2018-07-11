class PaymentManager {
    constructor(title){
        this.title = title;

    }
    render(id){
        let wrapper = $(`#${id}`);

        let templateTable = `
    <table>
    <caption>${this.title} Payment Manager</caption>
    <thead>
        <tr>
            <th class="name">Name</th>
            <th class="category">Category</th>
            <th class="price">Price</th>
            <th>Actions</th>
        </tr>
   </thead>
    <tbody class="payments">
    </tbody>
    <tfoot class="input-data">
        <tr>
            <td><input name="name" type="text"></td>
            <td><input name="category" type="text"></td>
            <td><input name="price" type="number"></td>
            <td><button>Add</button></td></tr>
    </tfoot>
</table>`;

        $(wrapper).append(templateTable);
        let paymentTr = $(".payments > tr");
        paymentTr.css("display", "none");

        $(`#${id} .input-data tr td:last-child button`).on("click", function (ev) {
            paymentTr.css("display", "");
            let inputName = $(`#${id} input[name=name]`).val();
            let inputCategory = $(`#${id} input[name=category]`).val();
            let inputPrice = $(`#${id} input[name=price]`).val();

            if (inputName === "" || inputCategory === "" || inputPrice === "" ) {
                return;
            }
            let elementToAddToPayments = $(`<tr>
            <td>${inputName}</td>
            <td>${inputCategory}</td>
            <td>${Number(inputPrice).toString()}</td>
            //Number.parseFloat(inputPrice).toFixed(2)
            <td><button>Delete</button></td>      
        </tr>`);

           $(`#${id} input[name=name]`).val("");
           $(`#${id} input[name=category]`).val("");
           $(`#${id} input[name=price]`).val("");

            $(`#${id} .payments`).append(elementToAddToPayments);

            $(`#${id} .payments button`).on("click", function (ev) {
                ev.target.parentElement.parentElement.remove();
            })
        })
    }
}