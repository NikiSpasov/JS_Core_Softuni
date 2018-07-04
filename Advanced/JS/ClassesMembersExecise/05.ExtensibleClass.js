let classTest = (() => {
        let counter = 0;
        return class Extensible{
            constructor(){
                this.id = counter;
                counter++;
            }
            extend(template){
                for(let parentProp of Object.keys(template)){
                    if(typeof(template[parentProp]) === "function"){
                        Extensible.prototype[parentProp] = template[parentProp];
                    } else {
                        this[parentProp] = template[parentProp];
                    }
                }
            }
        }
    }
)();
let a = new classTest;
let b = new classTest;
console.log(a.id);
console.log(b.id);