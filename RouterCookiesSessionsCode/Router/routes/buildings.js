const express = require('express');
const router = express.Router();

/* router is like a mini application
   endpoint that processes anything that
   starts with /building
*/

/* We can add our own middleware that only
   applies to buildings */


// http://localhost:3000/buildings/
router.get("/", (request, response) => {
    response.send("/ in building.js")
});

// http://localhost:3000/buildings/iribe
router.get("/iribe", (request, response) => {
    response.send("/iribe in building.js")
});

// http://localhost:3000/buildings/notValid
router.use((request, response) => {
    response.status(404).send("Resource Not Found (in building router)");
});
 
 
module.exports = router;