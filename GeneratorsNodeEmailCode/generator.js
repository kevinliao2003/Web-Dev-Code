main();

function * getUmcpMottoGenerator() {
    yield "Fear";
    yield "The";
    yield "Turtle";
}
function * getOddValuesGenerator() {
    let value = 1;

    while(true) {
        yield value;

        value += 2;
    }
}

function main() {
    const umcpMottoGenerator = getUmcpMottoGenerator();

    console.log("**** UMCP Motto Generator")
    let obj = umcpMottoGenerator.next();
    while (!obj.done) {
        console.log(obj.value);

        obj = umcpMottoGenerator.next();
    }
    console.log("**** Odd Values Generator");
    const generator = getOddValuesGenerator();
    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log(generator.next().value);

    console.log("**** Creating array with odd values");
    const generator2 = getOddValuesGenerator();
    let data = new Array(10).fill(0).map(() => generator2.next().value);
    console.log(data);

    console.log("**** Using spread operator with generator");
    const words = [...getUmcpMottoGenerator()];
    console.log(words);
}