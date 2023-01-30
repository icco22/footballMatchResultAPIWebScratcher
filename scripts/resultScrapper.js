const { JSDOM } = require( "jsdom" ); 
// initialize JSOM in the "https://scrapeme.live/" page 
// to avoid CORS problems 
const { window } = new JSDOM("", { 
	url: "https://footystats.org", 
}); 
const $ = require( "jquery" )( window ); 
let clubsJson = require('../data/leagueClubs/clubs.json');

const getResult = async (league, clubOne, clubTwo) => {
    clubOne = clubsJson[league][clubOne];
    clubTwo = clubsJson[league][clubTwo];
    let firstClubName;
    let clubOneResult;
    let clubTwoResult;
    let secondClubName;

    await $.get(`https://footystats.org/${league}/${clubOne}-vs-${clubTwo}-h2h-stats`, function(html) {
            // retrieve the list of all HTML products
        
            console.log(`https://footystats.org/${league}/${clubOne}-vs-${clubTwo}-h2h-stats`)
            // get club results
            let getAllResults  = $(html).find('.team > span').text();
            clubOneResult = getAllResults.slice(0, 1);
            console.log(clubOneResult)
            clubTwoResult = getAllResults.slice(1, 2);
        
            // get club names
            let seperate = /\d+\D*/g
            let allClubNames = $(html).find('.team').text();
            firstClubName = allClubNames.match(seperate)[1].replace(/[0-9]/g, '');
            secondClubName = allClubNames.match(seperate)[2].replace(/[0-9]/g, '');
    });
        return result = `${firstClubName} ` + `${clubOneResult}` + ` - ` + `${clubTwoResult}` + ` ${secondClubName}`;
  }

exports.getResult = getResult