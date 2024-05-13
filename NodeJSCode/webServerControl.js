
const http = require('http');
const portNumber = 5001;
const httpSuccessStatus = 200;
const webServer = http.createServer((request, response) => {
	response.writeHead(httpSuccessStatus, {'Content-type':'text/html'});
	response.write('<h1>Web Server (NodeJS based) Running</h1>');
	response.end();
});

webServer.listen(portNumber); 
console.log(`Web server is running at http://localhost:${portNumber}`);
console.log("Type stop to shutdown the server");
process.stdin.setEncoding("utf8"); /* encoding */
process.stdin.on('readable', () => {  /* on equivalent to addEventListener */
	let dataInput = process.stdin.read();
	if (dataInput !== null) {
		let command = dataInput.trim();
		if (command === "stop") {
			console.log("Shutting down the server");
            process.exit(0);  /* exiting */
        } else {
			/* After invalid command, we cannot type anything else */
			console.log(`Invalid command: ${command}`);
		}
    }
});
