function makeMeCar(desiredCar) {

    let engines = {
        small: {power: 90, volume: 1800},
        normal: {power: 120, volume: 2400},
        monster: {power: 200, volume: 3500}
    };
    let carriages = {
        hatchback: {type: "hatchback", color: `${desiredCar.color}`},
        coupe: {type: "coupe", color: `${desiredCar.color}`}
    };

    let wheels = [];

    return {
        model: desiredCar.model,
        engine: (function () {
            if (desiredCar.power <= 90) {
                return engines.small;
            } else if (desiredCar.power > 90 && desiredCar.power <= 120) {
                return engines.normal;
            }
            else {
                return engines.monster;
            }
        })(desiredCar.engine),
        carriage: (function () {
            let carriage;
            desiredCar.carriage === "hatchback" ? carriage = carriages.hatchback :
                carriage = carriages.coupe;
            return carriage;
        })(),
        wheels: (function () {
            desiredCar.wheelsize % 2 === 0 ? wheels = [
                    desiredCar.wheelsize - 1,
                    desiredCar.wheelsize - 1,
                    desiredCar.wheelsize - 1,
                    desiredCar.wheelsize - 1
                ] :
                wheels = [
                    desiredCar.wheelsize,
                    desiredCar.wheelsize,
                    desiredCar.wheelsize,
                    desiredCar.wheelsize
                ];
            return wheels;
        })()
    }
}

let testCar = {
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
};

let finalCar = makeMeCar(testCar);
console.log(finalCar);