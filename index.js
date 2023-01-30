const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");
var { getResult } = require('./scripts/resultScrapper.js');
let clubsJson = require('./data/leagueClubs/clubs.json');

const app = express();
app.use(express.json());

// Get all clubs and leagues
app.get("/clubs", (req, res) => {
    res.json({
        leagues : clubsJson
    })
});

// Get all Clubs in one league
app.get("/clubs/:countryName", (req, res) => {
    const countryName = req.params.countryName;
    res.json({
        clubs : clubsJson[countryName]
    })
});


// Get latest match in one league between two clubs
app.get("/match/:league/:clubOne/:clubTwo", async (req, res) => {
    const league = req.params.league;
    const clubOne = req.params.clubOne;
    const clubTwo = req.params.clubTwo;

    let result = await getResult(league, clubOne, clubTwo);
    if(clubsJson.hasOwnProperty(`${clubOne}`) === undefined || clubsJson.hasOwnProperty(`${clubTwo}`) === undefined) {
        res.status(400);
        res.send("Club or league doesn't exist")
    } else {
        await res.json({
            matchResult : result
        })
    }
    
});

app.listen(3000, () => console.log("Server started on port 3000"));