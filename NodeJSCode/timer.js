

const timeInMilliseconds = 2000;
const stringToRepeat = "turtle";

const timerId = setInterval(name => {
	console.log(`Fear the ${name}`);
}, timeInMilliseconds, stringToRepeat);

process.stdin.setEncoding("utf8");
console.log("Type stop to stop the timer");
process.stdin.on('readable', () => {
	let dataInput = process.stdin.read();
	if (dataInput !== null) {
		let command = dataInput.trim();
		if (command === "stop") {
			console.log("timer stopped");
            clearInterval(timerId);
        } else {
			console.log(`Invalid command: ${command}`);
		}
    }
});
