
/* Returns a promise */
async function getJSONData() {
  const result = await fetch(
    "https://www.cs.umd.edu/~nelson/classes/resources/cmsc335/EnglishSpanish.json"
  );
  const json = await result.json();

  return json;
}

/* Using IIFE */
(async () => {       /* we could have used async function() { ... } */
  try {
    const data = await getJSONData();
    console.log("***** Data Retrieved *****");
    console.log(data);
  } catch (e) {
    console.log("ERROR, ERROR: " + e);
  }
})();
