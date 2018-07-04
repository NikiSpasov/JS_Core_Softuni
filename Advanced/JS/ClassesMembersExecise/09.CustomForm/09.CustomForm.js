let result = (function() {

    class Textbox {
        constructor(selector, regex){
            this._elements = $(selector);
            this.value = $(this.elements[0]).val();
            this._invalidSymbols = regex;
            this.onInput();
        }

        onInput() {
            let that = this;
            this.elements.on("input", function (event) {
                let text = $(this).val();
                that.value = text;
            })
        }

        get elements(){
            return this._elements;
        }

        get value(){
            return this._value;
        }

        set value(value){
            this._value = value;
            for (let el of this.elements) {
                $(el).val(value);
            }
        }

        isValid() {
            return !this._invalidSymbols.test(this.value)
        }
    }

    class Form {

        constructor(){
            this._element = $("<div>").addClass("form");
            this.textboxes = arguments; //args from construcotr!
        }

        get textboxes() {
            return this._textboxes;
        }

        set textboxes(args) {
            for (let arg of args) {
                if (!arg instanceof Textbox) {
                    throw new Error("Argument is not a Textbox instance");
                }
            }
            this._textboxes = args;
            for (let textbox of this._textboxes) {
                for (let el of textbox._elements) {
                    this._element.append($(el))
                }
            }
        }

        get element() {
            return `<div class="form"></div>`
        }

        set element(value){
            for (let el of Form.constructor.arguments) {
               $(this.element).append($(el))
            }
        }

        appendElements() {

        }

        submit() {
            let allValid = true;
            for (let textbox of this._textboxes){
                if (textbox.isValid()) {
                    for (let el of textbox._elements) {
                        $(el).css("border", "2px solid green")
                    }
                }
                else {
                    allValid = false;
                    for (let el of textbox._elements) {
                        $(el).css("border", "2px solid red")
                    }
                }
            }
            return allValid;
        }

        attach(selector) {
            $(selector).append(this._element);
        }
    }

    return {
        Textbox: Textbox,
        Form: Form
    }
}());

let Textbox = result.Textbox;
let Form = result.Form;
let username = new Textbox("#username",/[^a-zA-Z0-9]/);
let password = new Textbox("#password",/[^a-zA-Z]/);
username.value = "username";
password.value = "password2";
let form = new Form(username,password);
form.attach("#root");
