const express = require('express');
const router = express.Router();

/* router is like a mini application
   endpoint that processes anything that
   starts with /dorms
*/

/* We can add our own middleware that only
   applies to dorms */

// http://localhost:3000/dorms
router.get("/", (request, response) => {
    response.send("/ in dorms.js")
});

http://localhost:3000/dorms/laplata
router.get("/laplata", (request, response) => {
    response.send("/laplata in dorms.js")
});

module.exports = router;