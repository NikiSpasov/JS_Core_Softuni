define([], function () {
    "use strict";

    class Repository {
        constructor(props) {
            this.data = new Map();
            this.props = props;
            this._id = 0;
        }

        get props() {
            return this._props;
        }

        set props(objectInput) {
            this._props = objectInput;
        }

        get data() {
            return this._data;
        }

        set data(val) {
            this._data = val;
        }

        add(entity) {
            if (Repository._validateEntity(entity, this.props)) {
                let a = this.giveId();
                this.data.set(a, entity);
                return a;
            }
        }

        get(id) {
            if (this.data.has(id)) {
                return this.data.get(id);
            } else {
                throw new Error(`Entity with id: ${id} does not exist!`);
            }
        }

        update(id, entity) {
            if (this.data.has(id)) {
                if (Repository._validateEntity(entity, this.props)) {
                    this.data.set(id, entity);
                }
            } else {
                throw new Error(`Entity with id: ${id} does not exist!`);
            }
        }

        del(id) {
            if (this.data.has(id)) {
                this.data.delete(id);
            } else {
                throw new Error(`Entity with id: ${id} does not exist!`);
            }
        }

        get count() {
            return this.data.size;
        }

        giveId() {
            return this._id++;
        }

        static _validateEntity(entity, props) {
            let ourProps = Object.getOwnPropertyNames(props);
            let entityProps = Object.getOwnPropertyNames(entity);

            if (ourProps.length !== entityProps.length) {
                throw new Error("Different number of props");
            }

            for (let ourProp of ourProps) {
                if (!entityProps.includes(ourProp)) {
                    throw new Error(`Property ${ourProp} is missing from the entity!`);
                } else {
                    if (typeof entity[ourProp] !== props[ourProp]) {
                        throw new TypeError(`Property ${ourProp} is of incorrect type!`);
                    }
                }
            }
            return true;
        }
    }

    let properties = {
        name: "string",
        age: "number",
        birthday: "object"
    };
    //Initialize the repository
    let repository = new Repository(properties);
    // Add two entities
    let entity = {
        name: "Kiril",
        age: 19,
        birthday: new Date(1998, 0, 7)
    };
    console.log(repository.add(entity)); // Returns 0
    console.log(repository.add(entity)); // Returns 1
    console.log(repository.get(0));
    // {"name":"Kiril","age":19,"birthday":"1998-01-06T22:00:00.000Z"}
    console.log(repository.get(1));
    // {"name":"Kiril","age":19,"birthday":"1998-01-06T22:00:00.000Z"}
    //Update an entity
    entity = {
        name: 'Valio',
        age: 19,
        birthday: new Date(1998, 0, 7)
    };
    repository.update(1, entity);
    console.log(repository.get(1));
    // {"name":"Valio","age":19,"birthday":"1998-01-06T22:00:00.000Z"}
    // Delete an entity
    repository.del(0);
    console.log(repository.count); // Returns 1
    let anotherEntity = {
        name1: 'Nakov',
        age: 26,
        birthday: new Date(1991, 0, 21)
    };
    // repository.add(anotherEntity); // should throw an Error
    anotherEntity = {
        name: 'Nakov',
        age: 26,
        birthday: 1991
    };
    repository.add(anotherEntity); // should throw a TypeError
    repository.del(-1); // should throw Error for invalid id
});
//# sourceMappingURL=RepositoryClass.js.map