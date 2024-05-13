
/* Important */
process.stdin.setEncoding("utf8");

if (process.argv.length != 3) {
  process.stdout.write(`Usage ${process.argv[1]} targetLanguage`);
  process.exit(1);
}

const language = process.argv[2];
process.stdout.write(`Target language ${language}\n`);
if (language !== "Spanish") {
  console.error("Invalid Language");
  process.exit(1);
}

const prompt = "Enter English Word (0 to end): ";
process.stdout.write(prompt);
process.stdin.on("readable", function () {
  let dataInput = process.stdin.read();
  if (dataInput !== null) {
    let command = dataInput.trim();
    if (command === "cat") {
      process.stdout.write("gato\n");
    } else if (command === "dog") {
      process.stdout.write("perro\n");
    } else if (command === "0") {
      process.stdout.write("Bye bye\n");
      process.exit(0);
    }
    process.stdout.write(prompt);
    process.stdin.resume();
  }
});
