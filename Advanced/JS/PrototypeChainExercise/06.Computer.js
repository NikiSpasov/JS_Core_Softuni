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

module.exports = {Computer, Desktop, Laptop, Keyboard, Monitor, Battery};

