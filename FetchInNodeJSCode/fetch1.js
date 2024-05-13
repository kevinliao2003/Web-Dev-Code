
/* Returns a promise */
async function getJSONData() {
  const result = await fetch(
    "https://www.cs.umd.edu/~nelson/classes/resources/cmsc335/EnglishSpanish.json"
  );
  const json = await result.json();

  return json; /* The result will be wrapped in a promise */
}

async function main() {
  try {
    const data = await getJSONData(); /* remove await and see what is printed */
    console.log("***** Data Retrieved *****");
    console.log(data);
  } catch (e) { /* To see catch action, rename URL to invalid name */
    console.log("\n***** ERROR Retrieving EnglishSpanish *****\n" + e);
  }
}

main();
