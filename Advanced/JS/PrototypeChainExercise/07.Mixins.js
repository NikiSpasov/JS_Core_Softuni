class Computer {
    constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
        if (new.target === Computer) {
            throw new Error("Abstract class can not be instantiated")
        }
        this.manufacturer = manufacturer;
        this.processorSpeed = processorSpeed;
        this.ram = ram;
        this.hardDiskSpace = hardDiskSpace;
    }
}

class Keyboard {
    constructor(manufacturer, responseTime) {
        this.manufacturer = manufacturer;
        this.responseTime = responseTime;
    }
}

class Monitor {
    constructor(manufacturer, width, height) {
        this.manufacturer = manufacturer;
        this.width = width;
        this.height = height;
    }
}

class Battery {
    constructor(manufacturer, expectedLife) {
        this.manufacturer = manufacturer;
        this.expectedLife = expectedLife;
    }
}

class Laptop extends Computer {

    constructor(manufacturer, processorSpeed, ram, hardDiskSpace,
                weight, color, battery) {

        super(manufacturer, processorSpeed, ram, hardDiskSpace);
        this.weight = weight;
        this.color = color;
        this.battery = battery;
    }

    get battery() {
        return this._battery;
    }

    set battery(battery) {
        let isThisAbattery = battery instanceof Battery;
        if (!isThisAbattery) {
            throw new TypeError("this must be a battery!")
        }
        this._battery = battery;
    }
}

class Desktop extends Computer {
    constructor(manufacturer, processorSpeed, ram, hardDiskSpace,
                keyboard, monitor) {
        super(manufacturer, processorSpeed, ram, hardDiskSpace);
        this.keyboard = keyboard;
        this.monitor = monitor;
    }

    get keyboard() {
        return this._keyboard;
    }

    get monitor() {
        return this._monitor;
    }

    set keyboard(passedKbd) {
        if (!(passedKbd instanceof Keyboard)) {
            throw new TypeError("this must be a keyboard!")
        }
        this._keyboard = passedKbd;
    }

    set monitor(passedMonitor) {
        if (!(passedMonitor instanceof Monitor)) {
            throw new TypeError("this must be a monitor!")
        }
        this._monitor = passedMonitor;
    }
}
function solve () {
    function computerQualityMixin() {
        this.getQuality = function () {
            return (this.ram + this.processorSpeed + this.hardDiskSpace) / 3;
        };
        this.isFast = function () {
            return (this.processorSpeed > (this.ram / 4))
        };
        this.isRoomy = function () {
            return (this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed))
        };
        return this;
    }

    function styleMixin() {
        this.isFullSet = function() {
            return (this.keyboard.manufacturer === this.monitor.manufacturer && this.monitor.manufacturer ===
                this.manufacturer)
        };
        this.isClassy = function() {
            return (this.battery.expectedLife >= 3 && (this.color === "Silver" || this.color === "Black") && this.weight < 3)
        };
        return this;
    }
    return {computerQualityMixin, styleMixin}
}

let mixins = solve();
let computerQualityMixin = mixins.computerQualityMixin;
let styleMixin = mixins.styleMixin;

computerQualityMixin.call(Desktop.prototype);
styleMixin.call(Desktop.prototype);
computerQualityMixin.call(Laptop.prototype);
styleMixin.call(Laptop.prototype);



let keyboard = new Keyboard('Logitech',70);
let keyboard2 = new Keyboard('A-4',70);
let monitor = new Monitor('Logitech',28,18);
let battery = new Battery('Energy',3);
                         //manuf,        prcSpd,ram, hdd,  w,    clr,    btt
let laptop = new Laptop("Hewlett Packard", 2.4,  4,   0.5, 2.99,"Silver",battery);
let laptop2 = new Laptop("Hewlett Packard",2.4,4,12,3.12,"Silver",battery);
let desktop = new Desktop("Logitech",3.3,8,1,keyboard,monitor);
let desktop2 = new Desktop("Logitech",1.3,8,10,keyboard2,monitor);


console.log(desktop.constructor.prototype);
console.log(laptop.constructor.prototype);



//expect(desktop.isClassy).to.exist;
//expect(laptop.isClassy).to.exist;
console.log(desktop.isFast());
//console.log(laptop.isClassy()); //.to.be.true;
//console.log(laptop2.isClassy());//.to.be.false;
