define([], function () {
    "use strict";

    class PaymentProcessor {
        constructor(options) {
            this.types = ["service", "product", "other"];
            this.precision = 2;
            this.setOptions(options);
            this.payments = new Map();
        }

        get precision() {
            return this._precision;
        }
        set precision(val) {
            if (val !== "") {
                this._precision = val;
            } else {
                throw new Error("Incorrect precision");
            }
        }

        get options() {
            return this._options;
        }
        set options(val) {
            this._options = val;
        }

        setOptions(options) {
            if (options) {
                if (options.types !== undefined) {
                    this.types = options.types;
                }
                if (options.precision !== undefined) {
                    this.precision = options.precision;
                }
            }
        }

        get payments() {
            return this._payments;
        }
        set payments(value) {
            this._payments = value;
        }

        registerPayment(id, name, type, value) {
            if (this.payments.has(id)) {
                throw new Error("ID is in use");
            }
            if (id === "" || name === "") {
                throw new Error("Invalid input");
            }
            if (typeof value !== "number") {
                throw new Error("value must by number!");
            }
            if (!this.types.includes(type)) {
                throw new Error("No such type!");
            }

            this.payments.set(id, { name, type, value });
        }

        deletePayment(id) {
            if (this.payments.has(id)) {
                this.payments.delete(id);
                return;
            }
            throw new Error("ID not found");
        }

        get(id) {
            if (this.payments.has(id)) {
                let result = this.payments.get(id);
                return `Details about payment ID: ${id}
- Name: ${result.name}
- Type: ${result.type}
- Value: ${Number.parseFloat(result.value).toFixed(this.precision)}`;
            }
            throw new Error("ID not found");
        }

        toString() {
            let result = "Summary:\n";
            result += `- Payments: ${this.payments.size}\n`;
            let totalMoney;
            if (this.payments.size > 0) {
                totalMoney = [...this.payments.values()].map(p => p["value"]).reduce((a, b) => a + b);
            } else {
                totalMoney = 0;
                result += `- Balance: 0`;
                return result;
            }
            result += `- Balance: ${Number.parseFloat(totalMoney).toFixed(this.precision)}`;
            return result;
        }
    }

    const generalPayments = new PaymentProcessor("");

    generalPayments.registerPayment('', 'Microchips', 'product', 15000);
});
//# sourceMappingURL=PaymentProcessor.js.map