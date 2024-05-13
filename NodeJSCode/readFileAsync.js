/* Module for file reading */
const fs = require("fs");
const fileName = "courseInfo.txt";

fs.readFile(fileName, 'utf-8',
    function (err, fileContent) {
        if (err) {
            throw err;
        }
        console.log("Printed immediately after file reading started");
        console.log(`Displaying content for file ${fileName}`);
        console.log(fileContent);
    });
