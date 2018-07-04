function workerMod (workerObject) {
    let model = {
        weight: Number,
        experience: Number,
        bloodAlcoholLevel: Number,
        handsShaking: Boolean
    };

    if (workerObject.handsShaking) {
        workerObject.bloodAlcoholLevel +=
            workerObject.experience * workerObject.weight * 0.1;
        workerObject.handsShaking = false;
    }
    return workerObject;
}

let modified = workerMod(testWorker);
console.log(modified);
