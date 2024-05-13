/* Try with both a valid and invalid URL */

const nodeFetch = require("node-fetch");

function getJSONData() {
  let answer;

  console.log(`START of getJSONData()`);
  nodeFetch(
    "https://www.cs.umd.edu/~nelson/classes/resources/cmsc335/EnglishSpanish.json" )
    .then(response => { /* then() extracts server's response  */
      const answer = response.json(); /* response.json() returns a promise */
      console.log("BEFORE PRINTING answer");
      console.log(answer);
      console.log("AFTER PRINTING answer");
      return answer;
    }) 
    .then(jsonData => {               
      console.log("In then() of nodeFetch\n", jsonData, "\nEnd of then() of nodeFetch");
    });

  console.log(`In getJSONData() after nodeFetch answer is:  ${answer}`);
  console.log(`END of getJSONData()`);
  return answer;
}

function main() {
  console.log(`START of main()`);

  let answer = getJSONData();
  console.log("***** Data retrieved is *****");
  console.log(answer); // We will not see the JSON data
  console.log("***** END of Data retrieved is *****");
  console.log(`END of main()`);
}

main();
