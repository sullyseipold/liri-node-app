require('dotenv').config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require("fs");

var args = process.argv.slice(2);

var commands = {
    concert_this: "concert-this",
    spotify_this: "spotify-this-song",
    movie_this: "movie-this",
    do_what_it_says: "do-what-it-says",
}

//SPOTIFY
// -----------------------------------------------------------------

function spotifySong() {

    var spotify = new Spotify(keys.spotify);
    var track = args.slice(1).join(" ");

    // default if no song provided
    if ("" == track) {
        track = "The Sign, Ace of Base";
    }

    spotify
        .search({ type: 'track', query: track, limit: 1 })
        .then(function (response) {

            if (response.tracks.items.length < 1) {
                console.log('Song not found');
            }
            else {
                var items = response.tracks.items;
                var album = items[0];
                var artists = album.artists.map(item => item.name).join(", ");
                var song = album.name;
                var preview = album.preview_url;
                var albumName = album.album.name;

                console.log('\nTrack:\n');
                console.log('  Artist(s):  ', artists);
                console.log('  Song: ', song);
                console.log('  Preview: ', preview);
                console.log('  album: ', albumName);
                console.log('\n');

                fs.appendFile('log.txt', `Track: ${artists} Song: ${song} Preview: ${preview} Album: ${albumName} \n`, function (err) {
                    if (err) console.log(err);
                });
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}


// MOVIE OMDB
// -----------------------------------------------------------------------------------------

function movieThis() {

    var movieName = "";

    for (var i = 1; i < args.length; i++) {

        if (i > 1 && i < args.length) {
            movieName = movieName + "+" + args[i];
        }
        else {
            movieName += args[i];
        }
    }

    if ("" == movieName) {
        movieName = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.

    axios.get(queryUrl).then(
        function (response) {

            if (response.data.Response.toLowerCase() == 'false') {
                console.log('Movie not found!');
            }
            else {
                var rottenTomatoes = "";
                response.data.Ratings.forEach(element => {
                    if (element.Source === 'Rotten Tomatoes') {
                        rottenTomatoes = element.Value;
                    }
                });
                var title = response.data.Title;
                var year = response.data.Year;
                var imdb = response.data.imdbRating;
                var country = response.data.Country;
                var language = response.data.Language;
                var plot = response.data.Plot;
                var actors = response.data.Actors;

                console.log('\nMovie:\n');
                console.log(" Title: " + title);
                console.log(" Release Year: " + year);
                console.log(" IMDB Rating: " + imdb);
                console.log(" Rotten Tomatoes Rating: " + rottenTomatoes);
                console.log(" Country: ", country);
                console.log(" Language: ", language);
                console.log(" Plot: ", plot);
                console.log(" Actors: ", actors);
                console.log('\n');

                fs.appendFile('log.txt', `Movie: Title: ${title} Year: ${year} IMDB: ${imdb} Tomatoes: ${rottenTomatoes} Country ${country} Language: ${language} Plot: ${plot} Actors: ${actors} \n`, function (err) {
                    if (err) console.log(err);
                });
            }
        }
    );
}


// BANDS IN TOWN ARTIST EVENTS

function concertThis() {

    var artist = args.slice(1).join(" ");

    if ("" == artist) {
        console.log("Enter an artist!!");
        return;
    }

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(queryUrl).then(
        function (response) {

            var res = response.data;

            if (response.data.length < 1) console.log("no tour dates found");

            res.forEach(item => {

                var event = item.lineup.join(", ");
                var venue = item.venue.name;
                var location = item.venue.city;
                var date = moment(item.datetime).format("MM/YY/YYYY");

                console.log('Event: ' + event + '\n');
                console.log(' Venue: ', venue);
                console.log(' Location: ', location);
                console.log(' Date: ', date);
                console.log('\n');

                fs.appendFile('log.txt', `Event: ${event} Venu: ${venue} Location: ${location} date: ${date}\n`, function (err) {
                    if (err) console.log(err);
                });
            });
        })
        .catch(function (err) {
            console.log(err);
        });
}

function doWhatItSays() {

    var random = JSON.parse(fs.readFileSync('random.txt', 'utf8'));
    var commands = Object.entries(random);
    var index = Math.floor(Math.random() * (commands.length));
    var command = commands[index];
    args.length = 0;
    command.map(item => args.push(item));

    processCommand();
   
}

function processCommand() {

    switch (args[0]) {
        case commands.concert_this:
            concertThis();
            break;
        case commands.spotify_this:
            spotifySong();
            break;
        case commands.movie_this:
            movieThis();
            break;
        case commands.do_what_it_says:
            doWhatItSays();
            break;
        default:
            console.log('\nplease enter a valid command.' + '\n\n' + '  Valid Commands:' + '\n');
            Object.values(commands).map(item => {
                console.log('       ', item)
            });
            console.log('\n');
    }
}

processCommand();

