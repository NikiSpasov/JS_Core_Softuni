(function () {
    String.prototype.ensureStart = function (str) {
        if (this.indexOf(str) !== 0) {
            return str + this;
        }
        return this + "";
    },
        String.prototype.ensureEnd = function (str) {
            if (this.indexOf(str) !== this.length -  str.length) {
                return this + str;
            }
            return this + "";
        },
        String.prototype.isEmpty = function () {
            let empty;
            this.length > 0 ? empty = false : empty = true;
            return empty;
        },
        String.prototype.truncate = function (n) {
            n = Number(n);
            if (n < 4) {
                return ".".repeat(n);
            }
            if (this.length <= n) {
                return this + "";
            }
            if (this.length > n) {
                if (this.indexOf(" ") < 0) {
                    return this.slice(0, n - 3) + "..."
                }
                let strArray = this.split(" ");
                let totalLength = 3;
                let tempArr = [];
                for (let i = 0; i < strArray.length; i++) {
                    tempArr.push(strArray[i]);
                    let currentString = tempArr.join(" ");
                    let currentStringLength = tempArr.join(" ").length + 3;
                    if (currentStringLength <= n)  {
                        continue;
                    }
                    tempArr.pop();
                    return tempArr.join(" ") + "...";
                }
            }
        },
        String.format = function (str, params) {
            let text = Array.from(arguments).shift();
            let args = Array.from(arguments).slice(1);
            for (let argument of args) {
                text = text.replace(/{.}/, argument);
            };
            return text;
        }
})();
let testString = 'the quick brown fox jumps over the lazy dog';
let test = testString.truncate(25);
console.log(test);
//('the quick brown fox...', 'Incorrect truncate() functionality 2');