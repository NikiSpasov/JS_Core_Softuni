function solve(args){
    let argsOnly = solve.arguments;
    let map = new Map();
    for (let arg of argsOnly) {
        let type = typeof(arg);
        console.log(type + ": " + arg);
        if (!map.has(type)) {
            map.set(type, 1);
        } else {
            let currentNum = map.get(type);
            map.set(type, Number(currentNum) + 1);
        }
    }

  Array.from(map.entries()).sort((a, b) => b[1] - a[1])
      .forEach((k) => console.log(k[0] + " = " + k[1]))
}
//solve('cat', "dog", "cheetah", 42, 32, function () { console.log('Hello world!'); });