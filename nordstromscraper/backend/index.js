const express = require("express");
const app = express();
const request = require("request-promise").defaults({
    headers: {
        Authorization: "apikey 8ea21c48-95c3-4bcf-9db1-d6ada47565f2",
        NordApiVersion: 1
    }

});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});

//cd into backend, and run nodemon index.js

app.get("/nordstrom", async (req, res, next) => {
    const url = "https://query.ecommerce.api.nordstrom.com/api/queryresults/keywordsearch/?top=3&includesFacets=false&Keyword=red%20dresses"
    const json = await request.get(url);
    res.sendHeader("Content-Type", "application/json");
    res.send(json);
});